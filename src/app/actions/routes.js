import axios from "axios";
import {setCenter} from "./google-maps";
import moment from 'moment'
import config from '~/config'

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
		return axios.get(`${config.basePath}/proxy.php?id=${id}` )
			.then( response => response.data )
			.then( data => dispatch( receiveRoute( {
				...data,
				...options,
				slowDistance: 0,
				fastDistance: 0,
				slowProgress: 0,
				fastProgress: 0,
				polylines: {
					route: [],
					active: []
				}
			} ) ) )
			.then( actionCreator => dispatch( setCenter( actionCreator.payload.center.lat, actionCreator.payload.center.lng ) ) )
	};
}