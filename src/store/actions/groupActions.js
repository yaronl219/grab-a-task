import { boardService } from "../../services/boardService";

const { cardService } = require("../../services/cardService/cardService");


export function addCard(board, cardTxt, groupId) {
    return async dispatch => {
        try {
          const newBoard = await cardService.addCard(board, cardTxt, groupId)
          dispatch({ type: 'SET_BOARD', board: newBoard });
          boardService.updateBoard(newBoard)
        } catch (err) {
          console.log('ReviewActions: err in addCard', err);
        }
      };
}