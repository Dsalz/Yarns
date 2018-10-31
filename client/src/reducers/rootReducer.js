import { combineReducers } from 'redux';
import userReducer from './userReducer';
import houseReducer from './houseReducer';
import roomReducer from './roomReducer';
import estateReducer from './estateReducer';

const rootReducer = combineReducers({
    user: userReducer,
    house: houseReducer,
    room: roomReducer,
    estate: estateReducer
})

export default rootReducer;