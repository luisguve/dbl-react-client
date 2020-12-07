import * as reducers from './reducers'
import { createStore, combineReducers } from "redux";

const reducer = combineReducers(reducers);

const store = createStore(reducer);

export default store;