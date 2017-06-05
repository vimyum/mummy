import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';

import NodeTemplates from '../nodeTemplates';

const styleSheet = createStyleSheet('UndockedDrawer', () => ({
  drawer: {
      height: 'calc(100% - 64px)',
      top: '48px',
  },
  list: {
    width: 250,
    flex: 'initial',
  },
  listFull: {
    width: 'auto',
    flex: 'initial',
  },
}));

class UndockedDrawer extends React.Component<any, any> {
    state = {
        open: {
            top: false,
            left: false,
            bottom: false,
            right: false,
        },
    };

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
    }


    toggleDrawer = (side, open) => {
        const drawerState = {};
        drawerState[side] = open;
        this.setState({ open: drawerState });
    };

    handleLeftOpen = () => this.toggleDrawer('left', true);
    handleLeftClose = () => this.toggleDrawer('left', false);

    handleDragStart = (ev) => {
        console.log("drag start");
        ev.dataTransfer.dropEffect = "move";
        console.log("ev.target: " + ev.target);

        let data = {
            type: ev.target.getAttribute('data-node-type'),
        }
        ev.dataTransfer.setData('text', JSON.stringify(data)); 
    }

    private handleDragEnd = () => {
        console.log("drag end");
        // this.props.onDrop();
    }

    private handleDrop = (ev) => {
        console.log('drop is called.');
        if (ev.stopPropagation) {
            console.log('stop propagation');
            ev.stopPropagation(); // stops the browser from redirecting.
        }
    }

    componentDidMount = () => {
        console.log("componentDidMount is called (in Drawer)");
        // var templates = ReactDOM.findDOMNode(this.refs["template"]);
        let templates = document.querySelectorAll('.draggable');

        console.log("start..");
        [].forEach.call(templates, (col) => {
            col.addEventListener('dragstart', this.handleDragStart, false);
            col.addEventListener('drop', this.handleDrop, false);
            col.addEventListener('dragend', this.handleDragEnd, false);
        });
        console.log("end..");
    }

    render() {
        const classes = this.props.classes;

        let templateList = [];
        for (let template of this.props.templates) {
            let templateInfo = NodeTemplates.get(template.type)
            templateList.push(
                <div className={"draggable"} ref="template" draggable={true}
                    data-node-type={template.type} key={template.type} >
                <ListItem >
                    <ListItemIcon>
                        {templateInfo.iconElement}
                    </ListItemIcon>
                    <ListItemText primary={templateInfo.disp} />
                </ListItem>
                </div>
            );
        }
    
        const sideList = (
            <div>
            <List className={classes.list} disablePadding>
                {templateList}
            </List>
            <Divider />
            </div>
        );

        console.log('---- is Open ---');
        console.log('-->' + this.props.isOpen);

        return (
            <div>
            <h1>this is a drawer</h1>
            <Drawer
                paperClassName={classes.drawer}
                docked={true}
                open={this.props.isOpen}
                onRequestClose={this.handleLeftClose}
            >
                {sideList}
            </Drawer>
            </div>
        );
    }
}

export default withStyles(styleSheet)(UndockedDrawer);
