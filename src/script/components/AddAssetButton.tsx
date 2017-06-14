import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styleSheet = createStyleSheet('AddAssetButton', (theme) => ({
	button: {
		margin: theme.spacing.unit,
	},
    icons: {
        width: "40%",
    },
    floatMenu: {
        position: "fixed",
        right: "5px",
        bottom: "0",
    }
}));

class AddAssetButton extends React.Component<any, any> {
    constructor() {
        super();
        console.log('AddAssetButton: props:' + this.props);
    }

    render() {
        const classes = this.props.classes;
        let dd = this.props.openAddAssetDialog;
        return (
            <div className={classes.floatMenu}>
                <Button fab primary className={classes.button} onClick={this.props.openAddAssetDialog}>
                    <AddIcon className={classes.icons} />
                </Button>
            </div>
        );
    }
}

export default withStyles(styleSheet)(AddAssetButton);
