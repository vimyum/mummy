import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { lightGreen } from 'material-ui/styles/colors';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';


const styleSheet = createStyleSheet('App', (theme) => ({
	appBar: {
		backgroundColor: lightGreen[700],
		color: theme.palette.getContrastText(theme.palette.primary[500]),
	},
}));

class AssetAddDialog extends React.Component<any, any> {
  render() {
      let assetTemplatesDom = [];
      this.props.assetTemplates.forEach((asset) => {
          assetTemplatesDom.push(
              <Grid item xs={8} sm={6} md={4} lg={3} key={asset.id} >
                     <Paper className="paper-item" 
                         onDoubleClick={() => this.props.addAssetAndCloseHandler(asset)}
                         style={{height: "220px", padding: "20px 10px 20px 10px"}}>
                        <Typography type="headline" component="h3">
                        {asset.name}
                        </Typography>
                        <div style={{
                            width: "100%", height: "150px", 
                            backgroundImage: asset.img,
                            backgroundRepeat: "no-repeat", backgroundSize: "contain"}} />
                        <Typography type="body1" component="p">
                        {asset.desc}
                        </Typography>
                     </Paper>
                </Grid>
          );
      });

      return (
          <div>
          <Dialog fullScreen open={this.props.assetAddDialogIsOpen}>
            <AppBar>
                <Toolbar>
                 <IconButton onClick={this.props.closeAddAssetDialog} aria-label="Close">
                    <CloseIcon />
                 </IconButton>
                <Typography type="title" colorInherit>Select an Asset to Add.</Typography>
                </Toolbar>
            </AppBar>
            <div>
            <Grid container justify="center" style={{paddingTop:"5em", width:"80%", margin: "0 auto"}}>
            {assetTemplatesDom}
            </Grid>
            </div>
          </Dialog>
          </div>
      );
  }
}

export default AssetAddDialog;
// export default withStyles(styleSheet)(AssetAddDialog); // TODO エラーになる

