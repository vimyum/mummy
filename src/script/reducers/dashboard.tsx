import * as React from 'react';
import * as ReactDOM from 'react-dom';
import InboxIcon from 'material-ui-icons/Inbox';
import LightbulbOutline from 'material-ui-icons/LightbulbOutline';
import NodeTemplates from '../nodeTemplates';

const initialState = {
	nodeMaxId: 10,
	sideMenuIsOpen: true,
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
	nodeConfigIsOpen: false,
	currentNode: 0,
	currentAsset: 0,
	needRefresh: false,
    isNeedConnectionUpdate: false,
    refreshFuncs: [],
}

export default function dashboard(state = initialState, action) {
  console.log('dashboard reducer is called.');
  switch(action.type) {
    case 'addNewNode':
        let newNodeId = state.nodeMaxId + 1;
        let template = NodeTemplates.get(action.node.type);
        return {
            ...state,
            nodeMaxId: state.nodeMaxId + 1,
            nodes : [...state.nodes, {
                id: state.nodeMaxId + 1,
                type: action.node.type,
                top: action.node.top + "px",
                left: action.node.left + "px",
                conf: JSON.parse(JSON.stringify(template.config)), 
            }],
       };
    case 'toggleSideMenu':
        return {
            ...state,
            sideMenuIsOpen: !state.sideMenuIsOpen,
        };

    case 'updateNodePosition':
        console.log("updateNodePosition is called.");
        let currentNodes = state.nodes;
        let targetNode = currentNodes.filter(e => {
            return (e.id == action.nodeId);
        })[0];

        console.log(`nodeId:${action.nodeId}, left:${action.left}, top: ${action.top}`);
        
        targetNode.left = `${action.left}px`;
        targetNode.top  = `${action.top}px`;
        return {
            ...state,
            nodes : currentNodes
        };
 
    case 'updateConnections':
        return {
            ...state,
            connections: action.connections,
        };
    case 'selectNode':
        return {
            ...state,
            currentNode: action.nodeId,
        };
    case 'openNodeConfig':
        console.log('openNodeConfig reduce is called.');
        return {
            ...state,
            nodeConfigIsOpen: action.opened,
        };

    case 'updateNodeConfig':
        console.log('updateNodeConfig is called with ' + JSON.stringify(action.config));
        let node = state.nodes.filter((node) => node.id == state.currentNode)[0];
        let nodeAryIdx = state.nodes.indexOf(node);

        let config = node.conf.filter((item, idx) => item.name == action.config.name)[0];
        let configAryIdx = node.conf.indexOf(config);
        let newNodes = JSON.parse(JSON.stringify([ ...state.nodes ]));
        newNodes[nodeAryIdx][configAryIdx] = action.config;
        return {
           ...state,
           nodes : newNodes,
        };

    case 'removeNode':
        console.log("removeNode is called");
        return {
            ...state,
            nodes: state.nodes.filter((node) => (node.id != state.currentNode)),
            connections: state.connections.filter((con) => {
                console.log(`currentNode:${state.currentNode}, sourceId:${con.sourceId}, targetId:${con.targetId}`);
                return (con.sourceId != state.currentNode) && (con.targetId != state.currentNode);
            }),
            needRefresh: true,
        };
    case 'needRefresh':
        return { 
            ...state,
            needRefresh: action.value,
        };
    case 'needConnectionUpdate':
        return {
            ...state,
            isNeedConnectionUpdate: action.value,
        };
    default:
      console.log('default dashboard reducer is called.');
      return state;
  }
} 
