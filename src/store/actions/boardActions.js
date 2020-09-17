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
  

export function updateCard(board,newCard){
    return async dispatch => {
        try {
            console.log('new card',newCard)
            const newBoard = JSON.parse(JSON.stringify(board))
            const groupIdx = newBoard.groups.findIndex(group => group.cards.find(card => card.id === newCard.id))
            const cardIdx = newBoard.groups[groupIdx].cards.findIndex(card => card.id === newCard.id)
            newBoard.groups[groupIdx].cards[cardIdx]=newCard  
            dispatch({type: 'SET_BOARD', board:newBoard})
        } catch (err) {
            console.log('error archiving',err)
        }
    }
}

export function switchGroup(board,card,oldGroupId,targetGroupId,targetIdx=0) {
    return async dispatch => {
      try {
        const newBoard = await boardService.switchGroup(board,card,oldGroupId,targetGroupId,targetIdx)
        dispatch({ type: 'SET_BOARD', board: newBoard });
      } catch (err) {
        console.log('BoardActions: err in switchGroup', err);
      }
    };
  }
  