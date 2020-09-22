import userService from '../../services/userService'


export function loadAllUsers(){
    return async dispatch=>{
        const users = await userService.getUsersFromDb()
        dispatch({ type: 'SET_USERS', users })
    }
}