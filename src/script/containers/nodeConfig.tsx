import * as React from 'react';
import { connect } from 'react-redux';
import NodeConfig from '../components/nodeConfig';

function mapStateToProps(state) {
  return state.dashboard;
}

function mapDispatchToProps(dispatch) {
    return {
        closeNodeConfig: () => 
            dispatch({type: 'openNodeConfig', opened: false}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeConfig)
