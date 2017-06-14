import * as React from 'react';
import { connect } from 'react-redux'

import Assets from '../components/Assets';

function mapStateToProps(state) {
    return state.assets;
}

function mapDispatchToProps(dispatch) {
    return {
      dispatch: (action) => {
          dispatch(action);
      },
      onLayoutChange: (layout) => {
          console.log('layout is changed');
          dispatch({type: 'LAYOUT', method: 'update', layout: layout,});
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Assets)
