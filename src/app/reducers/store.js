import {combineReducers, createStore, compose, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import application from "./application";
import maps from "./google-maps";
import routes from "./routes";
import controls from "./controls";

const initialState = {};

const store = createStore( combineReducers( {
	application,
	controls,
	maps,
	routes
} ), initialState, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
) );


export default store; 