import * as appTypes from "~/enum/app-types";
import isMobileOrTablet from "~/util/mobile-check";
import _ from "lodash";

const pathName = window.location.toString();

let env = 'prod';
if(window.location.hostname === 'localhost')
{
	env = 'dev';
}

let config = {
	type: appTypes.TYPE_LIVE,
	mobile: isMobileOrTablet()
};

if(_.includes(pathName, '/manager'))
{
	config.type = appTypes.TYPE_MANAGER
}

if(_.includes(pathName, '/view'))
{
	config.type = appTypes.TYPE_VIEWER
}

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