import {SET_ZOOM_LEVEL, SET_CENTER} from '~/actions/google-maps'

const initialState = {
	zoom: 13,
	center: {lat: 52.41086863575478, lng: 4.989702702587908},
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