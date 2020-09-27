import userService from '../../services/userService'


export function loadAllUsers(){
    return async dispatch=>{
        const users = await userService.getUsersFromDb()
        dispatch({ type: 'SET_USERS', users })
    }
}

export function loadUser(creds) {
    return async dispatch => {
        // const users = await userService.getByIdDb()
        try{
            const user = await userService.login(creds)
            dispatch({ type: 'SET_USER', loggedInUser: user })
        }catch{console.log('no such user');}
    }
}