const { default: storageService } = require("./storageService");

export const notificationService = {
    onLoad,
    getUpdated,
    setUpdated
}
function onLoad(boardId) {
    const lastUpdate = getUpdated(boardId)
    if (!lastUpdate) setUpdated(boardId)
}

function getUpdated(boardId) {
    let lastUpdated = storageService.loadFromStorage('lastUpdated')
    if (!lastUpdated || !lastUpdated[boardId]) return null
    return lastUpdated[boardId]
}

function setUpdated(boardId) {
    let lastUpdated = storageService.loadFromStorage('lastUpdated')
    if  (!lastUpdated) lastUpdated = {}
    lastUpdated[boardId] = Date.now()
    return storageService.saveToStorage('lastUpdated', lastUpdated)
}