import * as React from 'react';
import { connect } from 'react-redux'
import App from '../components/app'

function mapStateToProps(state) {
  return {
      ...state.app,
      needRefresh: state.dashboard.needRefresh
  };
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
