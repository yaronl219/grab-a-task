import httpService from './httpService';

export const boardService = {
  add,
  query,
  remove,
  getBoardById
};


function query(filterBy) {
//   var queryStr = (!filterBy)? '' : `?name=${filterBy.name}&sort=anaAref`
//   return httpService.get(`board${queryStr}`);
return httpService.get('board')
}

function getBoardById(boardId) {
    return httpService.get(`board?${boardId}`)
}
function remove(boardId) {
  return httpService.delete(`review/${boardId}`);
}
async function add(board) {
  const addedBoard = await httpService.post(`board`, board);
  return addedBoard
}
