// reducers.js
import { combineReducers } from 'redux'
import {
	SET_BREAKPOINT,
	SET_LANGUAGE,
	SET_LANGUAGE_STRINGS,
} from './actions.js'

const languageStringsInitialState = {
	language: "en-us",
	languageStrings: {}
}

const languageStringsReducer = (state = languageStringsInitialState, action = {}) => {
	switch (action.type) {
		case SET_LANGUAGE:
			const returnState = {
				...state,
				language: action.payload
			};
			sessionStorage.setItem("language", JSON.stringify(returnState));
			return returnState;
		case SET_LANGUAGE_STRINGS:
			const returnState2 = {
				...state,
				languageStrings: action.payload
			};
			return returnState2;
		default:
			return state;
	}
}

const setBreakpointInitialState = {
	breakpoint: null,
	limit: 0
};

const setBreakpointReducer = (state = setBreakpointInitialState, action = {}) => {
	switch (action.type) {
		case SET_BREAKPOINT:
			const returnState = {
				...state,
				breakpoint: action.breakpoint,
				limit: action.limit
			};
			return returnState;
		default:
			return state;
	}
}

const getInitialState = () => {
	let result = {
		appId: parseInt(process.env.REACT_APP_ID),
	};

	let storedData = sessionStorage.getItem("breakpoint");
	result.setBreakpointReducer = storedData ? JSON.parse(storedData) : setBreakpointInitialState;
	
	storedData = sessionStorage.getItem("language");
	result.languageStringsReducer = storedData ? JSON.parse(storedData) : languageStringsInitialState;

	return result;
};

export const initialState = getInitialState();

export const reducers = combineReducers({
	appId: (state = {}) => state,
	languageStringsReducer,
	setBreakpointReducer,
});
