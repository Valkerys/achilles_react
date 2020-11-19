/**
 * constants.js
 * Single location for global js constants
 */

// breakpoints: minimum screen widths for a given UI layout style
// Note: these are in smallest to largest size order
export const breakpoints = {
	mobilePortrait: parseInt(`${process.env.REACT_APP_BREAKPOINT_MOBILE_PORTRAIT}`),
	mobileLandscape: parseInt(`${process.env.REACT_APP_BREAKPOINT_MOBILE_LANDSCAPE}`),
	tabletPortrait: parseInt(`${process.env.REACT_APP_BREAKPOINT_TABLET_PORTRAIT}`),
	desktop: parseInt(`${process.env.REACT_APP_BREAKPOINT_DESKTOP}`)
};

// colors used in reports for chartjs, which use in-line styling. Should match colors in constants.scss.
export const colors = {
	colorGray2: "#666666",
	colorGray3: "#b2b2b2",
	colorPurple2: "#66008c"
}
