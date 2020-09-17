
const initialState = {
  board: {},
  filterBy: null
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_BOARD':
      return { ...state, board:action.board };

    case 'FILTER_BY':
      return {...state, filterBy: action}

    default:
      return state;
  }
}
