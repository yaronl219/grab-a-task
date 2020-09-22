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

export function addActivity(board, activity) {
  
  return async dispatch => {
    try {
      let newBoard = JSON.parse(JSON.stringify(board))
      
      newBoard.activities.unshift(activity)
      newBoard = await boardService.updateBoard(newBoard) // updating the DB
      dispatch({ type: 'SET_BOARD', board: newBoard })
    } catch (err) {
      console.log('error removing board', err)
    }
  }
}

export function toggleFullLabels() {
  return dispatch => {
    dispatch({ type: 'TOGGLE_FULL_LABEL' })
  }
}


export function updateBoard(board) {
  
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

export function addLabel(board, newLabel) {
  return async dispatch => {
    try {
      let newBoard = JSON.parse(JSON.stringify(board))
      newLabel.id = _makeId()
      newBoard.labels.push(newLabel)
      newBoard = await boardService.updateBoard(newBoard) // updating the DB
      dispatch({ type: 'SET_BOARD', board: newBoard })
    } catch (err) {
      console.log('error adding label', err)
    }
  }
}

export function removeLabel(board, labelId) {
  return async dispatch => {
    try {
      let newBoard = JSON.parse(JSON.stringify(board))
      const labelIdx = newBoard.labels.findIndex(label => label.id === labelId)
      newBoard.labels.splice(labelIdx, 1)
      newBoard = await boardService.updateBoard(newBoard) // updating the DB
      dispatch({ type: 'SET_BOARD', board: newBoard })
    } catch (err) {
      console.log('error removing label', err)
    }
  }
}

export function updateLabel(board, updatedlabel) {
  return async dispatch => {
    try {
      let newBoard = JSON.parse(JSON.stringify(board))
      newBoard.labels = newBoard.labels.map(label => {
        if (label.id === updatedlabel.id) label = updatedlabel
        return label
      })
      newBoard = await boardService.updateBoard(newBoard) // updating the DB
      dispatch({ type: 'SET_BOARD', board: newBoard })
    } catch (err) {
      console.log('error updating label', err)
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

export function onAddNewGroup(board, groupTitle) {
  return async dispatch => {
    // as for now it first brings the current board from the db
    const newBoard = await boardService.addNewGroup(board._id, groupTitle)
    dispatch({ type: 'SET_BOARD', board: newBoard })
  }
}

export function updatePosition(newBoard) {
  return async dispatch => {
    dispatch({ type: 'SET_BOARD', board: newBoard })
  }
}

export function setStyle(style) {
  return async dispatch => {
    dispatch({ type: 'SET_STYLE', style })
  }
}

export function onArchiveGroup(groupId, board){
  return async dispatch=>{
    // waiting for server confirmation prior
    const newBoard = await boardService.archiveGroup(groupId, board._id)
    dispatch({ type: 'SET_BOARD', board: newBoard })
  }
}

export function onArchiveAllCards(groupId, board){
  return async dispatch=>{
    const newBoard = await boardService.archiveAllCards(groupId, board._id)
    dispatch({ type: 'SET_BOARD', board: newBoard })
  }
}

export function addNewBoard(boardName, boardColor = null){
  return async dispatch=>{
    const newBoard = await boardService.addNewBoard(boardName, boardColor)
    
  }
}

export function setNewGroupName(groupId, groupName, board){
  return async dispatch=>{

    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    if (groupName === board.groups[groupIdx].title || !groupName) return
    let newBoard = JSON.parse(JSON.stringify(board))
    newBoard.groups[groupIdx].title = groupName
    dispatch({ type: 'SET_BOARD', board: newBoard })
    await boardService.updateBoard(newBoard)
    
  }
}

export function switchGroup(){}

// =============================================

function _makeId(length = 8) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
