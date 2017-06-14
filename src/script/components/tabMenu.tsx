import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Tabs, Tab} from 'material-ui';
import {withStyles, createStyleSheet } from 'material-ui/styles';
import { lightGreen } from 'material-ui/styles/colors';

const styleSheet = createStyleSheet('App', (theme) => ({
	appBar: {
		// backgroundColor: theme.palette.primary[500],
		backgroundColor: lightGreen[700],
		color: theme.palette.getContrastText(theme.palette.primary[500]),
	},
}));

function TabMenu(props) {
    return <Tabs className={props.classes.appBar} index={props.tabIndex} onChange={props.handleClick}>
        <Tab label="Asset-Shadow" />
        <Tab label="Flow-Editor" />
        <Tab label="Dashboard" />
    </Tabs>;
}

export default withStyles(styleSheet)(TabMenu);
