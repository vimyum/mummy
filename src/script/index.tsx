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
import LightbulbOutline from 'material-ui-icons/LightbulbOutline';
import { lightGreen } from 'material-ui/styles/colors';

import TextField from 'material-ui/TextField';
import NodeTemplates from './nodeTemplates';

injectTapEventPlugin();

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
		// backgroundColor: theme.palette.primary[500],
		backgroundColor: lightGreen[700],
		color: theme.palette.getContrastText(theme.palette.primary[500]),
	},
}));

class App extends React.Component<any, IState> {
    private refreshFuncs = [];
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
                name: "I2C-LED(PL9823)", 
                type: "pl9823",
                icon: "icon",
                iconElement: <LightbulbOutline />,
            },
            {
                name: "LED", 
                type: "led",
                icon: "icon",
                iconElement: <LightbulbOutline />,
            },
            {
                name: "IR-Detect", 
                type: "hcsr501",
                icon: "icon",
                iconElement: <LightbulbOutline />,
            },
            {
                name: "Sche", 
                type: "sleep",
                iconElement: <InboxIcon />,
            },
            ],
            nodeConfigIsOpen: false,
            currentNode: 0,
            currentAsset: 0,
            needRefresh: false,
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
    private buildFlow = () => {
        // jsPlumbによって描画されたコネクトを消して
       
        // assetによって叩くAPIを変える :TBD
        let build = {
            url: "http://localhost:3001/api/v1/espr/generate",
            body: JSON.stringify({
                wifi: {
                    ssid: "SSID",  // TBD: エディタから入力可能にする
                    pass: "PASS",  // TBD: エディタから入力可能にする
                },
                connections: this.refreshFuncs[0](),
                nodes: this.state.nodes,
            }),
        };

        // 送信
        return fetch(build.url,{
                      method: 'post',
                      mode: 'cors',
                      headers: {
                          'content-type': 'application/json'
                      },
                      body: build.body,
        }).then(resp => {
            console.log(`response: ${resp}`);
           
            // 応答をstateに登録
       
            // 応答ダイアログをopen

        });
    }

    private handleTabChange = (event, index) => {
        this.setState({ index });
        console.log(`handleTabChange is called. ${index}`);
    }

    private toggleSideMenuHandler = () => {
        console.log("openSideMenuHandler is called");
        this.setState({sideMenuIsOpen: !this.state.sideMenuIsOpen});
    }

    // jsPlumbにより描写されたコネクタを削除するためノード削除時は
    // Dashboardコンポーネントを一度アンマウントし、再度マウントする
    private refreshFinished = () => {
        this.setState({needRefresh: false});
    }

    private removeCurrentNodeHandler = () => {
        console.log("removeCurrentNodeHandler is called");
        let cons = this.state.connections;
        this.setState({
            nodes: this.state.nodes.filter((node) => (node.id != this.state.currentNode)),
            connections: this.state.connections.filter((con) => {
                console.log(`currentNode:${this.state.currentNode}, sourceId:${con.sourceId}, targetId:${con.targetId}`);
                return (con.sourceId != this.state.currentNode) && (con.targetId != this.state.currentNode);
            }),
            needRefresh: true,
        });
    }

    private addNodeHandler = (nodeInfo) => {
        let newNodeId = this.state.nodeMaxId + 1;
        let template = NodeTemplates.get(nodeInfo.type);

        this.setState({nodes : [...this.state.nodes, {
            id: this.state.nodeMaxId,
            type: nodeInfo.type,
            top: nodeInfo.top + "px",
            left: nodeInfo.left + "px",
            conf: JSON.parse(JSON.stringify(template.config)), //なんちゃってDeepCopy
        }]});
        this.setState({nodeMaxId: newNodeId});
    }

    private updateNodeConfig = (configItem) => {
        console.log('updateNodeConfig is called with ' + JSON.stringify(configItem));
        let node = this.state.nodes.filter((node) => node.id == this.state.currentNode)[0];
        node.conf.filter((item) => item.name == configItem.name)[0] = configItem;
        this.setState({ nodes : this.state.nodes });
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

    private toggleNodeConfigHandler = () => {
        console.log("toggleNodeConfigHandler is called");
        this.setState({nodeConfigIsOpen: !this.state.nodeConfigIsOpen});
    }

    private openNodeConfigHandler = (e) => {
        this.setState({
            nodeConfigIsOpen: true,
        });
    }

    private setCurrentNodeHandler = (e) => {
        let nodeId = e.currentTarget.id;
        this.setState({
            currentNode: nodeId,
        })
    }

    private closeNodeConfigHandler = () => {
        this.setState({nodeConfigIsOpen: false});
    }

    public render() {
        return <div>
            <Tabs className={this.props.classes.appBar} index={this.state.index} onChange={this.handleTabChange}>
            <Tab label="Assets" />
            <Tab label="Flow" />
            <Tab label="Visualize" />
            </Tabs>
            { this.state.index === 0 && this.state.needRefresh === false &&
                <h1>
                <Dashboard ref='dashboard'
                     nodes={this.state.nodes} 
                     connections={this.state.connections}
                     onDrop={(nodeInfo) => {
                        this.addNodeHandler(nodeInfo);
                        this.toggleSideMenuHandler(); }
                     }
                     updateNodePositionHandler={this.updateNodePositionHandler}
                     updateConnectionHandler={this.updateConnectionHandler}
                     nodeConfigIsOpen={this.state.nodeConfigIsOpen}
                     toggleNodeConfigHandler={this.toggleNodeConfigHandler}
                     openNodeConfigHandler={this.openNodeConfigHandler}
                     setCurrentNodeHandler={this.setCurrentNodeHandler}
                     closeNodeConfigHandler={this.closeNodeConfigHandler}
                     currentAsset={this.state.currentAsset}
                     currentNode={this.state.currentNode}
                     updateNodeConfig={this.updateNodeConfig}
                     refreshFinished={this.refreshFinished}
                     refreshFuncs={this.refreshFuncs}
                />
                </h1> }
            { this.state.index === 1 && <h1>Content 2</h1> }
            { this.state.index === 2 && <h1>Content 3</h1> }
            <SideMenu isOpen={this.state.sideMenuIsOpen} templates={this.state.templates} ></SideMenu>
            <FloatingButton 
                onClick={() => this.toggleSideMenuHandler()}
                removeCurrentNode={() => this.removeCurrentNodeHandler()}
                buildFlow={() => this.buildFlow()}
                />
            </div>
    }
}

const StyledApp = withStyles(styleSheet)(App);

ReactDOM.render(<MuiThemeProvider key="mtProvider" theme={theme}>
    <StyledApp>{'App'}</StyledApp></MuiThemeProvider>,
    document.querySelector('#app'));
