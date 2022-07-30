import React from "react";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import LinearProgress from 'material-ui/LinearProgress';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import {toggleRoute, setRouteProperty} from '../actions/routes'
import {play, pause} from '../actions/controls'
import {connect} from 'react-redux'
import * as appTypes from '~/enum/app-types'
import _ from 'lodash'
import moment from 'moment'

const Route = React.createClass({

	propTypes: {
		data: React.PropTypes.object.isRequired,
		showDetails: React.PropTypes.bool.isRequired,
	},

	getDefaultProps() {
		return {
			showDetails: false
		}
	},

	getInitialState() {
		return {
			paused: false
		}
	},

	render() {

		const { data, showDetails } = this.props;
// debugger;
		return (
			<Card style={{width: 320, marginBottom: 10}} initiallyExpanded={data.open}>
				<CardHeader
					title={data.title}
					subtitle={`Afgelegd: ${_.round(Math.min(data.distance, data.fastDistance), 1)} km`}
					titleColor={data.color}
					actAsExpander={showDetails}
					showExpandableButton={showDetails}
					avatar={data.logo}
				/>
				<CardText expandable={false} style={{paddingTop:0}}>
					<LinearProgress mode="determinate" value={data.fastProgress} color={data.color} style={{marginBottom:2}} />
					<LinearProgress mode="determinate" value={data.slowProgress} color={data.color} />
				</CardText>
				<CardText expandable={true} style={{paddingTop:0}}>

					<Toggle
						label="Actief"
						style={{marginTop: 10}}
						toggled={data.enabled}
					    onToggle={this.props.toggleRoute}
					/>

					<TextField
						type="numeric"
						hintText="Snelheid langzaamste loper"
						floatingLabelText="Snelheid langzaamste loper"
						value={data.slowSpeed}
						onChange={(event) => this.props.setSpeed('slow', event.target.value)}
					/>

					<TextField
						hintText="Snelheid snelste loper"
						floatingLabelText="Snelheid snelste loper"
						value={data.fastSpeed}
						onChange={(event) => this.props.setSpeed('fast', event.target.value)}
					/>

					<TimePicker
						format="24hr"
						hintText="Starttijd"
						floatingLabelText="Starttijd"
					    value={data.startTime.toDate()}
						onFocus={() => {
							if(this.props.playing) {
								this.setState({
									paused: true
								});
								this.props.pause();
							}
						}}
					    onDismiss={() => {
					    	if(this.state.paused) {
					    		this.props.resume();

					    		this.setState({
									paused: false
								});
					    	}
					    }}
						onChange={(event, value) => {
							this.props.setStartTime(value);

							if(this.state.paused) {
					    		this.props.resume();

					    		this.setState({
									paused: false
								});
					    	}
						}}
					/>

				</CardText>
			</Card>
		);
	},
});

const mapStateToProps = (state, props) => {

	return {
		playing: state.controls.playing,
		showDetails: state.application.type === appTypes.TYPE_MANAGER,
	}
};

const mapDispatchToProps = (dispatch, props) => {

	const { id } = props.data;

	return {
		toggleRoute: () => dispatch(toggleRoute(id)),
		pause: () => {
			dispatch(pause())
		},
		resume: () => {
			dispatch(play())
		},
		setStartTime: (value) => {
			dispatch(setRouteProperty(id, 'startTime', moment(value)));
		},
		setSpeed: (type, value) => {

			const num = _.toNumber(value);

			if(!_.isNaN(num)) {
				return dispatch(setRouteProperty(id, `${type}Speed`, value));
			}
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Route);
