
import { utils } from '../utils'
import { boardService } from '../boardService';

export const cardService = {
    addCard,
    createImage
}


function createImage(imgRef) {
    const attachment = {
        type: 'img',
        id: utils.makeId(),
        src: imgRef,
        title: 'Image',
        createdAt: Date.now()
    }
    return attachment

}

async function addCard(board, cardTxt, groupId) {
    const newBoard = JSON.parse(JSON.stringify(board))
    const newCard = {
        id: utils.makeId(),
        title: cardTxt,
        description: '',
        archivedAt: null,
        members: [],
        labels: [],
        createdAt: Date.now(),
        dueDate: null,
        attachments: null,
        byMember: {
            // add user info here from session storage:
            //                         "byMember": {
            //                             "_id": "u101",
            //                             "username": "Tal",
            //                             "fullname": "Tal Tarablus",
            //                             "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            //                         },
        }
    }
    newBoard.groups.map(group => {
        if (group.id === groupId) {
            group.cards.push(newCard)
            return group
        }
        return group
    })
    await boardService.updateBoard(newBoard)
    return newBoard
}
