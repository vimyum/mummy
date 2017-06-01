import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

const styleSheet = createStyleSheet('FloatingActionButtons', (theme) => ({
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

function FloatingActionButtons(props) {
	const classes = props.classes;
	return (
		<div className={classes.floatMenu}>
		<Button fab primary className={classes.button} onClick={() => props.onClick()}>
		    <AddIcon className={classes.icons} />
		</Button>
		<Button component="a" href="http://qiita.com" fab primary className={classes.button}>
            <ModeEditIcon className={classes.icons} />
        </Button>
		<Button component="a" fab primary className={classes.button} onClick={() => props.removeCurrentNode()}>
            <DeleteIcon />
        </Button>
		</div>
	);
}

FloatingActionButtons.prototype.propTypes = {
	classes: PropTypes.object.isRequired,
	openSideMenuHandler: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(FloatingActionButtons);

/*
        <IconButton onClick={() => {
            console.log("remove button is called.");
        }}>
        </IconButton>
*/
