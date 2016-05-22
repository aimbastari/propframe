import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, DASHBOARD_GET} from '../actions/types.js';

export default function(state = {}, action){
    switch(action.type){
        case AUTH_USER:
            return { ...state, authenticated: true, error: ""};
        case UNAUTH_USER:
            return { ...state, authenticated: false, error: ""};
        case AUTH_ERROR:
            return {...state, authenticated: false, error: action.payload}
        case DASHBOARD_GET:
            return {...state, message: action.payload}
            
    }
    
    return state;
}