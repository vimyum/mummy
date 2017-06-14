import { combineReducers } from 'redux';
import dashboard from './reducers/dashboard';
import assets from './reducers/assets';
import app from './reducers/app';

const rootReducer = combineReducers({
    app,
    dashboard,
    assets,
});

export default rootReducer;
