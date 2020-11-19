/**
 * index.js
 * Purpose:
 * Entry point for the application
*/

import 'babel-polyfill';
import 'react-app-polyfill/ie11';

import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import { Provider } from "react-redux";
import './index.scss';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import store from "./redux/index.js";

render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
