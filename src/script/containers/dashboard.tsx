import * as React from 'react';
import { connect } from 'react-redux'

import Dashboard from '../components/dashboard';

function mapStateToProps(state) {
    return state.dashboard;
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick: () => { },

    refreshFinished: () => dispatch({type: "needRefresh", value: false }),

    onDrop: (node) => {
        console.log('container onDrop is called.');
        dispatch({type: "addNewNode", node: node});
    },

    updateConnections: (connections) => {
        dispatch({type: 'updateConnections', connections: connections});
    },

    updateNodePosition: ({nodeId, top, left}) => {
        dispatch({type: 'updateNodePosition', nodeId: nodeId, top: top, left: left});
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
