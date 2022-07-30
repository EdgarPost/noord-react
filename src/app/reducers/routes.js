import {RECEIVE_ROUTE, TOGGLE_ROUTE_ACTIVE, SET_ROUTE_PROPERTY} from "~/actions/routes";
import {SET_TIME} from "~/actions/controls";


const initialState = [];

export default function routesReducer( state = initialState, action )
{

	switch( action.type )
	{
		default :
			return state;
		case RECEIVE_ROUTE :
			return [...state, action.payload];
		case TOGGLE_ROUTE_ACTIVE :
			return state.map( route =>
			{
				if( route.id === action.payload )
				{
					return {
						...route,
						enabled: !route.enabled,
					};
				}

				return route;
			} );
		case SET_ROUTE_PROPERTY :
			return state.map( route =>
			{
				if( route.id === action.payload.id )
				{
					const newValues = {
						[action.payload.property]: action.payload.value
					};

					if(action.payload.property === 'startTime') {
						newValues.slowDistance = 0;
						newValues.fastDistance = 0;
						newValues.slowProgress = 0;
						newValues.fastProgress = 0;
					}

					return {
						...route,
						...newValues
					};
				}

				return route;
			} );
		case SET_TIME :

			return state.map( route =>
			{
				const timeProgress = action.payload.diff(route.startTime, 'seconds') / 60 / 60;
				if(timeProgress <= 0) {
					return route;
				}

				const slowDistance = timeProgress * route.slowSpeed;
				const fastDistance = timeProgress * route.fastSpeed;
				const slowProgress = Math.round(100 / route.distance * slowDistance);
				const fastProgress = Math.round(100 / route.distance * fastDistance);

				return {
					...route,
					slowDistance,
					fastDistance,
					slowProgress,
					fastProgress,
				};
			} );


			return state;
			break;
	}
}