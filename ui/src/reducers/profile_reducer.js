import {PROFILE_GET, PROFILE_SAVE, PROFILE_CANCEL} from '../actions/types.js';

export default function(state = {}, action){
    switch(action.type){
        case PROFILE_GET:
            debugger;
            return { ...state, profile : action.payload};
        case PROFILE_SAVE:
            return { ...state};
        case PROFILE_CANCEL:
            return {...state}

    }

    return state;
}
