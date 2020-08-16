import * as types from './../constants/ActionTypes';
var initialState = false;

var myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.TOGGLE_FORM : {
            let newState = state;
            console.log(!newState);
            return !newState;
        }
        case types.OPEN_FORM : {
            return state;
        }
        case types.CLOSE_FORM : {
            return false;
        }
        default :
            return state;
    }
}

export default myReducer;