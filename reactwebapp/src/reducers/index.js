import { createStore, combineReducers } from 'redux';

import authenticationReducer from './authentication';
import postReducer from './post'

const allReducers = combineReducers({
    authenticationReducer, // equals authenticationReducer: authenticationReducer
    postReducer
})

export default allReducers