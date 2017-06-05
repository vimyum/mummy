import { combineReducers } from 'redux';
import dashboard from './reducers/dashboard';
import app from './reducers/app';

const rootReducer = combineReducers({
    app,
    dashboard,
});

export default rootReducer;
