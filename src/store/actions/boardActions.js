import { boardService } from "../../services/boardService";

export function loadBoard(boardId) {
  return async dispatch => {
    try {
      const board = await boardService.getBoardById(boardId);
      dispatch({ type: 'SET_BOARD', board });
    } catch (err) {
      console.log('ReviewActions: err in loadReviews', err);
    }
  };
}

export function toggleFullLabels() {
    return dispatch => {
        dispatch({type:'TOGGLE_FULL_LABEL'})
    }
}

export function updateBoard(board) {
    console.log('update board action')
  return async dispatch => {
    try {
      let newBoard = JSON.parse(JSON.stringify(board))
      newBoard = await boardService.updateBoard(newBoard) // updating the DB
      dispatch({ type: 'SET_BOARD', board: newBoard })
    } catch (err) {
      console.log('error updating board', err)
    }
  }
}

export function updateCard(board, newCard) {
  return async dispatch => {
    try {
      let newBoard = JSON.parse(JSON.stringify(board))
      const groupIdx = newBoard.groups.findIndex(group => group.cards.find(card => card.id === newCard.id))
      const cardIdx = newBoard.groups[groupIdx].cards.findIndex(card => card.id === newCard.id)
      newBoard.groups[groupIdx].cards[cardIdx] = newCard
      newBoard = await boardService.updateBoard(newBoard) // updating the DB
      dispatch({ type: 'SET_BOARD', board: newBoard })
    } catch (err) {
      console.log('error updating card', err)
    }
  }
}

export function deleteCard(board, cardId) {
  return async dispatch => {
    try {
      let newBoard = JSON.parse(JSON.stringify(board))
      const groupIdx = newBoard.groups.findIndex(group => group.cards.find(card => card.id === cardId))
      const cardIdx = newBoard.groups[groupIdx].cards.findIndex(card => card.id === cardId)
      newBoard.groups[groupIdx].cards.splice(cardIdx, 1)
      newBoard = await boardService.updateBoard(newBoard) // updating the DB
      dispatch({ type: 'SET_BOARD', board: newBoard })
    } catch (err) {
      console.log('error deleting card', err)
    }
  }
}

export function updateGroup(board, newGroup) {
  return async dispatch => {
    try {
      let newBoard = JSON.parse(JSON.stringify(board))
      const groupIdx = newBoard.groups.findIndex(group => group.id === newGroup.id)
      newBoard.groups[groupIdx] = newGroup;
      newBoard = await boardService.updateBoard(newBoard) // updating the DB
      dispatch({ type: 'SET_BOARD', board: newBoard })
    } catch (err) {
      console.log('error updating group', err)
    }
  }
}

export function onSetFilterBy(board, filterBy) {
  return async dispatch => {
    const filteredBoard = await boardService.filter(board._id, filterBy)
    dispatch({ type: 'FILTER_BY', filterBy })
    dispatch({ type: 'SET_BOARD', board: filteredBoard })
  }
}

export function onAddNewGroup(board, groupTitle){
  return async dispatch => {
    // as for now it first brings the current board from the db
    const newBoard = await boardService.addNewGroup(board._id, groupTitle)
    dispatch({ type: 'SET_BOARD', board: newBoard })
  }
}

export function updatePosition(newBoard){
  return async dispatch=>{
    dispatch({ type: 'SET_BOARD', board: newBoard })
  }
}

export function switchGroup(){}
