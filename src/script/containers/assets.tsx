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
          dispatch({type: 'LAYOUT', method: 'update', layout: layout,});
      },
      updateAssetParamHandler: (assetIndex, paramName, paramValue) => {
          dispatch({
              type: 'ASSET_PARAM',
              method: 'update',
              assetIndex: assetIndex,
              name: paramName,
              value: paramValue
          });
      },
      toggleAssetImageParam: (value) => {
          dispatch({
              type: 'ASSET_PARAM_IMG_FIELD',
              value: 'toggle',
          });
      },
      closeAssetImageParam: (value) => {
          dispatch({
              type: 'ASSET_PARAM_IMG_FIELD',
              value: false,
          });
      },
      selectAsset: (assetId) => {
          console.log('current asset is called.' + assetId);
          dispatch({
              type: 'CURRENT_ASSET',
              value: assetId,
          });
      },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Assets)
