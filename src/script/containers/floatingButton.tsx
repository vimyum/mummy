import * as React from 'react';
import { connect } from 'react-redux';
import FloatingButton from '../components/floatingButton';

function mapStateToProps(state) {
  return state.dashboard;
}

function mapDispatchToProps(dispatch) {
  return {
      onClick: () => dispatch({
          type: "toggleSideMenu",
      }),
      removeNode: () => dispatch({
          type: "removeNode"
      }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FloatingButton)
