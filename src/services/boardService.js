import httpService from './httpService';
import { utils } from './utils'

export const boardService = {
  add,
  query,
  remove,
  getBoardById,
  updateBoard,
  addNewGroup,
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

  // text in card filter
  if (filterBy.txt){
    boardToReturn.groups = boardToReturn.groups.map(group => {
      const newGroup={...group}
      newGroup.cards =  newGroup.cards.filter(card => {
        return card.title.toLowerCase().includes(filterBy.txt)
      })
      return newGroup
    })
  }

  // multiple labels filter
  if (filterBy.labels && filterBy.labels.length) {
    const currLabels = filterBy.labels
        boardToReturn.groups = boardToReturn.groups.map(group => {
          const newGroup={...group}
          newGroup.cards =  newGroup.cards.filter(card => {
            if (card.labels && 
              card.labels.find(label => {
                const searchedLabel = label.id
                // if the searched label equals to the current labels from the label-filter array
                if (searchedLabel === currLabels.find(currLabel => currLabel === searchedLabel)) {
                  return label
                }
              })){
              return card
            }
        })
      return newGroup
    })
  }
  return boardToReturn
}

async function addNewGroup(boardId ,groupTitle){
  
  // here it adds the additional data in the board
  const newBoard = await getBoardById(boardId)
  const groupToPush = {
    id: utils.makeId(),
    title: groupTitle,
    cards: [],
    archivedAt: false,
    style: {}
  }

  newBoard.groups.push(groupToPush)
  const boardToReturn = await updateBoard(newBoard)
  return boardToReturn
  
}
