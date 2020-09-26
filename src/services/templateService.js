const { MuiPickersUtilsProvider } = require("@material-ui/pickers")
const { default: userService } = require("./userService")
const { utils } = require("./utils")

// function createTemplateFromBoard(board) {
//     return new Promise((resolve,reject) => {
//         const newBoard = JSON.parse(JSON.stringify(board))
//         newBoard.createdAt = null
//         newBoard.boardName = ''
//         newBoard.members = []
//         newBoard.title = newBoard.title += ' (template)'
        


//     })

// }

function createTemplate(type, boardName) {
    const board = {
        // _id: utils.makeId(),
        title: boardName,
        isArchived: false,
        createdAt: Date.now,
        createdBy: userService.getLoggedInUser(),
        style: {
            id: utils.makeId(),
            fontClr: '#f9f9f9',
            bgImg: null
        },
        members: [],
        groups: []
    }
}


const groups = {
    bachelorParty: [{
        id: utils.makeId(),
        style: {},
        title: 'Todos',
        archivedAt: false,
        cards: [{
            id: utils.makeId(),
            title: 'Get Alcohol',
            description: "Get the good stuff",
            archivedAt: false,
            createdAt: Date.now(),
            checklists: [
                {
                    id: utils.makeId(),
                    "title": "Beers",
                    "todos": [
                        {
                            "id": utils.makeId(),
                            "isDone": false,
                            "title": "Tuborg"
                        },
                        {
                            "id": utils.makeId(),
                            "isDone": false,
                            "title": "Budweizer"
                        }, {
                            "id": utils.makeId(),
                            "isDone": false,
                            "title": "Corona"
                        }, {
                            "id": utils.makeId(),
                            "isDone": false,
                            "title": "Bud Light"
                        }
                    ]
                },
                {
                    "id": utils.makeId(),
                    "title": "Liquor",
                    "todos": [
                        {
                            "id": utils.makeId(),
                            "isDone": false,
                            "title": "3 Vodkas"
                        }, {
                            "id": utils.makeId(),
                            "isDone": false,
                            "title": "2 Patrons"
                        }, {
                            "id": utils.makeId(),
                            "isDone": false,
                            "title": "Jagermeister"
                        }, {
                            "id": utils.makeId(),
                            "isDone": false,
                            "title": "5 Jack Daniels"
                        }
                    ]
                }
            ],
                labels: [{
                    "id": "l101",
                }]
        }]
    }],
    softProject: ['']
}
