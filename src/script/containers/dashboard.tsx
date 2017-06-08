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

    needConnectionUpdate: (value) => { //発火用
        dispatch({type: 'needConnectionUpdate', value: value });
    },

    buildFlow: (nodes, connections) => {
        console.log("build flow is called");
        let build = {
            url: "http://localhost:3001/api/v1/espr/generate",
            body: JSON.stringify({
                wifi: {
                    ssid: "SSID",
                    pass: "PASS",
                },
                connections: connections,
                nodes: nodes,
            }),
        };
        debugger;
        // Now loadingをdispatch
        // TBD

        fetch(build.url,{
            method: 'post',
            mode:   'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: build.body,
        }).then(resp => {
            console.log(`response: ${resp}`);

            // 応答ダイアログopenをdispatch
        });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
