import storageService from './storageService'
import httpService from './httpService'

const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    loginDefault,
    getLoggedInUser,
    // getByIdDb,
    getUsersFromDb
}

// window.userService = userService;
export default userService;

function loginDefault() {
    const defaultGuest= {
        "_id": "u900",
        "username": "Guest",
        "fullName": "Guesty guest",
        "imgUrl": "https://images-na.ssl-images-amazon.com/images/I/41v4Cc8iZ-L._AC_.jpg"
      }

      _handleLogin(defaultGuest)
}


async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    sessionStorage.setItem('user', JSON.stringify(user))
    return _handleLogin(user)
}

async function getUsersFromDb() {
    return httpService.get('user')
}

function getUsers() {
    return storageService.query('user')
}

function getLoggedInUser() {
    return storageService.loadFromStorage('user')
}

function getById(userId) {
    // return httpService.get(`user/${userId}`)
    return storageService.get('user', userId)
}

function remove(userId) {
    // return httpService.delete(`user/${userId}`)
    return storageService.remove('user', userId)
}

function update(user) {
    return storageService.put('user', user)
    // return httpService.put(`user/${user._id}`, user)
}


async function signup(userCred) {
    // const user = await httpService.post('auth/signup', userCred)
    const user = await storageService.post('user', userCred)
    return _handleLogin(user)
}
async function logout() {
    // await httpService.post('auth/logout');
    sessionStorage.clear();
}
// function _handleLogin(user) {
//     sessionStorage.setItem('user', JSON.stringify(user))
//     return user;
// }

function _handleLogin(user) {
    // THIS SAVES TO LOCAL STORAGE INSTEAD OF SESSION STORAGE!!!
        localStorage.setItem('user', JSON.stringify(user))
        return user;
    }