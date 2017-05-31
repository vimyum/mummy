import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import NodeTemplates from './nodeTemplates';
import TextField from 'material-ui/TextField';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

class NodeConfig extends React.Component<any, any> {

  handleCancel = () => {
    this.props.onClose();
  };

  handleOk = () => {
    let elem = ReactDOM.findDOMNode(this.refs.dialogContent);
    this.props.onClose();
  };

  private removeNode = () => {
      /* TBD */
      /* remove current node */
      /* unset currentNode status */
  }

  render() {
    const {
      onRequestClose, // eslint-disable-line no-unused-vars
      selectedValue, // eslint-disable-line no-unused-vars
      open,
      ...other
    } = this.props;

    if (!open) {
        return null;
    }

    let template = NodeTemplates.get(this.props.node.type);
    console.log("other: " + other);

    return (
      <Dialog open={open}>
        <DialogTitle>Node Configration</DialogTitle>
        <DialogContent ref="dialogContent">
            {template.configElement(this.props.node, this.props.updateNodeConfig)}
        </DialogContent>
        <DialogActions>
            <IconButton onClick={this.removeNode}>
                <DeleteIcon />
            </IconButton>
          <Button onClick={this.handleCancel} primary>Cancel</Button>
          <Button onClick={this.handleOk} primary>Ok</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default NodeConfig
