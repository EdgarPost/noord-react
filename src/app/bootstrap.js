import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import Application from '~/components/application'
import {Provider} from "react-redux";
import store from '~/reducers/store' 

injectTapEventPlugin();

ReactDOM.render(<Provider store={store}>
	<Application />
</Provider>, document.getElementById('app'));
