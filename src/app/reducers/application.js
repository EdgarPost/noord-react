import config from '~/config'

const initialState = {
	type: config.type,
	mobile: config.mobile
};

function application(state = initialState, action) {
	return state;
}

export default application;