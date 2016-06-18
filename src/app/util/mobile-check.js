export default function isMobileOrTablet()
{
	const userAgent = navigator.userAgent || navigator.vendor || window.opera;

	if(userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
		return true;
	}

	if(userAgent.match(/Android/i)) {
		return true;
	}

	return false;
}