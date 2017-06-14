import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import TextField from 'material-ui/TextField';

class AssetConfig extends React.Component<any, any> {

  render() {
      return (
          <Dialog open={this.props.assetConfigIsOpen}>
          <DialogTitle>Asset Configration</DialogTitle>
            <p> this is a dummy </p>
          </DialogContent>
          <DialogActions>
          <Button onClick={()=> {}} primary>Ok</Button>
          </DialogActions>
          </Dialog>
      );
  }
}

export default AssetConfig
