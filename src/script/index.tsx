import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {Tabs, Tab} from 'material-ui';
import {withStyles, createStyleSheet } from 'material-ui/styles';

import { lightGreen } from 'material-ui/styles/colors';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/app';
import createFinalStore from './store';

const store = createFinalStore();

injectTapEventPlugin();

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
    document.querySelector('#app'));
