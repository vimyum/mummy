import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import NodeTemplates from './nodeTemplates';
import TextField from 'material-ui/TextField';


class NodeConfig extends React.Component<any, any> {

  handleCancel = () => {
    this.props.onClose();
  };

  handleOk = () => {
    let elem = ReactDOM.findDOMNode(this.refs.dialogContent);
    this.props.onClose();
  };

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
          <Button onClick={this.handleCancel} primary>Cancel</Button>
          <Button onClick={this.handleOk} primary>Ok</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default NodeConfig
