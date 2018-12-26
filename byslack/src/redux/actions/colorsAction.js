import * as actionTypes from './type';
export const setCurrentColors = (primary,secondary) => ({
    type: actionTypes.SET_PRIVATE_COLORS,
    data: {
        primary,
        secondary}
})