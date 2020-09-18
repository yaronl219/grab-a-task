import httpService from './httpService';

export const boardService = {
  add,
  query,
  remove,
  getBoardById,
  updateBoard,
  filter
};


function query(filterBy) {
//   var queryStr = (!filterBy)? '' : `?name=${filterBy.name}&sort=anaAref`
//   return httpService.get(`board${queryStr}`);
return httpService.get('board')
}

function getBoardById(boardId) {
    return httpService.get(`board/${boardId}`)
}
function remove(boardId) {
  return httpService.delete(`review/${boardId}`);
}
async function add(board) {
  const addedBoard = await httpService.post(`board`, board);
  return addedBoard
}

async function updateBoard(board) {
    const boardId = board._id
    return await httpService.put(`board/${boardId}`,board)

}
async function switchGroup(board,card,oldGroupId,targetGroupId,targetIdx) {
    const newBoard = JSON.parse(JSON.stringify(board))
    newBoard.groups = newBoard.groups.map(group => {
        if (group.id === targetGroupId) return [...group.splice(0,targetIdx), card, ...group.splice(targetIdx+1)]
        if (group.id === oldGroupId) return group.filter(currCard => currCard.id !== card.id )
        return group
    })
    return await updateBoard(newBoard)  
}

async function filter(boardId, filterBy) {
  
  const boardToReturn = await getBoardById(boardId)

  if (filterBy.txt){
    boardToReturn.groups = boardToReturn.groups.map(group => {
      const newGroup={...group}
      newGroup.cards =  newGroup.cards.filter(card => {
        return card.title.toLowerCase().includes(filterBy.txt)
      })
      return newGroup
    })
  }

  // as for now, only filters one label OR txt
  if (filterBy.labelId) {

    
        boardToReturn.groups = boardToReturn.groups.map(group => {
          const newGroup={...group}
          newGroup.cards =  newGroup.cards.filter(card => {
            if (card.labels && 
              card.labels.find(label => label.id === filterBy.labelId)){
              return card
            }
        })
      return newGroup
    })
  }

  return boardToReturn
}