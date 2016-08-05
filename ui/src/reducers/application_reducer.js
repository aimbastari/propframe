import {GET_APPLICATION_LIST, GET_APPLICATION} from '../actions/types.js';

export default function(state = {applications : [], application : {}}, action){
    debugger;
    switch(action.type){
        case GET_APPLICATION_LIST:
            return { ...state, applications : action.payload};
        case GET_APPLICATION:
            return { ...state, application : action.payload};

    }

    return state;
}
