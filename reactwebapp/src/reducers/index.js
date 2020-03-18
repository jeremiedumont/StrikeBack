import { createStore, combineReducers } from 'redux';

import authenticationReducer from './authentication';

const allReducers = combineReducers({
    authenticationReducer // equals authenticationReducer: authenticationReducer
})

export default allReducers