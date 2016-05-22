
import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, DASHBOARD_GET } from './types';


const API_URL = 'http://localhost:3090';


export function signinUser({email, password}){
      
    return function(dispatch){
        //Submit email/password to the server
        axios.post(`${API_URL}/signin`, {email, password})
            .then(response => {
                //If request is good...
                //Update state to indicate user is authenticated
                dispatch({type: AUTH_USER});
                
                //Save the JWT token
                localStorage.setItem('token', response.data.token);
                
                //redirect to the route '/dashboard'
                browserHistory.push("/dashboard");
                
            })
            .catch(() => {
                //If request is bad...
                //Show error to the user
                console.log("email / password do not match");
                dispatch(authError('email / password do not match'));
                
                
                browserHistory.push("/signin");
                                                
            });
        
    }    
}

export function signupUser({email, password}){
      
    return function(dispatch){
        //Submit email/password to the server
        axios.post(`${API_URL}/signup`, {email, password})
            .then(response => {
                //If request is good...
                //Update state to indicate user is authenticated
                dispatch({type: AUTH_USER});
                
                //Save the JWT token
                localStorage.setItem('token', response.data.token);
                
                //redirect to the route '/dashboard'
                browserHistory.push("/dashboard");
                
            })
            .catch((response) => {
                //If request is bad...
                //Show error to the user
                dispatch(authError(response.data.error));
                                    
                browserHistory.push("/signup");
                                                
            });
        
    }    
}


export function signoutUser(){
    localStorage.removeItem('token');

    return (
      {type : UNAUTH_USER}  
    );
    
}

export function authError(error){
    return {
      type: AUTH_ERROR,
      payload: error  
    };
    
}


export function dashboardGet(){

    return function(dispatch){
        //Since this is a protected api route, need to add the JWT token to the authorization header
        axios.get(`${API_URL}/`, {headers: {authorization: localStorage.getItem('token')}})
            .then(response => {
                //Update dashboard data
                dispatch({type: DASHBOARD_GET, payload: response.data.message});
                
            })
            .catch((response) => {
                //Show error to the user
                console.log("Protected Route Error: " + response.data);
//                dispatch(authError(response.data.error));
                                                
            });
        
    }    
    
}
