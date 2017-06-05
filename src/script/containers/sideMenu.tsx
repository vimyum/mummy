import * as React from 'react';
import { connect } from 'react-redux';
import SideMenu from '../components/sideMenu';

function mapStateToProps(state) {
  return state.app;
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
