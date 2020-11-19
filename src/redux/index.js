import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from "redux";
import { reducers, initialState } from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(reducers, initialState, composeWithDevTools(applyMiddleware(
    thunkMiddleware
)));
