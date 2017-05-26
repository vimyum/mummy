import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import NodeTemplates from './nodeTemplates';

export interface Props {
    classes?: any;
    node?: any;
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
        padding: 12,
        textAlign: 'center',
    },
}));

export default withStyles(styleSheet)(UserCard);
