
import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, DASHBOARD_GET } from './types';


import {PROFILE_GET} from './types';

import {GET_APPLICATION_LIST, GET_APPLICATION, SAVE_APPLICATION} from './types';



const API_URL = 'http://localhost:3090';


export function signinUser({email, password}){

    return function(dispatch){
        //Submit email/password to the server
        axios.post(`${API_URL}/signin`, {email, password})
            .then(response => {
                //Save the JWT token
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('firstName', response.data.firstName);
                localStorage.setItem('roles', response.data.roles);


                //If request is good...
                //Update state to indicate user is authenticated
                dispatch({type: AUTH_USER});

                //redirect to the route '/dashboard'
                browserHistory.push("/dashboard");

            })
            .catch((err) => {
                //If request is bad...
                //Show error to the user
                console.log("Error: " );
                console.log(err );

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
                localStorage.setItem('profile', response.data.profile);


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


//Profile Actions
export function getProfile(){

    return function(dispatch){
      debugger;
        //Since this is a protected api route, need to add the JWT token to the authorization header
        axios.get(`${API_URL}/profile`, {headers: {authorization: localStorage.getItem('token')}})
            .then(response => {
                //Get user profile
                dispatch({type: PROFILE_GET, payload: response.data.user});

            })
            .catch((response) => {
                //Show error to the user
                console.log("Protected Route Error: " + response.data);
//                dispatch(authError(response.data.error));

            });

    }

}

export function saveProfile({firstName, lastName, address, state, zipCode}){
    debugger;
    return function(dispatch){
        debugger;
        //Submit profile  to the server
        axios.post(`${API_URL}/profile`,
          {firstName, lastName, address, state, zipCode},
          {headers: {authorization: localStorage.getItem('token')}})
            .then(response => {
              debugger;
                //If request is good...
                //Update state to indicate user is authenticated
                //dispatch({type: AUTH_USER});

                //Save the JWT token
                const user = response.data.user;
                const profile = {
                  firstName : user.firstName
                }

                localStorage.setItem('profile', profile);


                //redirect to the route '/dashboard'
                browserHistory.push("/profile");

            })
            .catch((response) => {
              debugger;
                //If request is bad...
                //Show error to the user
                dispatch(authError(response.data.error));

                browserHistory.push("/profile");

            });

    }
}



//Application Actions
export function getApplicationList(){

    return function(dispatch){
      debugger;
        //Since this is a protected api route, need to add the JWT token to the authorization header
        axios.get(`${API_URL}/applications`, {headers: {authorization: localStorage.getItem('token')}})
            .then(response => {
                //Get user profile
                debugger;
                dispatch({type: GET_APPLICATION_LIST, payload: response.data});

            })
            .catch((response) => {
                //Show error to the user
                debugger;
                console.log("Protected Route Error: " + response.data);
//                dispatch(authError(response.data.error));

            });

    }

}

export function getApplication(applicationId){

    return function(dispatch){
      debugger;
        //Since this is a protected api route, need to add the JWT token to the authorization header
        axios.get(`${API_URL}/applications/${applicationId}`, {headers: {authorization: localStorage.getItem('token')}})
            .then(response => {
                //Get user profile
                debugger;
                dispatch({type: GET_APPLICATION, payload: response.data});

            })
            .catch((response) => {
                //Show error to the user
                debugger;
                console.log("Error retrieving application: " + response.data);
//                dispatch(authError(response.data.error));

            });

    }

}

export function saveApplication(id, fields){
    debugger;
    return function(dispatch){
        debugger;
        //Submit profile  to the server
        axios.post(`${API_URL}/applications/${id}`,
          fields,
          {headers: {authorization: localStorage.getItem('token')}})
            .then(response => {
                //redirect to the route '/appplication list'
                browserHistory.push("/applications");

            })
            .catch((response) => {
                browserHistory.push("/applications");

            });

    }
}


export function copyApplication(id){
    debugger;
    return function(dispatch){
        debugger;
        //submit application copy to backend
        axios.post(`${API_URL}/applications/copy/${id}`,
          "",
          {headers: {authorization: localStorage.getItem('token')}})
            .then(response => {

              //send new list of applications'
              dispatch({type: GET_APPLICATION_LIST, payload: response.data});

            })
            .catch((response) => {
                browserHistory.push("/applications");

            });

    }
}

export function deleteApplication(id){
    return function(dispatch){
        debugger;
        //submit application delete to backend
        axios.delete(`${API_URL}/applications/${id}`,
          {headers: {authorization: localStorage.getItem('token')}})
            .then(response => {
                //send new list of applications'
                dispatch({type: GET_APPLICATION_LIST, payload: response.data});

            })
            .catch((response) => {
                browserHistory.push("/");

            });

    }
}
