/**
 * App.jsx
 * Purpose:
 * 
 */

import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
	Redirect,
	Route,
	Switch
} from "react-router-dom";

import DebugInfo from "./DebugInfo.jsx";
import { breakpoints } from "./constants/constants.js";
import HomePage from "./HomePage.jsx";
import {
	setBreakpoint,
} from "./redux/actions";

import './App.scss';

const APP_VERSION = "1.0.0";

const SESSION_TIMEOUT_MILLISECONDS = 1000 * 60 * 60 * 12;
const SESSION_HEARTBEAT_MILLISECONDS = 1000 * 60;
class App extends Component {
	constructor(props) {
		super(props);
		
		App.singletonRef = this;
		this.routerRef = React.createRef();

		this.handleResize = this.handleResize.bind(this);
	}


	static getRouterHistory() {
		const self = App.singletonRef;

		if(!self) return;

		return self.props.history;
	}

	static goBackRoute() {
		const  history = App.getRouterHistory();

		if (history) {
			history.goBack();
		}
	}

	/**
	 * static function to log out user and go to login screen somehing
	 * @oublic
	 */
	static logout() {
		if (this.logoutTimer) {
			clearInterval(this.logoutTimer);
			this.logoutTimer = null;
		}

		// clear the session data to force a new session and login
		sessionStorage.clear();
		App.setCookie("avoid_autologin", 1, 5);
		// go to login page
		window.location.href = "/login";
	}

	static pushRoute(route) {
		const  history = App.getRouterHistory();
		
		if (history) {
			history.push(route);
		}
	}

	static replaceRoute(route) {
		const  history = App.getRouterHistory();
		
		if (history) {
			history.replace(route);
		}
	}

	/**
	 * static function to set a cookie in the browser
	 * @param {string} name 
	 * @param {string} value 
	 * @param {number} minToExpiration 
	 */
	static setCookie(name, value, minToExpiration) {
		let date = new Date();
		date.setTime(date.getTime() + (minToExpiration * 60 * 1000));
		let expires = "expires="+date.toUTCString();
		document.cookie = name + "=" + value + ";" + expires + ";path=/";
	}


	/**
	 * static function to set app in waiting state (wait cursor with clicks disabled)
	 * @param {bool} waiting 
	 * @param {bool} disableClicks 
	 */
	static setWaiting(waiting, disableClicks = true) {
		if (waiting) {
			if (disableClicks) {
				document.getElementsByClassName("react-body")[0].classList.add("waiting");
			}
			document.body.style.cursor = "wait";
		} else {
			document.getElementsByClassName("react-body")[0].classList.remove("waiting");
			document.body.style.cursor = "default";
		}
	}

	/**
	 * static function to return app version
	 * @returns version string
	 * @public
	 */
	static version() {
		return APP_VERSION;
	}

	/**
	 * Handle window resize event to set breakpoint
	 * @public
	 */
	handleResize() {
		let breakpoint = "mobilePortrait";
		const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		
		Object.keys(breakpoints).forEach( (key) => {
			if (w >= breakpoints[key]) {
				breakpoint = key;
			}
		});
		
		if (breakpoint !== this.props.breakpoint) {
			this.props.setBreakpoint(breakpoint, breakpoints[breakpoint]);
		}
	}

	
	//==================== Life Cycle Functions ====================

	componentDidMount() {
		window.addEventListener("resize", this.handleResize);
		window.onorientationchange = this.handleResize;
		this.handleResize();
	}
	
	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize);
		window.onorientationchange = null;
	}

	render() {
		const {
		} = this.props;

		console.log(process.env.REACT_APP_NAME);

		return (
			<div className="react-body">
				{"Hello"}
				<Route exact path="*" component={HomePage}/>
				{(process.env.REACT_APP_DEBUG === "TRUE") && <DebugInfo />}
			</div>
		);
	}
}

App.propTypes = {
	/** id of app (8=ADMIN_TOOL) */
	appId: PropTypes.number.isRequired,
	/** current window breakpoint */
	breakpoint: PropTypes.string,
	/** name of current selected tool from redux store*/
	selectedTool: PropTypes.string,
};

const mapStateToProps = (state) => {
	return {
		appId: state.appId,
		breakpoint: state.setBreakpointReducer.breakpoint,
		selectedTool: state.setSelectedToolReducer.selectedTool,
	};
};

export default  withRouter(connect(mapStateToProps, {setBreakpoint})(App));
