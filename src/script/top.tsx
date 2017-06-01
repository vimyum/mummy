import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import {withStyles, createStyleSheet } from 'material-ui/styles';

import { lightGreen, teal } from 'material-ui/styles/colors';

import Grid from 'material-ui/Grid';

injectTapEventPlugin();

const theme = createMuiTheme({
  palette: createPalette({
    primary: teal, 
  }),
});

const styleSheet = createStyleSheet('ButtonAppBar', {
    root: {
        position: 'relative',
        margin: 0,
        width: '100%',
    },
    appBar: {
        position: 'relative',
		backgroundColor: lightGreen[700],
		// color: theme.palette.getContrastText(theme.palette.primary[500]),
    },
    flex: {
        flex: 1,
    },
    startButton: {
		backgroundColor: lightGreen[700],
        textTransform: "none",
        marginTop: "2em",
    },
    gridContainer: {
        textAlign: "center",
    },
});

class App extends React.Component<any, any> {

    constructor(props) {
        super();
    }

    public render() {
        const classes = this.props.classes;
        return (
        <div className={classes.root}>

        <AppBar className={classes.appBar}>
        <Toolbar>
        <IconButton contrast>
        	<MenuIcon />
        </IconButton>
        <Typography type="title" colorInherit className={classes.flex}></Typography>
		<Button contrast>Login</Button>
		<Button contrast>Git</Button>
        </Toolbar>
        </AppBar>
		<div id="titleContainer">
           <h1 id="mainTitle">ESPer Flow</h1>
           <h5 id="subTitle">version alpha-0.1</h5>
        </div>
        <Grid container justify="center" className={classes.gridContainer}>
            <Grid item xs={12} className="gridItem">
            <Button component="a"raised primary className={classes.startButton}
                href="index.html">Try now</Button>
            </Grid>
            <Grid item xs={6}>
                <p>簡単な説明</p>
            </Grid>
            <Grid item xs={6}>
                <p>Join us.</p>
            </Grid>
        </Grid>
  </div>);
    }
}

const StyledApp = withStyles(styleSheet)(App);

ReactDOM.render(<MuiThemeProvider key="mtProvider" theme={theme}>
                <StyledApp></StyledApp></MuiThemeProvider>,
                document.querySelector('#app'));

