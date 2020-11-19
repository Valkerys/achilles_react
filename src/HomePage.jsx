/**
 * DebugInfo.jsx
 * Purpose:
 * Debug Info for app
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import "./HomePage.scss";

class HomePage extends Component {
	constructor(props) {
		super(props);
	}

	//==================== Life Cycle Functions ====================

	render() {
		return <div>yeet</div>
	}
}

HomePage.propTypes = {
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

export default HomePage;