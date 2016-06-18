export const RESET = 'RESET'
export const PLAY = 'PLAY'
export const PAUSE = 'PAUSE'
export const INCREASE_SPEED = 'INCREASE_SPEED'
export const DECREASE_SPEED = 'DECREASE_SPEED'
export const SET_TIME = 'SET_TIME'

const fps = 60;
let interval;
let startTime;

export function play() {

	clearInterval(interval);
	
	startTime = Date.now();
	
	return function(dispatch, getState) {
		
		dispatch({
			type: PLAY
		});

		interval = setInterval(() => {

			const state = getState().controls;
			const speed = state.speed;
			const diff = Date.now() - startTime;
			startTime = Date.now();

			const newTime = state.time.add(diff * speed, 'milliseconds');
			
			dispatch(setTime(newTime));

		}, 1000/fps);
	};
}

export function pause() {
	clearInterval(interval);
	
	return {
		type: PAUSE
	}
}

export function reset()
{
	return {
		type: RESET
	};
};

export function increaseSpeed()
{
	return {
		type: INCREASE_SPEED
	};
};

export function decreaseSpeed()
{
	return {
		type: DECREASE_SPEED
	};
};

export function setTime(time)
{
	return {
		type: SET_TIME,
		payload: time
	};
};