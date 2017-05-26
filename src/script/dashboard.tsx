import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';

import Icon from 'material-ui/Icon';
import InboxIcon from 'material-ui-icons/Inbox';
import InputIcon from 'material-ui-icons/Input';

// 型情報なし
let JsPlumb = require('jsplumb');

import NodeTemplates from './nodeTemplates';

export interface Props {
    classes?: any;
    node?: any;
}

export interface IState {
		users?: any;
}

class Dashboard extends React.Component<any, IState> {
    public jpInstance;
    constructor(props) {
        super();
        const {classes, ... other } = props;
        this.state = {
            users: [],
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentWillMount() {
        // JsPlumbの初期化
        console.log('componentWillMount is called.');
        console.log('this.jpInstance:' + this.jpInstance);
        console.log('NodeTemplates: ' + NodeTemplates);
    }

    componentWillUnmount() {
        console.log("componentWillUnmount is called.");
        let connections = this.jpInstance.getConnections();
        let newConnectionsState = [];
        connections.forEach((con, idx) => {
            console.log("idx:" + idx + ", con:" + con);
            // debugger;
            newConnectionsState.push({
                idx: con.id,
                sourceId: con.sourceId,
                targetId: con.targetId,
            });
        });
        this.props.updateConnectionHandler(newConnectionsState);
    }

    componentDidMount() {
        JsPlumb.jsPlumb.ready(() => { // すぐには実行されない(componentDidMountよりも後)
            console.log('jsPlumb is called.');
            this.jpInstance = JsPlumb.jsPlumb.getInstance({
                Connector: [ "Bezier", { curviness: 50 } ],
                DragOptions: { cursor: "pointer", zIndex: 2000 },
                EndpointStyle: { radius: 3, fill: 'gray' },
                HoverPaintStyle: {stroke: "#ec9f2e" },
                EndpointHoverStyle: {fill: "#ec9f2e" },
                Container: "plumbContainer",
                ConnectionOverlays: [[ "Arrow", {id: "arrow", location: 1, foldback: 1, visible:true, width: 10, length: 10}]],
            });

            this.setupJpEndpoint();
            this.props.connections.forEach(con => {
                    this.jpInstance.connect({
                        source: con.sourceId,
                        target: con.targetId,
                        anchor: ["Left", "Right"],
                    });
            })
            // debugger;
        });
    }

    setupJpEndpoint () {
        let nodes = document.querySelectorAll('.node');

        // AnchorTypeがsource or bothにのみendpointを追加
        this.jpInstance.addEndpoint(Array.from(nodes).filter((element, index) => {
            let anchorType = (element as HTMLElement).dataset['anchor'];
            return anchorType === 'source' || anchorType === 'both';
        }), {
            isSource: true,
            anchor: "Right",
        });

        // AnchorTypeがsource or bothにのみendpointを追加
        this.jpInstance.addEndpoint(Array.from(nodes).filter((element, index) => {
            let anchorType = (element as HTMLElement).dataset['anchor'];
            return anchorType === 'target' || anchorType === 'both';
        }), {
            isTarget: true,
            anchor: "Left",
        });

        this.jpInstance.draggable(nodes, {

            // Options are described here:( https://github.com/jsplumb/katavorio/wiki )
            start: () => {
                console.log('Katavoria Drag-Start is fired.');
            },
            stop: (params) => {
                console.log('Katavoria Drag-Stop is fired.');
                console.log("ID is :" + params.el.id);
                this.props.updateNodePositionHandler({
                    nodeId: params.el.id,
                    top: params.pos[1],
                    left: params.pos[0],
                });
            },
            grid:[150,150], // 効いていない
        });
    }

    setupJpConnection() {
        // TBD: stateからconnectionを実装
    }

    componentDidUpdate() {
        this.setupJpEndpoint()
        this.jpInstance.repaintEverything();
    }

    render() {
        let cardLists = [];
        for (let node of this.props.nodes) {
            cardLists.push(
                <StyledUserCard node={node} key={node.id}/>
            );
        }
        return <div id="plumbContainer" 
              onDrop={(ev) => {
                  console.log("onDrop is called.")
                  let data = JSON.parse(ev.dataTransfer.getData('text'));
                  this.props.onDrop({
                      type: data.type,
                      left: ev.clientX,
                      top: ev.clientY,
                  });
              }} 
              onDragOver={(ev) => {
                  ev.preventDefault();
              }}
              style={{"height":"600px", "width":"800px"}}
            >
            {cardLists}
            </div>;
    }
}

export class UserCard extends React.Component<Props, undefined> {
    constructor() {
        super();
    }
    render() {
        let nodeInfo = NodeTemplates.get(this.props.node.type);
        return <div>
            <Paper 
                id={this.props.node.id}
                className={"node " + this.props.classes.paper}
                data-anchor={nodeInfo.anchor}
                style={{"position":"absolute", "top": this.props.node.top, "left": this.props.node.left}}>
            {nodeInfo.iconElement}
            </Paper>
            </div>;
    }
}

const styleSheet = createStyleSheet('Dashboard', (theme) => ({
    paper: {
        padding: 16,
        textAlign: 'center',
    },
}));

let StyledUserCard = withStyles(styleSheet)(UserCard);
export default withStyles(styleSheet)(Dashboard);

// jsPlumbの{allowLoopback: false}はどこで指定する？
