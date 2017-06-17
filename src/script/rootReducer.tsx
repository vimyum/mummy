import { combineReducers } from 'redux';
import dashboard from './reducers/dashboard';
import assets from './reducers/assets';
import app from './reducers/app';

const rootReducer = combineReducers({
    app,
    assets,
    dashboard,
});

export default rootReducer;
