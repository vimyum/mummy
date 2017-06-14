const initialState = {
    tabIndex: 0,
}

export default function dashboard(state = initialState, action) {
  switch(action.type) {
    case 'selectTabIndex':
      return {
        ...state,
        tabIndex: action.index,
       };
    default:
      // console.log('default app reducer is called.');
      return state
  }
} 
