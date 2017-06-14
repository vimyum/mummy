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
          let l = layout[0];
          console.log(`layout is changed. x:${l.x}, y:${l.y}`);
          if (l.x == 0 || l.y == 0) {
            return;
          }
          dispatch({type: 'LAYOUT', method: 'update', layout: layout,});
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Assets)
