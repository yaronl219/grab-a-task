
const initialState = {
  board: {},
  filterBy: null,
  fullLabel: false
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_BOARD':
      return { ...state, board:action.board };

    case 'FILTER_BY':
      return {...state, filterBy: action}
    case 'TOGGLE_FULL_LABEL':
        if (state.fullLabel) return {...state,fullLabel : false}
        return {...state,fullLabel:true}
    default:
      return state;
  }
}
