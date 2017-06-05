import * as React from 'react';
import * as ReactDOM from 'react-dom';

const initialState = {
    tabIndex: 1,
}

export default function dashboard(state = initialState, action) {
  switch(action.type) {
    case 'selectTabIndex':
      return {
        ...state,
        tabIndex: action.index,
       };
    default:
      console.log('default app reducer is called.');
      return state
  }
} 
