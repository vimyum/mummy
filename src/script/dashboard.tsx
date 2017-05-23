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

export interface Props {
    classes?: any;
    user?: any;
}

export interface IState {
		users?: any;
}

class Dashboard extends React.Component<any, IState> {
    constructor(props) {
        super();
        const {classes, ... other } = props;
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        JsPlumb.jsPlumb.ready(function() {
            console.log('jsPlumb is called.');
            const instance = JsPlumb.jsPlumb.getInstance({
                // notice the 'curviness' argument to this Bezier curve.  the curves on this page are far smoother
                // than the curves on the first demo, which use the default curviness value.
                Connector: [ "Bezier", { curviness: 50 } ],
                DragOptions: { cursor: "pointer", zIndex: 2000 },
                // PaintStyle: { stroke: color, strokeWidth: 2 },
                EndpointStyle: { radius: 3, fill: 'gray' },
                HoverPaintStyle: {stroke: "#ec9f2e" },
                EndpointHoverStyle: {fill: "#ec9f2e" },
                Container: "plumbContainer",
            });

            let nodes = document.querySelectorAll('.node');

            // AnchorTypeがsource or bothにのみendpointを追加
            instance.addEndpoint(Array.from(nodes).filter((element, index) => {
                    let anchorType = (element as HTMLElement).dataset['anchor'];
                    return anchorType === 'source' || anchorType === 'both';
                }), {
                isSource: true,
                anchor: "Right",
            });

            // AnchorTypeがsource or bothにのみendpointを追加
            instance.addEndpoint(Array.from(nodes).filter((element, index) => {
                    let anchorType = (element as HTMLElement).dataset['anchor'];
                    return anchorType === 'target' || anchorType === 'both';
                }), {
                isSource: true,
                anchor: "Left",
            });

            instance.draggable(nodes);
        });

    }

    render() {
        let cardLists = [];
        for (let node of this.props.nodes) {
            cardLists.push(
                <StyledUserCard user={node} key={node.id}/>
            );
        }
        return <div id="plumbContainer" 
              onDrop={(ev) => {
                  console.log('clientX: ' + ev.clientX);
                  console.log('clientY: ' + ev.clientY);
                  console.log("onDrop is called.")

                  let data = ev.dataTransfer.getData('text');
                  console.log(data);

                  this.props.onDrop({
                      name: "gpio",
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

export class UserCard extends React.Component<Props, undefined> { //Propsをuserからnodeに
    constructor() {
        super();
    }
    render() {
        return <div>
            <Paper className={"node " + this.props.classes.paper}
            data-anchor={this.props.user.anchor}
            style={{"position":"absolute", "top": this.props.user.top, "left": this.props.user.left}}>
            <InputIcon />
            </Paper>
            </div>;
           // {this.props.user.name}
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
