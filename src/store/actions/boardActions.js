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
  


export function switchGroup(board,card,oldGroupId,targetGroupId,targetIdx=0) {
    return async dispatch => {
      try {
        const newBoard = await boardService.switchGroup(board,card,oldGroupId,targetGroupId,targetIdx)
        dispatch({ type: 'SET_BOARD', board: newBoard });
      } catch (err) {
        console.log('ReviewActions: err in loadReviews', err);
      }
    };
  }
  