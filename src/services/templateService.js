import httpService from "./httpService"
import { utils } from "./utils";
const { default: userService } = require("./userService")


export const templateService = {
    createTemplateFromBoard,
    createBoardFromTemplate,
    query,
    remove
}

function remove(templateId) {
    return httpService.delete(`template/${templateId}`);
}

async function createBoardFromTemplate(templateId,boardName) {
    const data = {
        templateId,
        user :userService.getLoggedInUser(),
        boardName
    }

    if (!data.boardName) data.boardName = 'New board'
    
    const template = await httpService.post(`template/new/`, data);
    return template
}


async function createTemplateFromBoard(board,templateName,attachments,checklists,labels) {
    
    const data = {
        board,
        templateName,
        attachments,
        checklists,
        labels
    }
    const boardId = await httpService.post(`template`, data);
    return Promise.resolve(boardId)
}




function query(filterBy) {
    //   var queryStr = (!filterBy)? '' : `?name=${filterBy.name}&sort=anaAref`
    //   return httpService.get(`board${queryStr}`);
    const params = (!filterBy) ? '' : utils.createQueryString(filterBy)
    console.log(params)
    return httpService.get(`template${params}`)
}

// function createTemplate(type, boardName) {
//     const board = {
//         // _id: utils.makeId(),
//         title: boardName,
//         isArchived: false,
//         createdAt: Date.now,
//         createdBy: userService.getLoggedInUser(),
//         style: {
//             id: utils.makeId(),
//             fontClr: '#f9f9f9',
//             bgImg: null
//         },
//         members: [],
//         groups: []
//     }
// }

