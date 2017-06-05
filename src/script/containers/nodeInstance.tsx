import * as React from 'react';
import { connect } from 'react-redux';
import NodeInstance from '../components/nodeInstance';

function mapStateToProps(state) {
  return state.dashboard;
}

function mapDispatchToProps(dispatch) {
    return {
        onNodeSelect: (ev) => {
            dispatch({type: 'selectNode', nodeId: ev.currentTarget.id });
        },
        openNodeConfig: () => {
            dispatch({type: 'openNodeConfig', opened: true});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeInstance)
