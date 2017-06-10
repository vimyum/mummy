import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import {withStyles, createStyleSheet } from 'material-ui/styles';

// import Dashboard from "./dashboard";
import InboxIcon from 'material-ui-icons/Inbox';
import LightbulbOutline from 'material-ui-icons/LightbulbOutline';
import { lightGreen } from 'material-ui/styles/colors';
import NodeTemplates from '../nodeTemplates';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import reducer from '../rootReducer';

import TabMenu from '../containers/tabMenu';
import Dashboard from '../containers/dashboard';

const theme = createMuiTheme({
  palette: createPalette({
    primary: {
		...lightGreen, 
        500: '#689F38',
    },
  }),
});

const styleSheet = createStyleSheet('App', (theme) => ({
	root: {
		flexGrow: 1,
		marginTop: 30,
	},
	appBar: {
		backgroundColor: lightGreen[700],
		color: theme.palette.getContrastText(theme.palette.primary[500]),
	},
}));

interface IState {
    index?: number;
    sideMenuIsOpen?: boolean;
    nodes?: any;     // TBD きちんと定義する
    connections?: any; // TBD きちんと定義する
    templates?: any; // TBD きちんと定義する
    nodeMaxId?: number;
    nodeConfigIsOpen?: boolean;
    currentAsset?: number;
    currentNode?: number;
    needRefresh?: boolean;
}

class App extends React.Component<any, IState> {
    private refreshFuncs = [];

    constructor(props) {
        super();
        const {
            children,
            classes,
            className,
            variant,
            ...other
        } = props;
        console.log("App constructor is called.");
    }

    public render() {
        console.log("this.props:" + JSON.stringify(this.props, null, '  '));
        return  <MuiThemeProvider theme={theme} key="mtProvider">
                    <div>
                    <TabMenu />
                    { this.props.tabIndex === 1  && this.props.needRefresh === false &&
                        <Dashboard ref='dashboard' />
                    }
                    </div>
               </MuiThemeProvider>;
    }
}

export default connect(state => ({ dark: state.dark }))(App);
