import httpService from './httpService';
import userService from './userService';
import { utils } from './utils'

export const boardService = {
    add,
    query,
    remove,
    getBoardById,
    updateBoard,
    filter,
    addNewBoard,
    createActivity,
    archiveBoard,
    getCardTitleById
};

function getCardTitleById(cardId,board) {
    let cardTitle;
     board.groups.forEach(group => group.cards.forEach(card => {
        if (card.id === cardId) {
            cardTitle = card.title
        }
    }))
    return cardTitle
}

function createActivity(partialActivity) {
    // activity = {txt:'your text here'}
    // This fn needs to receive an object with the card id and title and the text in theh following format:
    // send to this fn:
    // txt
    // card id
    // card title
    // comment txt as blank

    const user = userService.getLoggedInUser()

    const activity = {
        "id": utils.makeId(),
        "txt": partialActivity.txt,
        "commentTxt": partialActivity.commentTxt,
        "createdAt": Date.now(),
        "byMember": {
            "_id": user._id,
            "fullName": user.fullName,
            "imgUrl": user.imgUrl
        }
    }
    if (partialActivity.card) {
        activity.card = {
            "id": partialActivity.card.id,
            "title": partialActivity.card.title
        }
    }
    if (!partialActivity.group) {
        activity.group = {...partialActivity.group}
    }

    return activity

}

function addActivity(board,partialActivity) {
    const activity = boardService.createActivity(partialActivity)
    addActivity(board,activity)
}

function query(filterBy) {
    
    const params = (!filterBy) ? '' : utils.createQueryString(filterBy)
    
    return httpService.get(`board${params}`)
}

function getBoardById(boardId) {
    return httpService.get(`board/${boardId}`)
}
function remove(boardId) {
    return httpService.delete(`board/${boardId}`);
}
async function add(board) {
    const addedBoard = await httpService.post(`board`, board);
    return addedBoard
}

async function updateBoard(board) {
    const boardId = board._id
    return await httpService.put(`board/${boardId}`, board)
}


async function archiveBoard(boardId) {
    console.log('archive board service')
    const board = await getBoardById(boardId)
    board.isArchived = true
    await updateBoard(board)
    return Promise.resolve(boardId)
}



async function switchGroup(board, card, oldGroupId, targetGroupId, targetCardIdx) {
    const newBoard = JSON.parse(JSON.stringify(board))
    newBoard.groups = newBoard.groups.map(group => {
        if (group.id === targetGroupId) return [...group.splice(0, targetCardIdx), card, ...group.splice(targetCardIdx + 1)]
        if (group.id === oldGroupId) return group.filter(currCard => currCard.id !== card.id)
        return group
    })
    return await updateBoard(newBoard)
}

async function filter(boardId, filterBy) {

    const boardToReturn = await getBoardById(boardId)
    // text in card filter
    if (filterBy.txt) {
        boardToReturn.groups = boardToReturn.groups.map(group => {
            const newGroup = { ...group }
            newGroup.cards = newGroup.cards.filter(card => {
                return card.title.toLowerCase().includes(filterBy.txt)
            })
            return newGroup
        })
    }

    // multiple labels filter
    if (filterBy.labels && filterBy.labels.length) {
        const currLabels = filterBy.labels
        boardToReturn.groups = boardToReturn.groups.map(group => {
            const newGroup = { ...group }
            newGroup.cards = newGroup.cards.filter(card => {
                if (card.labels &&
                    card.labels.find(label => {
                        const searchedLabel = label.id
                        // if the searched label equals to the current labels from the label-filter array
                        if (searchedLabel === currLabels.find(currLabel => currLabel === searchedLabel)) {
                            return label
                        }
                    })) {
                    return card
                }
            })
            return newGroup
        })
    }

    return boardToReturn;

}


    async function addNewBoard(boardName, boardColor, currUser){


        const newBoard = {
            title: boardName,
            isArchived: false,
            createdAt: Date.now,
            description: 'Board\'s description',
            labels: [{
                    "id": "l101",
                    "name": "Default",
                    "color": "green"
                },
                {
                    "id": "l102",
                    "name": "Default",
                    "color": "yellow"
                },
                {
                    "id": "l103",
                    "name": "Default",
                    "color": "orange"
                },
                {
                    "id": "l104",
                    "name": "Default",
                    "color": "red"
                },
                {
                    "id": "l105",
                    "name": "Default",
                    "color": "purple"
                },
                {
                    "id": "l106",
                    "name": "Default",
                    "color": "blue"
                }
            ],
            activities: [],
            createdBy: { // update from currUser
                _id: 'u101', // update from user
                fullName: 'Abi Abambi',
                imgUrl: 'http://some-img'
            },
            style: {
                // id: utils.makeId(),
                fontClr: '#f9f9f9',
                bgImg: null,
                boardColor
            },
            members: [{ // update from currUser
                _id: 'u101', // update from user
                fullName: 'Abi Abambi',
                imgUrl: 'http://some-img'
            }],
            groups:[{
                id: utils.makeId(),
                title: 'Add New Card Title',
                description: "description",
                archivedAt: false,
                labels: [],
                cards:[]
            }]
        }        

        console.log(newBoard);
        
        const addedBoard = await httpService.post(`board`, newBoard);
        return addedBoard
        // push new board to board collection and forword user to the new route
    }
