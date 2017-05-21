import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';

const styleSheet = createStyleSheet('UndockedDrawer', () => ({
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

  toggleDrawer = (side, open) => {
    const drawerState = {};
    drawerState[side] = open;
    this.setState({ open: drawerState });
  };

  handleLeftOpen = () => this.toggleDrawer('left', true);
  handleLeftClose = () => this.toggleDrawer('left', false);

  private componentDidMount = () => {
      var templates = document.querySelectorAll('.draggable');
      [].forEach.call(templates, function(col) {
          col.addEventListener('dragstart', () => {console.log("drag start")}, false);
          col.addEventListener('dragend', () => {console.log("drag end")}, false);
          col.addEventListener('drop', (e) => {
              console.log('drop is called');
              if (e.stopPropagation) {
                  console.log('stop propagation');
                  e.stopPropagation(); // stops the browser from redirecting.
              }
          }, false);
          // col.addEventListener('dragleave', () => {console.log("drag leave")}, false);
      });
  }

  render() {
      const classes = this.props.classes;

      const mailFolderListItems = (
          <div>

          <ListItem >
          <div className={"draggable"} draggable={true}>
          <ListItemIcon>
          <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          </div>
          </ListItem>

          <ListItem >
          <div className={"draggable"} draggable={true}>
          <ListItemIcon>
          <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Starred" />
          </div>
          </ListItem>

          <ListItem >
          <div className={"draggable"} draggable={true}>
          <ListItemIcon>
          <SendIcon />
          </ListItemIcon>
          </div>
          <ListItemText primary="Send mail" />
          </ListItem>
          <ListItem button>
          <ListItemIcon>
          <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
          </ListItem>
          </div>
      );

      const otherMailFolderListItems = (
          <div>
          <ListItem button>
          <ListItemIcon>
          <MailIcon />
          </ListItemIcon>
          <ListItemText primary="All mail" />
          </ListItem>
          <ListItem button>
          <ListItemIcon>
          <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Trash" />
          </ListItem>
          <ListItem button>
          <ListItemIcon>
          <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Spam" />
          </ListItem>
          </div>
      );

      const sideList = (
          <div>
          <List className={classes.list} disablePadding>
          {mailFolderListItems}
          </List>
          <Divider />
          <List className={classes.list} disablePadding>
          {otherMailFolderListItems}
          </List>
          </div>
      );

      const fullList = (
          <div>
          <List className={classes.listFull} disablePadding>
          {mailFolderListItems}
          </List>
          <Divider />
          <List className={classes.listFull} disablePadding>
          {otherMailFolderListItems}
          </List>
          </div>
      );

      return (
          <div>
          <Drawer
          open={true}
          onRequestClose={this.handleLeftClose}
          >
          {sideList}
          </Drawer>
          </div>
      );
  }
}

/*
   UndockedDrawer.propTypes = {
classes: PropTypes.object.isRequired,
};
 */

export default withStyles(styleSheet)(UndockedDrawer);
