import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';

import {FlatButton, Tabs, Tab} from 'material-ui';

import Dashboard from "./dashboard";
import SideMenu from './drawer';
console.log("Drawer is ..");
console.log(JSON.stringify(SideMenu, null, '	'));

import {withStyles, createStyleSheet } from 'material-ui/styles';

injectTapEventPlugin();

interface IState {
    index: number;
}

const styleSheet = createStyleSheet('App', (theme) => ({
	root: {
		flexGrow: 1,
		marginTop: 30,
	},
	appBar: {
		backgroundColor: theme.palette.primary[200],
		color: theme.palette.getContrastText(theme.palette.primary[100]),
	},
}));

class App extends React.Component<any, IState> {
    constructor(props) {
        super();
        this.state = {
            index: 0,
        }

        const {
            children,
            classes,
            className,
            variant,
            ...other
        } = props;

        console.log("App constructor is called.");
    }

    handleChange = (event, index) => {
        this.setState({ index });
        console.log(`handleChange is called. ${index}`);
    }

    public render() {
        return <div>
        <Tabs className={this.props.classes.appBar} index={this.state.index} onChange={this.handleChange}>
        <Tab label="Tab01" />
        <Tab label="Tab02" />
        <Tab label="Tab03" />
        </Tabs>
        {this.state.index === 0 && <h1><Dashboard /></h1>}
        {this.state.index === 1 && <h1>Content 2</h1>}
        {this.state.index === 2 && <h1>Content 3</h1>}
        </div>
    }
}

const StyledApp = withStyles(styleSheet)(App);

ReactDOM.render(<MuiThemeProvider key="mtProvider" ><div>
				<StyledApp>{'App'}</StyledApp><SideMenu></SideMenu>
				</div></MuiThemeProvider>,
                document.querySelector('#app'));
