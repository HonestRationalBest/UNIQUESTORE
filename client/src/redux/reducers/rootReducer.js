import { combineReducers } from 'redux';
import mainReducer from './mainReducer';



const rootReducer = combineReducers({
    mainPage: mainReducer
})

export default rootReducer;