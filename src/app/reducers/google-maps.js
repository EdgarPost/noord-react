import {SET_ZOOM_LEVEL, SET_CENTER} from '~/actions/google-maps'
import config from '../config'

const initialState = {
	zoom: 13,
	center: {lat: 52.41086863575478, lng: 4.989702702587908},
	markers: [
		{
			title: 'Start / Finish',
			zIndex: 50,
			icon: config.basePath + '/build/assets/icons/finish.png',
			anchor: {x: 18, y: 92},
			position: {lat: 52.4027134, lng: 4.9270356}
		},

		// water posts
		{
			title: 'Waterpost',
			zIndex: 50,
			icon: config.basePath + '/build/assets/icons/water.png',
			anchor: {x: 26, y: 90},
			position: {lat: 52.41043019171594 , lng: 4.958438873291016}
		},
		{
			title: 'Waterpost',
			zIndex: 50,
			icon: config.basePath + '/build/assets/icons/water.png',
			anchor: {x: 26, y: 90},
			position: {lat: 52.400062327157165 , lng: 4.978823661804199}
		},
		{
			title: 'Waterpost',
			zIndex: 50,
			icon: config.basePath + '/build/assets/icons/water.png',
			anchor: {x: 26, y: 90},
			position: {lat: 52.42458388978248 , lng: 4.991387128829956}
		},
		{
			title: 'Waterpost',
			zIndex: 50,
			icon: config.basePath + '/build/assets/icons/water.png',
			anchor: {x: 26, y: 90},
			position: {lat: 52.42888210246022 , lng: 5.041565895080566}
		},

		// ehbo
		{
			title: 'EHBO',
			zIndex: 50,
			icon: config.basePath + '/build/assets/icons/ehbo.png',
			anchor: {x: 36, y: 41},
			position: {lat: 52.42396234793983 , lng: 4.9928998947143555}
		},
		{
			title: 'EHBO',
			zIndex: 50,
			icon: config.basePath + '/build/assets/icons/ehbo.png',
			anchor: {x: 36, y: 41},
			position: {lat: 52.412635666744876 , lng: 4.943321943283081}
		},

		// matten
		{
			title: 'Tijdregistratie',
			zIndex: 50,
			icon: config.basePath + '/build/assets/icons/stopwatch.png',
			anchor: {x: 48, y: 46},
			position: {lat: 52.43244073155274 , lng: 4.995989799499512}
		},
		{
			title: 'Tijdregistratie',
			zIndex: 50,
			icon: config.basePath + '/build/assets/icons/stopwatch.png',
			anchor: {x: 48, y: 46},
			position: {lat: 52.39999686572672 , lng: 4.977622032165527}
		},
		{
			title: 'Tijdregistratie',
			zIndex: 50,
			icon: config.basePath + '/build/assets/icons/stopwatch.png',
			anchor: {x: 48, y: 46},
			position: {lat: 52.40796935350337 , lng: 4.979510307312012}
		},
	]
};

function googleMaps(state = initialState, action) {
	switch(action.type) {
		case SET_ZOOM_LEVEL :
			return {
				...state,
				zoom: action.payload
			}
		case SET_CENTER :
			return {
				...state,
				center: action.payload
			}
		default :
			return state;
	}
}

export default googleMaps;