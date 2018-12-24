import *as actionTypes from './type' 
export const setCurrentChannels=channel=>({
    type:actionTypes.SET_CURRENT_CHANNEL,
    data:channel
})