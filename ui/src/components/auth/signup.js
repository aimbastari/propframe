import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component{
    
    handleFormSubmit({email, password, confirm}){
        console.log(email, password, confirm);
        
        //contact the backend auth server.
       this.props.signupUser({email, password}); 
        
    }
    
    renderAlert(){
        if (this.props.errorMessage){
            return (
               <div className="alert alert-danger">
                    <strong>ERROR </strong>{this.props.errorMessage}
               </div> 
                
            );
            
        }
        
    }
    
    
    render(){
        const { handleSubmit, fields: { email, password, confirm}} = this.props;
        
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <input {...email} className="form-control" />
                    {email.touched && email.error && <div className="error">{email.error} </div>}
                </fieldset>
                
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input {...password}  type='password' className="form-control" />
                    {password.touched && password.error && <div className="error">{password.error} </div>}
                </fieldset>
                
                <fieldset className="form-group">
                    <label>Confirm:</label>
                    <input {...confirm}  type='password' className="form-control" />
                    {confirm.touched && confirm.error && <div className="error">{confirm.error} </div>}
                    
                </fieldset>
                
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary"> Sign up </button>
                
            </form>
        );
    }
}

function mapStateToProps(state){
    return {errorMessage: state.auth.error};
    
}

function validate(formProps){
    const errors = {};
    
    if( !formProps.email ){
        errors.email = 'Please enter email';
    }

    if( !formProps.password ){
        errors.password = 'Please enter password';
    }

    if( !formProps.confirm ){
        errors.confirm = 'Please enter confirmation password';
    }

    if( formProps.password !== formProps.confirm){
        errors.password = 'Passwords do not match';
    }
    
    
    return errors;
}


export default reduxForm({
    form: 'signin',
    fields: ['email', 'password', 'confirm'],
    validate
}, mapStateToProps, actions)(Signup);