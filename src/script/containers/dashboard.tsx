import * as React from 'react';
import { connect } from 'react-redux'

import Dashboard from '../components/dashboard';

function mapStateToProps(state) {
  //return {...state.dashboard, currentAsset: state.assets.assets[state.assets.currentAssetIndex]}
  // let a = state.dashboard;
  return {...state.dashboard[state.assets.currentAssetId], currentAsset: state.assets.assets[state.assets.currentAssetIndex]};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: (action) => dispatch(action),

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
                return resp.json(); // or resp.text()
            }).then(json => {
                console.log(`response: ${json.status}, ${JSON.stringify(json)}`);

                dispatch({type: 'buildResultIsOpen', value: true, message: json.code});
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
