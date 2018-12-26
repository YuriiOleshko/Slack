import * as actionTypes from '../actions/type';

const colors = (state = [], action) => {
    switch (action.type) {
        case actionTypes.SET_PRIVATE_COLORS:
            return {...action.data}
             default:
            return state;
    }
}
export default colors;