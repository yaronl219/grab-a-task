import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import userReducer from './userReducer'


const rootReducer = combineReducers({
    userReducer,
    boardReducer
})

export default rootReducer;