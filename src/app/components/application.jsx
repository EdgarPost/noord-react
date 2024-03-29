import React from "react";
import GoogleMaps from "~/components/google-maps";
import Route from "~/components/route";
import Legend from "~/components/legend";
import Controls from "~/components/controls";
import { connect } from "react-redux";
import { loadRoute } from "~/actions/routes";
import { setTime, play } from "~/actions/controls";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import moment from "moment";
import axios from "axios";
import _ from 'lodash';
import config from '~/config';

import routes from '~/data/routes.json'

const muiTheme = getMuiTheme({});

const Application = React.createClass({

	getInitialState() {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	},

	loadRoutes() {

		let earliestTime;

		// return axios(`~/data/routes.json`).then((response) => {
		Object.keys(routes).forEach(id => {

			const route = routes[id];
			route.startTime = moment(route.startTime);

			if (!earliestTime || route.startTime.valueOf() < earliestTime.valueOf()) {
				earliestTime = route.startTime;
			}

			this.props.loadRoute(id, { ...route });
		});

	},


	componentDidMount() {
		window.addEventListener('resize', () => {
			this.setState({
				width: window.innerWidth,
				height: window.innerHeight
			})
		})

		this.loadRoutes();
	},

	handleGoogleMapsReady() {
		if (this.props.playing) {
			this.props.play();
		}
	},

	renderRoutes() {

		const { routesVisible, routes } = this.props;

		if (!routesVisible) {
			return null;
		}

		routes.sort((a, b) => a.distance < b.distance);

		let scale = 1;

		if (this.state.width <= 1024 || this.state.height <= 768) {
			scale = 0.75;
		}

		return (
			<div style={{ position: 'fixed', right: 10, top: 10, transform: `scale(${scale})`, transformOrigin: 'top right' }}>
				{routes.map(route => <Route key={route.id} data={route} />)}
				<Legend />
			</div>
		)
	},

	render() {

		const routes = this.renderRoutes();

		return (
			<MuiThemeProvider muiTheme={muiTheme}>

				<div style={{ width: '100%', height: '100%' }}>

					<GoogleMaps key="google-maps" apiKey="AIzaSyBwrDGfELn5C4-tgdT9V-hpljRYTc69QUg"
						onReady={this.handleGoogleMapsReady} />

					{routes}

					<Controls />

				</div>

			</MuiThemeProvider>
		);
	},
});

const mapStateToProps = (state, props) => {
	return {
		routesVisible: !state.application.mobile,
		playing: state.controls.playing,
		routes: state.routes,
	}
}

const mapStateToDispatch = (dispatch, state) => {
	return {
		loadRoute: (id, options) => dispatch(loadRoute(id, options)),
		play: () => dispatch(play()),
		setTime: (time) => dispatch(setTime(time))
	};
}

export default connect(mapStateToProps, mapStateToDispatch)(Application);
