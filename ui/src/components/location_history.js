import React from 'react';
import { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class LocationHistory extends Component {

  componentWillMount(){
    this.props.getRentalHistory();

  }


  handleFormSubmit({firstName, lastName, address, state, zipCode}){
      //contact the backend.
     this.props.saveProfile({firstName, lastName, address, state, zipCode});

  }

  render() {

    const { handleSubmit, fields: { firstName, lastName, address, state, zipCode}} = this.props;

    return (
      <div className="ui segment">
        <form className="ui mini form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h3>Profile</h3> {this.props.firstName}
          <div className="fields">
            <div className="field">
              <label>First name</label>
              <input {...firstName } placeholder="First Name"/>
            </div>
            <div className="field">
              <label>Last name</label>
              <input {...lastName } placeholder="Last Name"/>
            </div>
          </div>
          <div className="fields">
            <div className="field">
              <label>Address</label>
              <input {...address } placeholder="Address"/>
            </div>
            <div className="field">
              <label>State</label>
              <input {...state } placeholder="State"/>
            </div>
            <div className="field">
              <label>ZipCode</label>
              <input {...zipCode } placeholder="ZipCode"/>
            </div>
          </div>

          <button className="ui orange mini submit button" type="submit">Save</button>

        </form>

      </div>
    );
  }
}

function mapStateToProps(state){
    debugger;
    return {initialValues: state.profile.profile};

}

export default reduxForm({
    form: 'profileForm',
    fields: ['firstName', 'lastName', 'address', 'state', 'zipCode']
}, mapStateToProps, actions)(Profile);
