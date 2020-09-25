import { boardService } from "../../services/boardService";


export function loadBoard(boardId) {
  return async dispatch => {
    try {
      const board = await boardService.getBoardById(boardId);
      dispatch({ type: 'SET_BOARD', board });
    } catch (err) {
      console.log('boardAction: error in board action', err);
      throw err;
    }
  };
}


export function addActivity(board, activity) {

  return async dispatch => {
    try {
      let newBoard = JSON.parse(JSON.stringify(board))
      newBoard.activities.unshift(activity)
      dispatch({ type: 'SET_BOARD', board: newBoard })
      await boardService.updateBoard(newBoard) // updating the DB
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


// check that it updates the db
export function updateCard(board, newCard, newActivity) {

  return async dispatch => {
    try {
      // replicate board
      let newBoard = JSON.parse(JSON.stringify(board))
      // find the group idx
      const groupIdx = newBoard.groups.findIndex(group => group.cards.find(card => card.id === newCard.id))
      // find the card idx
      const cardIdx = newBoard.groups[groupIdx].cards.findIndex(card => card.id === newCard.id)
      // replace the card content
      newBoard.groups[groupIdx].cards[cardIdx] = newCard

      // add activity

      if (newActivity) {
        const activity = boardService.createActivity(newActivity)
        newBoard.activities.unshift(activity)
      }


      dispatch({ type: 'SET_BOARD', board: newBoard })
      await boardService.updateBoard(newBoard) // updating the DB
      // newBoard = boardService.updateBoard(newBoard) // updating the DB

    } catch (err) {
      console.log('error updating card', err)
    }
  }
}

export function addLabel(board, newLabel) {
  return async dispatch => {
    try {
      let newBoard = JSON.parse(JSON.stringify(board))
      newLabel.id = makeId()
      if (!newBoard.labels) newBoard.labels = [];
      newBoard.labels.push(newLabel)
      dispatch({ type: 'SET_BOARD', board: newBoard })
      await boardService.updateBoard(newBoard) // updating the DB
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
      dispatch({ type: 'SET_BOARD', board: newBoard })
      await boardService.updateBoard(newBoard) // updating the DB
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
      dispatch({ type: 'SET_BOARD', board: newBoard })
      await boardService.updateBoard(newBoard) // updating the DB
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
      dispatch({ type: 'SET_BOARD', board: newBoard })
      await boardService.updateBoard(newBoard) // updating the DB
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
      dispatch({ type: 'SET_BOARD', board: newBoard })
      await boardService.updateBoard(newBoard) // updating the DB
    } catch (err) {
      console.log('error updating group', err)
    }
  }
}

// // backup to filter
export function onSetFilterBy(board, filterBy) {
  return async dispatch => {
    try {
      const filteredBoard = await boardService.filter(board._id, filterBy)
      dispatch({ type: 'FILTER_BY', filterBy })
      dispatch({ type: 'SET_BOARD', board: filteredBoard })
    } catch (err) {
      console.log('error setting filter group', err)
    }
  }
}

export function onAddNewGroup(board, groupTitle) {
  return async dispatch => {
    try {
      let newBoard = JSON.parse(JSON.stringify(board))
      const groupToPush = {
        id: makeId(),
        title: groupTitle,
        cards: [],
        archivedAt: false,
        style: {}
      }
      newBoard.groups.push(groupToPush)
      dispatch({ type: 'SET_BOARD', board: newBoard })
      await boardService.updateBoard(newBoard)
    } catch (err) {
      console.log('error adding new group', err)
    }
  }
}

export function updatePosition(newBoardPositioning) {
  return async dispatch => {
    try {
      dispatch({ type: 'SET_BOARD', board: newBoardPositioning })
      let newBoard = JSON.parse(JSON.stringify(newBoardPositioning))
      await boardService.updateBoard(newBoard) // updating the DB
    } catch (err) {
      console.log('error updating board', err)
    }
  }
}

export function updateBoard(board) {
  return async dispatch => {
    try {
      let newBoard = JSON.parse(JSON.stringify(board))
      dispatch({ type: 'SET_BOARD', board: newBoard })
      await boardService.updateBoard(newBoard) // updating the DB
    } catch (err) {
      console.log('error updating board', err)
    }
  }
}

export function setStyle(style) {
  return async dispatch => {
    dispatch({ type: 'SET_STYLE', style })
  }
}

export function onArchiveGroup(groupId, board) {
  return async dispatch => {
    try {
      let newBoard = JSON.parse(JSON.stringify(board))
      const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
      newBoard.groups[groupIdx].archivedAt = Date.now()
      dispatch({ type: 'SET_BOARD', board: newBoard })
      await boardService.updateBoard(newBoard) // updating the DB
    } catch (err) {
      console.log('error archiving group', err)
    }
  }
}

export function onArchiveAllCards(groupId, board) {
  return async dispatch => {
    try {
      let newBoard = JSON.parse(JSON.stringify(board))
      const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
      const newCards = newBoard.groups[groupIdx].cards.map(card => {
        const newCard = JSON.parse(JSON.stringify(card))
        newCard.archivedAt = Date.now()
        return newCard
      });
      newBoard.groups[groupIdx].cards = newCards
      dispatch({ type: 'SET_BOARD', board: newBoard })
      await boardService.updateBoard(newBoard) // updating the DB
    } catch (err) {
      console.log('error archiving cards', err)
    }
  }
}

export function setNewGroupName(groupId, groupName, board) {
  return async dispatch => {
    try {
      const groupIdx = board.groups.findIndex(group => group.id === groupId)
      if (groupName === board.groups[groupIdx].title || !groupName.trim()) return
      let newBoard = JSON.parse(JSON.stringify(board))
      const newGroupName = groupName.replace(/\s+/g, " ")
      newBoard.groups[groupIdx].title = newGroupName.trim()
      dispatch({
        type: 'SET_BOARD',
        board: newBoard
      })
      await boardService.updateBoard(newBoard)
    } catch (err) {
      console.log('error setting group name', err)
    }
  }
}

// finish
export function addNewBoard(boardName, boardColor = null) {
  return async dispatch => {
    const newBoard = await boardService.addNewBoard(boardName, boardColor)

  }
}

// finish
export function addToMembers({ _id, fullName, imgUrl }, board) {
  return async dispatch => {
    const userToPush = {
      _id,
      fullName,
      imgUrl
    }

    let newBoard = JSON.parse(JSON.stringify(board))
    newBoard.members.unshift(userToPush)
    dispatch({ type: 'SET_BOARD', board: newBoard })
    await boardService.updateBoard(newBoard) // updating the DB

    // update the backend as well after the dispatch

  }
}

// finish
export function removeMember(id, board) {
  return async dispatch => {

    let newBoard = JSON.parse(JSON.stringify(board))
    const memberIdx = newBoard.members.findIndex(member => member._id === id)
    newBoard.members.splice(memberIdx, 1)
    dispatch({ type: 'SET_BOARD', board: newBoard })
    await boardService.updateBoard(newBoard) // updating the DB

    // update the backend as well after the dispatch

  }
}

export function switchGroup() { }

// =============================================

function makeId(length = 8) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

