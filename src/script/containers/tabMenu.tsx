import * as React from 'react';
import { connect } from 'react-redux';
import TabMenu from '../components/tabMenu';

function mapStateToProps(state) {
  return state.app;
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick: (ev, index) => { dispatch({
        type: "selectTabIndex",
        index: index,
    }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabMenu)
