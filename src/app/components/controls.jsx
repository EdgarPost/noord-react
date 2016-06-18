import React from "react";
import IconButton from "material-ui/IconButton";
import PlayIcon from "material-ui/svg-icons/av/play-arrow";
import PauseIcon from "material-ui/svg-icons/av/pause";
import ForwardIcon from "material-ui/svg-icons/av/fast-forward";
import RewindIcon from "material-ui/svg-icons/av/fast-rewind";
import TimePicker from 'material-ui/TimePicker';
import * as appTypes from '~/enum/app-types'
import Paper from "material-ui/Paper";
import {connect} from "react-redux";
import {pause, play, increaseSpeed, decreaseSpeed} from "../actions/controls";

const Controls = React.createClass( {

	propTypes: {
		visible: React.PropTypes.bool.isRequired
	},

	getDefaultProps() {
		return {
			visible: true
		}
	},

	render() {

		const {controls, visible} = this.props;

		if(!visible) {
			return null;
		}

		const toggleButton = React.createElement(controls.playing ? PauseIcon  : PlayIcon);

		return (
			<Paper style={{width: 400, height: 50, position: 'fixed', left: 5, bottom: 5}}>
				<IconButton onTouchTap={() => this.props.togglePlay(controls.playing)}>
					{toggleButton}
				</IconButton>

				<IconButton onTouchTap={this.props.decreaseSpeed} disabled={controls.speed <= controls.minSpeed}>
					<RewindIcon />
				</IconButton>

				<span style={{top:-6,position:'relative',width: 30, display: 'inline-block', textAlign: 'center'}}>
					{controls.speed}x
				</span>

				<IconButton onTouchTap={this.props.increaseSpeed} disabled={controls.speed >= controls.maxSpeed}>
					<ForwardIcon />
				</IconButton>

				<span style={{top:-6,position:'relative'}}>
					{controls.time.format('D MMMM HH:mm:ss')}
				</span>
				
			</Paper>
		);
	},
} );

const mapStateToProps = ( state ) =>
{
	return {
		visible: state.application.type !== appTypes.TYPE_LIVE && !state.application.mobile,
		controls: state.controls
	}
};

const mapDispatchToProps = ( dispatch, props ) =>
{
	return {
		togglePlay: (playing) => dispatch(playing ? pause() : play()),
		play: () => dispatch(play()),
		increaseSpeed: () => dispatch(increaseSpeed()),
		decreaseSpeed: () => dispatch(decreaseSpeed()),
	}
};

export default connect( mapStateToProps, mapDispatchToProps )( Controls );
