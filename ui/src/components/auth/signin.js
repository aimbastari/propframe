import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component{

    handleFormSubmit({email, password}){
        //contact the backend auth server.
       this.props.signinUser({email, password});

    }

    renderAlert(){
        if (this.props.errorMessage){
            return (
               <div className="ui negative message">
                    <strong>ERROR </strong>{this.props.errorMessage}
               </div>

            );

        }

    }

    render(){
        const { handleSubmit, fields: { email, password}} = this.props;

        return (
          <div id="signIn" className="ui center aligned grid">
            <div className="column">
              <h4 className="ui left aligned  grey header">
                Sign-in to your account
              </h4>
              <form className="ui mini form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                  <fieldset className="field">
                    <div className="ui left icon input">
                      <i className="user icon"></i>
                      <input {...email}  placeholder="E-mail address"/>
                    </div>
                  </fieldset>
                  <fieldset className="field">
                    <div className="ui left icon input">
                      <i className="lock icon"></i>
                        <input {...password}  type='password' placeholder="password"/>
                    </div>
                  </fieldset>

                  {this.renderAlert()}
                  <button action="submit" className="ui fluid orange submit button"> Sign in </button>

                </form>
            </div>
          </div>
        );
    }
}

function mapStateToProps(state){
    return {errorMessage: state.auth.error};

}


export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);
