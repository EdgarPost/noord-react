import axios from "axios";
import {setCenter} from "./google-maps";
import moment from 'moment'
import config from '~/config'

import route_3419289 from '~/data/3419289.json' // 30 KM
import route_3423869 from '~/data/3423869.json' // 20 KM
import route_3251688 from '~/data/3251688.json' // 10 KM

const routesJsons = {
	3419289: route_3419289, // 30 KM
	3423869: route_3423869, // 20 KM
	3251688: route_3251688, // 10 KM
}

console.log(routesJsons);

export const ADD_ROUTE = 'ADD_ROUTE'
export const RECEIVE_ROUTE = 'RECEIVE_ROUTE'
export const TOGGLE_ROUTE_ACTIVE = 'TOGGLE_ROUTE_ACTIVE'
export const SET_ROUTE_PROPERTY = 'SET_ROUTE_PROPERTY'
export const SET_ROUTE_PROGRESS = 'SET_ROUTE_PROGRESS'

export function receiveRoute( data )
{
	return {
		type: RECEIVE_ROUTE,
		payload: data
	};
}

export function toggleRoute(id) {

	return {
		type: TOGGLE_ROUTE_ACTIVE,
		payload: id
	};
}

export function setRouteProperty(id, property, value) {

	let sendValue = value;
	if(property === 'startTime') {
		sendValue = moment(value).format()
	}

	axios.get(`${config.basePath}/save.php`, {
		params: {id, property, value: sendValue}
	});

	return {
		type: SET_ROUTE_PROPERTY,
		payload: {
			id, property, value
		}
	};
}

export function updateRouteProgress(id, data) {
	return {
		type: SET_ROUTE_PROGRESS,
		payload: {
			id
		}
	};
}

export function loadRoute( id, options = {})
{

	return function( dispatch )
	{
		return new Promise((resolve) => {
			return resolve(routesJsons[id]);
		})
			.then( data => {
				const {route} = data.routes[0];

				return dispatch(receiveRoute({
					...data.routes[0].route,
					id: route.id,
					distance: Number(route.distance),
					center: {
						lat: Number(route.center_lat),
						lng: Number(route.center_lng),
					},
					points: route.points.map(point => ({
						lat: Number(point.point.lat),
						lng: Number(point.point.lng),
					})),

					// 'id' => (int) $route->id,
					// 'distance' => (float) $route->distance,
					// 'center' => array(
					// 		'lat' => (float) $route->center_lat,
					// 		'lng' => (float) $route->center_lng,
					// ),
					// 'points' => array_map(function ($point) {
					// 		return array(
					// 				'lat' => (float) $point->point->lat,
					// 				'lng' => (float) $point->point->lng,
					// 		);
					// }, $route->points),

					...options,
					slowDistance: 0,
					fastDistance: 0,
					slowProgress: 0,
					fastProgress: 0,
					polylines: {
						route: [],
						active: []
					}
				}));
			} )
			.then( actionCreator => {
				return dispatch(setCenter(actionCreator.payload.center_lat, actionCreator.payload.center_lng));
			} )
	};

	
}
