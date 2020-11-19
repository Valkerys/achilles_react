/**
 * DebugInfo.jsx
 * Purpose:
 * Debug Info for app
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import App from "./App.jsx";

import "./DebugInfo.scss";

class DebugInfo extends Component {
	constructor(props) {
		super(props);

		this.getDeviceInfo = this.getDeviceInfo.bind(this);
		this.getViewInfo = this.getViewInfo.bind(this);
		this.handleResize = this.handleResize.bind(this);
		this.toggleVisibility = this.toggleVisibility.bind(this);

		this.infos = {};

		this.state = {
			visible: false
		}

		DebugInfo.singletonRef = this;
	}

	/**
	 * Add some info to display
	 * @param {string} name label for info
	 * @param {info} info info to display
	 * @public
	 */
	static addInfo(name, info) {
		const self = DebugInfo.singletonRef;

		self.infos[name] = info;
		self.forceUpdate();
	}

	/**
	 * Return the device dimensions as string
	 * @public
	 */
	getDeviceInfo() {
		const w = window.screen.width;
		const h = window.screen.height;
		return w + " x " + h;
	}

	/**
	 * Return the view dimensions as string
	 * @public
	 */
	getViewInfo() {
		const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return w + " x " + h;
	}

	/**
	 * Callback for window resized
	 * @public
	 */
	handleResize() {
		DebugInfo.addInfo("view", this.getViewInfo());
	}

	/**
	 * Callback to toggle display of debug info panel
	 * @public
	 */
	toggleVisibility() {
		this.setState({ visible: !this.state.visible });
	}


	//==================== Life Cycle Functions ====================

	componentDidMount() {
		DebugInfo.addInfo("version", `${App.version()}`);
		DebugInfo.addInfo("device", this.getDeviceInfo());
		DebugInfo.addInfo("view", this.getViewInfo());
		DebugInfo.addInfo("breakpoint", null);

		// capture resize events to update dimensions in panel
		window.addEventListener("resize", this.handleResize);
	}
	
	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize);
	}

	render() {
		const {
			breakpoint,
			breakpointLimit
		} = this.props;

		if (this.state.visible) {
			if (breakpoint !== this.infos.breakpoint) {
				this.infos["breakpoint"] = breakpoint + " " + breakpointLimit;
			}
			return (
				<div className="debug-info" onClick={this.toggleVisibility}>
					{
						Object.keys(this.infos).reverse().map( (key) => {
							return <div key={key}>{key + ": " + this.infos[key]}</div>
						})
					}
				</div>
			);
		}
		return <div className="debug-info" onClick={this.toggleVisibility}>{"version: " + this.infos["version"]}</div>
	}
}

DebugInfo.propTypes = {
	/** the width breakpoint from the redux store */
	breakpoint: PropTypes.string,
	/** the width breakpoint limit from the redux store */
	breakpointLimit: PropTypes.number
};

const mapStateToProps = (state) => {
	return {
		breakpoint: state.setBreakpointReducer.breakpoint,
		breakpointLimit: state.setBreakpointReducer.limit
	};
};

export default connect(mapStateToProps)(DebugInfo);