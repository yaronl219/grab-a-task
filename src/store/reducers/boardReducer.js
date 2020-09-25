
const initialState = {
  board: {},
  filterBy: null,
  style: {},
  fullLabel: false
};

const defaultStyle = {
  backgroundImage: null
}

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_BOARD':
      return { ...state, board:action.board };

    case 'FILTER_BY':
      return {...state, filterBy: action}
      
    case 'TOGGLE_FULL_LABEL':
        if (state.fullLabel) return {...state,fullLabel : false}
        return {...state,fullLabel:true}

    case 'SET_STYLE':
        return{ ...state, style: action.style }

    case 'SET_DEFAULT_STYLE':
        return {
          ...state,
          style: defaultStyle
        }

    default:
      return state;
  }
}
