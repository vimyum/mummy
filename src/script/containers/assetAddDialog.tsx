import * as React from 'react';
import { connect } from 'react-redux';
import AssetAddDialog from '../components/AssetAddDialog';
import * as Uuid from 'uuid/v4';

function mapStateToProps(state) {
  return state.assets;
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: (action) => {
            dispatch(action);
        },

        closeAddAssetDialog: () => {
          dispatch({
            type: 'openAddAssetDialog', value: false,
          });
        },

        addAssetAndCloseHandler: (template) => {
          dispatch({
            type: 'openAddAssetDialog', value: false,
          });

          let asset = {
              id: Uuid(),
              type: template.id,
              view: {x: 0, y: 0, w: 3, h: 2},
              name: template.name + ' New!',
              dispId: "123456",
              img: template.img,
              desc: "describe this device here.",
              locale: {
                  name: 'Japan',
                  lat: 0.0,
                  lng: 0.0,
              },
          };

          dispatch({
            type: 'asset', method: 'add', asset: asset,
          });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetAddDialog);
