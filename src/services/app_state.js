import * as reducers from './reducers'

const reducer = Redux.combineReducers(reducers);

const store = Redux.createStore(reducer);

export default store;