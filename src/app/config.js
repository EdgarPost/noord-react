const env = 'dev';

const config = {};

config.prod = {
	basePath: 'https://www.edgarpost.com/noord'
};

config.dev = {
	basePath: 'http://localhost/noord'
};

export default config[env];