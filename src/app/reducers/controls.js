import moment from 'moment';
import {SET_TIME, RESET, PLAY, PAUSE, INCREASE_SPEED, DECREASE_SPEED} from '~/actions/controls'

const steps = [-250,-100,-50,-10,1,10,50,100,250,500];
const currentStep = 6;

const initialState = {
	time: moment('2016-09-04 11:00'),
	playing: true,
	speed: steps[currentStep],
	steps: steps,
	currentStep: currentStep,
	maxSpeed: steps[steps.length-1],
	minSpeed: steps[0]
};

function schedule(state = initialState, action) {

	switch(action.type) {
		default :
			return state;
		case RESET :
			return initialState;
		case PLAY :
			return {
				...state,
				playing: true
			};
		case PAUSE :
			return {
				...state,
				playing: false
			};
		case INCREASE_SPEED :

			if(state.currentStep < steps.length) {
				let nextStep = state.currentStep+1;
				let speed = state.steps[nextStep];

				return {
					...state,
					currentStep: nextStep,
					speed: speed,
				}
			}

			return state;
		case DECREASE_SPEED :

			if(state.currentStep > 0) {
				let nextStep = state.currentStep-1;
				let speed = state.steps[nextStep];

				return {
					...state,
					currentStep: nextStep,
					speed: speed,
				}
			}

			return state;
		case SET_TIME :
			return {
				...state,
				time: action.payload
			};
	}
}

export default schedule;