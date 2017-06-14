import * as React from 'react';
import { connect } from 'react-redux';
import AddAssetButton from '../components/AddAssetButton';
import { ActionDispatcher } from '../actions/dashboard.tsx';

function mapStateToProps(state) {
  return state.assets;
}

function mapDispatchToProps(dispatch) {
  return {
      addAssetHandler: (newAsset) => dispatch({ //TODO: should be remvoed.
          type: "asset", value: "add", asset: newAsset,
      }),

      openAddAssetDialog: () => {
          dispatch({ type: 'openAddAssetDialog', value: true });
      },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAssetButton)
