import * as appTypes from '~/enum/app-types'
import isMobileOrTablet from '~/util/mobile-check'
const env = 'dev';

let config = {
	// type: appTypes.TYPE_MANAGER,
	// type: appTypes.TYPE_LIVE,
	type: appTypes.TYPE_VIEWER,
	mobile: isMobileOrTablet()
};

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