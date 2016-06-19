import * as appTypes from '~/enum/app-types'
import isMobileOrTablet from '~/util/mobile-check'
import _ from 'lodash';
const env = 'dev';

let config = {
	type: appTypes.TYPE_LIVE,
	mobile: isMobileOrTablet()
};

const pathName = window.location.toString();

if(_.includes(pathName, '/manager')) {
	config.type = appTypes.TYPE_MANAGER
}

if(_.includes(pathName, '/view')) {
	config.type = appTypes.TYPE_VIEWER
}

console.log(config.type);

switch(env)
{
	default :
		config = {
			...config,
			basePath: 'http://localhost/noord'
		}
		break;
	case 'prod' :
		config = {
			...config,
			basePath: 'https://www.edgarpost.com/noord'
		};
		break;
}

export default config;