import {SET_ZOOM_LEVEL, SET_CENTER} from '~/actions/google-maps'

const initialState = {
	zoom: 13,
	center: {lat: 52.41086863575478, lng: 4.989702702587908},
	markers: [
		{
			title: 'Start / Finish',
			zIndex: 50,
			icon: 'https://www.edgarpost.com/noord/build/assets/icons/finish.png',
			anchor: {x: 18, y: 92},
			position: {lat: 52.4027134, lng: 4.9270356}
		},

		// water posts
		{
			title: 'Waterpost',
			zIndex: 50,
			icon: 'https://www.edgarpost.com/noord/build/assets/icons/water.png',
			anchor: {x: 26, y: 90},
			position: {lat: 52.4090165354808 , lng: 4.944148063659668}
		},
		{
			title: 'Waterpost',
			zIndex: 50,
			icon: 'https://www.edgarpost.com/noord/build/assets/icons/water.png',
			anchor: {x: 26, y: 90},
			position: {lat: 52.40181665731506 , lng: 4.960455894470215}
		},
		{
			title: 'Waterpost',
			zIndex: 50,
			icon: 'https://www.edgarpost.com/noord/build/assets/icons/water.png',
			anchor: {x: 26, y: 90},
			position: {lat: 52.39540123059613 , lng: 4.968438148498535}
		},
		{
			title: 'Waterpost',
			zIndex: 50,
			icon: 'https://www.edgarpost.com/noord/build/assets/icons/water.png',
			anchor: {x: 26, y: 90},
			position: {lat: 52.430164288700965 , lng: 5.038776397705078}
		},

		// ehbo
		{
			title: 'EHBO',
			zIndex: 50,
			icon: 'https://www.edgarpost.com/noord/build/assets/icons/ehbo.png',
			anchor: {x: 36, y: 41},
			position: {lat: 52.42057315510226 , lng: 4.990603923797607}
		},

		// matten
		{
			title: 'Mat',
			zIndex: 50,
			icon: 'https://www.edgarpost.com/noord/build/assets/icons/mat.png',
			anchor: {x: 48, y: 46},
			position: {lat: 52.41885883093773 , lng: 5.019721984863281}
		},
		{
			title: 'Mat',
			zIndex: 50,
			icon: 'https://www.edgarpost.com/noord/build/assets/icons/mat.png',
			anchor: {x: 48, y: 46},
			position: {lat: 52.4326238885105 , lng: 5.007791519165039}
		},
		{
			title: 'Mat',
			zIndex: 50,
			icon: 'https://www.edgarpost.com/noord/build/assets/icons/mat.png',
			anchor: {x: 48, y: 46},
			position: {lat: 52.4105872618342 , lng: 4.983844757080078}
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