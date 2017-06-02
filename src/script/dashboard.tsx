import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Node from './nodeInstance';
import NodeConfig from './nodeDialog'


// 型情報なし
let JsPlumb = require('jsplumb');

class Dashboard extends React.Component<any, any> {
    public jpInstance;
    constructor(props) {
        super();
        const {classes, ... other } = props;
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentWillMount() {
        console.log('componentWillMount is called.');
    }

    componentWillUnmount() {
        console.log("componentWillUnmount is called.");
        this.props.updateConnectionHandler(this.getConnections());
        this.props.refreshFinished();
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
                ConnectionOverlays: [[ "Arrow", {
                    id: "arrow",
                    location: 1,
                    foldback: 1,
                    visible:true,
                    width: 10,
                    length: 10
                }]],
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
            this.props.refreshFuncs.push(this.getConnections);
        });
    }

    public static _internalFunc = () => {
        console.log("this is a static internal func");
    }

    /* 親コンポーネントからもビルド前に呼ばれる*/
    private getConnections = () => {
        let connections = this.jpInstance.getConnections();
        let newConnectionsState = [];
        connections.forEach((con, idx) => {
            console.log("idx:" + idx + ", con:" + con);
            newConnectionsState.push({
                idx: con.id,
                sourceId: con.sourceId,
                targetId: con.targetId,
            });
        });
        return newConnectionsState; 
    }

    private setupJpEndpoint () {
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

    componentDidUpdate() {
        this.setupJpEndpoint()
        this.jpInstance.repaintEverything();
    }

    render() {
        let nodes = [];
        for (let node of this.props.nodes) {
            nodes.push(
                <Node 
                    node={node} 
                    key={node.id} 
                    onClick={(e) => { this.props.openNodeConfigHandler(e)}}
                    onSelect={ (e) => { this.props.setCurrentNodeHandler(e)}}
                />
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
              style={{"height":"600px", "width":"800px", "backgroundImage": "url('./grid.jpg')"}}
            >
            {nodes}
            <NodeConfig 
                open={this.props.nodeConfigIsOpen} 
                node={
                    this.props.nodes.filter((node) => node.id == this.props.currentNode)[0]
                }
                onClose={this.props.closeNodeConfigHandler}
                updateNodeConfig={this.props.updateNodeConfig}
            />
            </div>;
    }
}

const styleSheet = createStyleSheet('Dashboard', (theme) => ({
    paper: {
        textAlign: 'center',
    },
}));

export default withStyles(styleSheet)(Dashboard);
// jsPlumbの{allowLoopback: false}はどこで指定する？
