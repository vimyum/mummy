import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import NodeTemplates from '../nodeTemplates';
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
      console.log('nodeCOnfig props: ' + this.props);
      let tempNode = this.props.nodes;
      if (!this.props.nodeConfigIsOpen) {
          return null;
      }

      let node = this.props.nodes.filter((node) => node.id == this.props.currentNode)[0];
      let template = NodeTemplates.get(node.type);

      return (
          <Dialog open={true}>
          <DialogTitle>Node Configration</DialogTitle>
          <DialogContent ref="dialogContent">
          {template.configElement(node, this.props.updateNodeConfig)}
          </DialogContent>
          <DialogActions>
          <Button onClick={this.handleCancel} primary>Cancel</Button>
          <Button onClick={this.props.closeNodeConfig} primary>Ok</Button>
          </DialogActions>
          </Dialog>
      );
  }
}

export default NodeConfig
