import * as React from 'react';
import * as ReactDOM from 'react-dom';
import InboxIcon from 'material-ui-icons/Inbox';
import LightbulbOutline from 'material-ui-icons/LightbulbOutline';
import NodeTemplates from '../nodeTemplates';

const initialAsset = {
    nodeMaxId: 10,
    nodes: [],
    connections: [],
    templates: [{
        name: "GPIO Input", //表示用
        type: "gpio_in",   // 識別用
        icon: "icon",
        iconElement: <InboxIcon />,
    },{
        name: "GPIO Out", //表示用
        type: "gpio_out",   // 識別用
        icon: "icon",
        iconElement: <InboxIcon />,
    },
    ],
    currentNode: 0,

    nodeConfigIsOpen: false,
    sideMenuIsOpen: false,
    needRefresh: false,
    isNeedConnectionUpdate: false,
    refreshFuncs: [],
    buildResultIsOpen: false,
    buildResultMessage: 'unknown',
};

const initialState = {
    '0000-0000': initialAsset,
    needRefresh: false,
};

// let initAssetState = initialState.assets['0000-0000'];

export default function dashboard(state = initialState, action) {

  let assetId = action.currentAsset ? action.currentAsset.id : '0000-0000';
  let asset = (state[assetId]) ? state[assetId] : initialAsset;

  switch(action.type) {
    case 'addNewNode':
        let newNodeId = asset.nodeMaxId + 1;
        let template = NodeTemplates.get(action.node.type);

        return {
            ...state,
            [assetId] : {
                ...asset,
                nodeMaxId: asset.nodeMaxId + 1,
                nodes : [...asset.nodes, {
                    id: asset.nodeMaxId + 1,
                    type: action.node.type,
                    top: action.node.top + "px",
                    left: action.node.left + "px",
                    conf: JSON.parse(JSON.stringify(template.config)), 
                }],
            }
       };

    case 'toggleSideMenu':
        return {
            ...state,
            [assetId] : {
                ...asset,
                sideMenuIsOpen: !asset.sideMenuIsOpen,
            }
        };

    case 'updateNodePosition':
        console.log("updateNodePosition is called.");
        let currentNodes = asset.nodes;
        let targetNode = currentNodes.filter(e => {
            return (e.id == action.nodeId);
        })[0];

        console.log(`nodeId:${action.nodeId}, left:${action.left}, top: ${action.top}`);
        
        targetNode.left = `${action.left}px`;
        targetNode.top  = `${action.top}px`;
        return {
            ...state,
            [assetId] : {
                ...asset,
                nodes : currentNodes,
            },
        };
 
    case 'updateConnections':
        return {
            ...state,
            [assetId] : {
                ...asset,
                connections: action.connections,
            },
        };
    case 'selectNode':
        return {
            ...state,
            [assetId] : {
                ...asset,
                currentNode: action.nodeId,
            }
        };
    case 'openNodeConfig':
        console.log('openNodeConfig reduce is called.');
        return {
            ...state,
            [assetId] : {
                ...asset,
                nodeConfigIsOpen: action.opened,
            }
        };

    case 'updateNodeConfig':
        console.log('updateNodeConfig is called with ' + JSON.stringify(action.config));
        let node = asset.nodes.filter((node) => node.id == asset.currentNode)[0];
        let nodeAryIdx = asset.nodes.indexOf(node);

        let config = node.conf.filter((item, idx) => item.name == action.config.name)[0];
        let configAryIdx = node.conf.indexOf(config);
        let newNodes = JSON.parse(JSON.stringify([ ...asset.nodes ]));
        newNodes[nodeAryIdx][configAryIdx] = action.config;
        return {
           ...state,
            [assetId] : {
                ...asset,
                nodes : newNodes,
            },
        };

    case 'removeNode':
        console.log("removeNode is called");
        return {
            ...state,
            needRefresh: true,
            [assetId] : {
                ...asset,
                nodes: asset.nodes.filter((node) => (node.id != asset.currentNode)),
                    connections: asset.connections.filter((con) => {
                    console.log(`currentNode:${asset.currentNode}, sourceId:${con.sourceId}, targetId:${con.targetId}`);
                    return (con.sourceId != asset.currentNode) && (con.targetId != asset.currentNode);
                }),
            },
        };
    case 'needRefresh':
        return { 
            ...state,
            needRefresh: action.value,
        };
    case 'needConnectionUpdate':
        return {
            ...state,
            [assetId] : {
                ...asset,
                isNeedConnectionUpdate: action.value,
            },
        };
    case 'buildResultIsOpen':
        return {
            ...state,
            [assetId] : {
                ...asset,
                buildResultIsOpen: action.value,
                buildResultMessage: action.message,
            },
        };
    default:
      // console.log('default dashboard reducer is called.');
      return {
        ...state,
        [assetId] : {
            ...asset,
        },
      };
  }
} 

