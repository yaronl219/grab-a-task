import userService from '../../services/userService'


export function loadAllUsers(){
    return async dispatch=>{
        const users = await userService.getUsersFromDb()
        dispatch({ type: 'SET_USERS', users })
    }
}

export function updateUser(user) {
    return async dispatch => {
        dispatch({type: 'SET_USER',loggedInUser:user})
        await userService.update(user)
        userService.updateUserInLocalStorage(user)
    }
}

export function loadUser(creds) {
    return async dispatch => {
        // const users = await userService.getByIdDb()
        try{
            const user = await userService.login(creds)
            dispatch({ type: 'SET_USER', loggedInUser: user })
        }catch{console.log('no such user')}
    }
}

export function signUser({ name, email, password }){
    return async dispatch => {
        try{
            const userToSign = {
                fullName: name,
                email,
                password,
                imgUrl: null
            }

            const user = await userService.signup(userToSign)
            dispatch({ type: 'SET_USER', loggedInUser: user })
            const users = await userService.getUsersFromDb()
            dispatch({ type: 'SET_USERS', users })
            return user
         }catch {
            console.log('error in sign up')
        }
    }
}

export function logout(id){
    return async dispatch=> {
        try{
            await userService.logout()
            dispatch({ type: 'SET_USER', loggedInUser: null })
        }catch{
            console.log('error on logout')
        }
    }
}