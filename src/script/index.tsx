import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';

import {FlatButton, Tabs, Tab} from 'material-ui';

import Dashboard from "./dashboard";
import SideMenu from './drawer';
import FloatingButton from './floatingButton';
import {withStyles, createStyleSheet } from 'material-ui/styles';
import InboxIcon from 'material-ui-icons/Inbox';

injectTapEventPlugin();

interface IState {
    index?: number;
    sideMenuIsOpen?: boolean;
    nodes?: any;     // TBD きちんと定義する
    connections?: any; // TBD きちんと定義する
    templates?: any; // TBD きちんと定義する
    nodeMaxId?: number;
}

const styleSheet = createStyleSheet('App', (theme) => ({
	root: {
		flexGrow: 1,
		marginTop: 30,
	},
	appBar: {
		backgroundColor: theme.palette.primary[500],
		color: theme.palette.getContrastText(theme.palette.primary[500]),
	},
}));

class App extends React.Component<any, IState> {
    constructor(props) {
        super();
        this.state = {
            index: 0,
            nodeMaxId: 10,
            sideMenuIsOpen: true,
            nodes: [],
            connections: [],
            templates: [{
                name: "GPIO Input", //表示用
                type: "gpio_in",   // 識別用
                icon: "icon",
                iconElement: <InboxIcon />,
            },
            {
                name: "GPIO Output", 
                type: "gpio_out",
                icon: "icon",
                iconElement: <InboxIcon />,
            },
            {
                name: "Sche", 
                type: "sleep",
                iconElement: <InboxIcon />,
            },
  ]
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

    private handleTabChange = (event, index) => {
        this.setState({ index });
        console.log(`handleTabChange is called. ${index}`);
    }

    private toggleSideMenuHandler = () => {
        console.log("openSideMenuHandler is called");
        this.setState({sideMenuIsOpen: !this.state.sideMenuIsOpen});
    }

    private addNodeHandler = (nodeInfo) => {
        let newNodeId = this.state.nodeMaxId + 1;
        this.setState({nodes : [...this.state.nodes, {
            id: this.state.nodeMaxId,
            type: nodeInfo.type,
            top: nodeInfo.top + "px",
            left: nodeInfo.left + "px",
        }]});
        this.setState({nodeMaxId: newNodeId});
    }


    private updateNodePositionHandler = ({nodeId, top, left}) => {
        console.log("updateNodePosition is called.");
        let currentNodes = this.state.nodes;
        let targetNode = currentNodes.filter(e => {
            return (e.id == nodeId);
        })[0];
        targetNode.left = `${left}px`;
        targetNode.top  = `${top}px`;
        this.setState({nodes : currentNodes});
    }
    
    private updateConnectionHandler = (newConnections: Array<any>) => {
        console.log("updateConnectionHandler is called.");
        this.setState({connections: newConnections});
    }

    public render() {
        return <div>
            <Tabs className={this.props.classes.appBar} index={this.state.index} onChange={this.handleTabChange}>
            <Tab label="Assets" />
            <Tab label="Flow" />
            <Tab label="Visualize" />
            </Tabs>
            { this.state.index === 0 && 
                <h1>
                <Dashboard
                     nodes={this.state.nodes} 
                     connections={this.state.connections}
                     onDrop={(nodeInfo) => {
                        this.addNodeHandler(nodeInfo);
                        this.toggleSideMenuHandler(); }
                     }
                     updateNodePositionHandler={this.updateNodePositionHandler}
                     updateConnectionHandler={this.updateConnectionHandler}
                />
                </h1> }
            { this.state.index === 1 && <h1>Content 2</h1> }
            { this.state.index === 2 && <h1>Content 3</h1> }
            <SideMenu isOpen={this.state.sideMenuIsOpen} templates={this.state.templates} ></SideMenu>
            <FloatingButton onClick={() => this.toggleSideMenuHandler()}/>
            </div>
    }
}

const StyledApp = withStyles(styleSheet)(App);

ReactDOM.render(<MuiThemeProvider key="mtProvider" >
    <StyledApp>{'App'}</StyledApp></MuiThemeProvider>,
    document.querySelector('#app'));
