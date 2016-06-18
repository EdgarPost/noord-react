import React from "react";
import scriptjs from "scriptjs";
import {connect} from "react-redux";
import {setZoomLevel, setCenter} from "~/actions/google-maps";
import * as Colors from "material-ui/styles/colors";

function getIndexAtDistance(polyline, metres) {

	// some awkward special cases
	if (metres === 0) return {
		index: 0,
		point: polyline.getPath().getAt(0)
	};
	if (metres < 0) return null;
	if (polyline.getPath().getLength() < 2) return null;
	let dist=0;
	let olddist=0;
	let i;
	for (i=1; (i < polyline.getPath().getLength() && dist < metres); i++) {
		olddist = dist;

		dist += google.maps.geometry.spherical.computeDistanceBetween(
			polyline.getPath().getAt(i),
			polyline.getPath().getAt(i-1)
		);
	}

	if (dist < metres) {
		return {
			point: polyline.getPath().getAt(i-1),
			index: i
		};
	}

	const p1= polyline.getPath().getAt(i-2);
	const p2= polyline.getPath().getAt(i-1);
	const m = (metres-olddist)/(dist-olddist);

	return {
		point: new google.maps.LatLng( p1.lat() + (p2.lat()-p1.lat())*m, p1.lng() + (p2.lng()-p1.lng())*m),
		index: i-1
	};
};

const GoogleMaps = React.createClass( {

	propTypes: {
		apiKey: React.PropTypes.string.isRequired,
		onReady: React.PropTypes.func.isRequired
	},

	getInitialState() {
		return {
			map: null,
			polylines: [],
			activePolylines: [],
		}
	},

	shouldComponentUpdate() {
		return false;
	},

	componentDidMount() {
		this.loadMaps();
	},

	componentWillReceiveProps( props ) {

		const {map} = this.state;
		const {maps, routes} = props;

		if( map )
		{
			// map.setZoom( maps.zoom );
			//map.setCenter( new google.maps.LatLng( maps.center.lat, maps.center.lng ) );

			routes.map( route => this.renderIndividualRoute( route ) );
		}
	},

	renderIndividualRoute( route ) {

		const { map, polylines, activePolylines } = this.state;
		const { controls } = this.props;
		const { time } = controls;

		let polyline = polylines.filter(polyline => polyline.id === route.id)[0];
		let activePolyline = activePolylines.filter(activePolyline => activePolyline.id === route.id)[0];

		if(typeof polyline === 'undefined') {

			polyline = {
				id: route.id,
				line: new google.maps.Polyline( {
					map: map,
					path: route.points,
					geodesic: true,
					strokeColor: Colors.blueGrey300,
					strokeOpacity: 1,
					strokeWeight: 2
				})
			};

			this.setState({
				polylines: [...polylines, polyline]
			});
		}

		if(typeof activePolyline === 'undefined') {

			activePolyline = {
				id: route.id,
				line: new google.maps.Polyline( {
					map: map,
					path: [],
					geodesic: true,
					strokeColor: route.color,
					strokeOpacity: route.enabled ? 1 : 0, 
					strokeWeight: route.size,
					zIndex: 100 - route.size
				})
			};

			this.setState({
				activePolylines: [...activePolylines, activePolyline]
			});
		}

		activePolyline.line.setVisible(route.enabled);

		let slowestPoint = getIndexAtDistance( polyline.line, route.slowDistance*1000 );
		let fastestPoint = getIndexAtDistance( polyline.line, route.fastDistance*1000 );

		if(slowestPoint || fastestPoint)
		{
			let activePart = route.points.slice( slowestPoint.index, fastestPoint.index );

			activePart.unshift( {
				lat: slowestPoint.point.lat(),
				lng: slowestPoint.point.lng(),
			} );
			activePart.push( {
				lat: fastestPoint.point.lat(),
				lng: fastestPoint.point.lng(),
			} );

			activePolyline.line.setPath( activePart );
		}
	},

	initMaps() {

		const map = new google.maps.Map( this.refs.maps, {
			center: this.props.maps.center,
			zoom: this.props.maps.zoom
		} );

		this.setState( {
			map: map
		} );

		this.addMarkers();

		google.maps.event.addListener(map, 'click', function( event ){
			console.log( "lat: "+event.latLng.lat()+" "+", lng: "+event.latLng.lng() );
		});
		
		this.props.onReady();
	},

	addMarkers() {
		const {markers} = this.props.maps;
		const {map} = this.state;
		const scale = 3;

		markers.map(marker => {

			const image = {
				url: marker.icon,
				size: new google.maps.Size(98, 98),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(marker.anchor.x/scale, marker.anchor.y/scale),
				scaledSize: new google.maps.Size(98/scale, 98/scale)
			};

			const googleMarker = new google.maps.Marker({
				...marker,
				icon: image,
				map: map
			});
		})
	},

	loadMaps() {

		window.initMaps = this.initMaps;

		scriptjs( `https://maps.googleapis.com/maps/api/js?key=${this.props.apiKey}&callback=initMaps&libraries=geometry` );
	},

	render() {

		return (
			<div ref="maps" style={{width: '100%', height: '100%'}}></div>
		);
	},
} );

const mapStateToProps = ( state, props ) =>
{
	return {
		maps: state.maps,
		routes: state.routes,
		controls: state.controls,
	}
};

const mapDispatchToProps = ( dispatch ) =>
{
	return {
	}
};

export default connect( mapStateToProps, mapDispatchToProps )( GoogleMaps );
