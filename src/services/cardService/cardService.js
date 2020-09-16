import httpService from '../httpService'
import { utils } from '../utils'
import EditIcon from '@material-ui/icons/Edit';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SubjectIcon from '@material-ui/icons/Subject';

export const cardService = {
    addCard
}

function addCard(board, cardTxt, groupId) {
    const newBoard = JSON.parse(JSON.stringify(board))
    const newCard = {
        id: utils.makeId(),
        title: cardTxt,
        description: '',
        archivedAt: null,
members: [],
labels: [],
createdAt: Date.now(),
dueDate:null,
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

    return newBoard
}
