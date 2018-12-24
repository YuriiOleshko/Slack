import {combineReducers} from 'redux';
import user from './setUserReducer'
import channel from './setChannelsReduser'

const  rootReducer=combineReducers({
    user,
    channel
})
export default rootReducer