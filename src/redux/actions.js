// actions.js

export const SET_BREAKPOINT = "SET_BREAKPOINT";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_LANGUAGE_STRINGS = "SET_LANGUAGE_STRINGS";

export const setBreakpoint = (breakpoint, limit) => (
	{
		type: SET_BREAKPOINT,
		breakpoint: breakpoint,
		limit: limit
	}
);

export const setLanguage = (language) => (
	{
		type: SET_LANGUAGE,
		payload: language
	}
);

export const setLanguageStrings = (strings) => (
	{
		type: SET_LANGUAGE_STRINGS,
		payload: strings
	}
);
