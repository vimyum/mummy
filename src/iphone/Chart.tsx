import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import HighStock from './HighStock';

// for Material-UI
// import {Tabs, Tab} from 'material-ui';
// import {withStyles, createStyleSheet } from 'material-ui/styles';
// injectTapEventPlugin();

ReactDOM.render( <HighStock />,
    document.querySelector('#app'));
