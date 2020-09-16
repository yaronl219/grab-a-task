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
  