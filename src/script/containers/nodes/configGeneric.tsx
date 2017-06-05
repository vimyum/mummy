import * as React from 'react';
import { connect } from 'react-redux';
import ConfigGeneric from '../../components/nodes/configGeneric';

function mapStateToProps(state) {
  return state.app;
}

function mapDispatchToProps(dispatch) {
    return {
        updateNodeConfig: (nodeConfig) =>
            dispatch({ type: 'updateNodeConfig', config: nodeConfig}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigGeneric)
