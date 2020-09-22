import { act } from 'react-dom/test-utils';
import httpService from './httpService';
import userService from './userService';
import { utils } from './utils'

export const boardService = {
    add,
    query,
    remove,
    getBoardById,
    updateBoard,
    addNewGroup,
    filter,
    archiveGroup,
    archiveAllCards,
    addNewBoard,
    createActivity
};

function createActivity(partialActivity) {
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
                "fullName": user.fullname,
                "imgUrl": user.imgUrl
            }
        }
        if (!partialActivity.card) return activity
        
        activity.card = {
            "id": partialActivity.card.id,
            "title": partialActivity.card.title
        }

        return activity

    }

    function query(filterBy) {
        //   var queryStr = (!filterBy)? '' : `?name=${filterBy.name}&sort=anaAref`
        //   return httpService.get(`board${queryStr}`);
        return httpService.get('board')
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
    async function switchGroup(board, card, oldGroupId, targetGroupId, targetIdx) {
        const newBoard = JSON.parse(JSON.stringify(board))
        newBoard.groups = newBoard.groups.map(group => {
            if (group.id === targetGroupId) return [...group.splice(0, targetIdx), card, ...group.splice(targetIdx + 1)]
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
        return boardToReturn
    }

    async function addNewGroup(boardId, groupTitle) {

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

    async function archiveGroup(groupId, boardId){

        // waiting for server confirmation
        const newBoard = await getBoardById(boardId)
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        newBoard.groups[groupIdx].archivedAt = Date.now()
        // newBoard.groups.splice(groupIdx, 1) // will be added for admin only
        const boardToReturn = await updateBoard(newBoard)
        return boardToReturn
    }

    async function archiveAllCards(groupId, boardId){
        const newBoard = await getBoardById(boardId)
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        const newCards = newBoard.groups[groupIdx].cards.map(card => {
            const newCard = JSON.parse(JSON.stringify(card))
            newCard.archivedAt = Date.now()
            return newCard
        });

        newBoard.groups[groupIdx].cards = newCards
        const boardToReturn = await updateBoard(newBoard)
        return boardToReturn
    }

    async function addNewBoard(boardName, boardColor){
        console.log(boardName);
        console.log(boardColor);
        console.log('Finish backend to push new board');

        const newBoard = {
            _id: utils.makeId(),
            title: boardName,
            isArchived: false,
            createdAt: Date.now,
            createdBy: {
                _id: 'u101',
                fullName: 'Abi Abambi',
                imgUrl: 'http://some-img'
            },
            style: {
                id: utils.makeId(),
                fontClr: '#f9f9f9',
                bgImg: null
            },
            members:[],
            groups:[{
                id: utils.makeId(),
                style: {},
                title: 'Add New List Title',
                archivedAt: false,
                cards: [{
                    id: utils.makeId(),
                    title: 'Add New Card Title',
                    description: "description",
                    archivedAt: false,
                    labels: []
                }]
            }]
        }

        // push new board to board collection and forword user to the new route
    }