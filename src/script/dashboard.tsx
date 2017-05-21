import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';


// 型情報なし
let LiquidFillGauge = require('react-liquid-gauge');
let JsPlumb = require('jsplumb');

export interface Props {
    classes?: any;
    user?: any;
}

export interface IState {
		users?: any;
}

class Dashboard extends React.Component<any, IState> {
        private setupUsers () {
            let users =[{
                id: 1,
                name: 'User-A',
                value: 18,
            }, {
                id: 2,
                name: 'User-B',
                value: 70,
            }, {
                id: 3,
                name: 'User-D',
                value: 50,
            }];
            this.setState({users : users});
        }

        constructor(props) {
            super();
            const {classes, ... other } = props;
            this.state = {
                users: [],
            };
        }

        componentDidMount() {
            this.setupUsers();
        }

        render() {
            let cardLists = [];
            for (let user of this.state.users) {
                cardLists.push(
                    <StyledUserCard user={user} key={user.id}/>
                );
            }
            return <div id="plumbContainer">
                    {cardLists}
                    <Paper key="11" className={"node " + this.props.classes.paper}
                        style={{"position":"absolute"}}>
                        Good world
                    </Paper>
                    </div>;

            /*
            return <div id="plumbContainer">
                    <div className="node" style={{"width":"32px", "height":"32px", "backgroundColor":"#888", "position":"absolute"}}></div>
                    <div className="node"></div>
            </div>
            */
            /*
            return <div>
            <Grid container justify="center" className="cardContainer">
                {cardLists}
                <Grid item xs="12" lg="6">
                    <Paper key="10" className={this.props.classes.paper}>
                        Good world
                    </Paper>
                </Grid>
            </Grid></div>;
            */
        }
}

export class UserCard extends React.Component<Props, undefined> {
    constructor() {
        super();
    }
    render() {
        return <div>
            <Paper className={"node " + this.props.classes.paper}
                        style={{"position":"absolute"}}>
                {this.props.user.name}
                <div style={{"margin":"0 auto", "width":"100px"}}>
                    <LiquidFillGauge value={this.props.user.value} height={100} width={100} waveAnimation={true} />
                </div>
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
        Container: "canvas",
    });

    let nodes = document.querySelectorAll('.node');
    // console.log(JSON.stringify(nodes, null, '   '));
     instance.addEndpoint(nodes, {});
    // instance.addEndpoint(nodes[1], {});
     instance.draggable(nodes);

});

