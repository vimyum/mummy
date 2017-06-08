import * as React from 'react';
import { connect } from 'react-redux';
import FloatingButton from '../components/floatingButton';
import { ActionDispatcher } from '../actions/dashboard.tsx';

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

      buildFlow: () => {
          // コネクション情報を更新
          dispatch({type: "needConnectionUpdate", value: true});
      },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FloatingButton)
