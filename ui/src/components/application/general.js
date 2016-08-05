import React from 'react';
import { Component } from 'react';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions';
import PureInput from '../pure_input.js';


export const fields = [
  'name',
  'status',
  'firstName',
  'middleName',
  'lastName',
  'aliases[]',
  'ssn',
  'dateOfBirth',
  'otherId',
  'driversLicense.number',
  'driversLicense.expiration',
  'driversLicense.state',
  'phones[].number',
  'phones[].type',
  'email'

]

class General extends Component {

  componentWillMount(){
    this.props.getApplication(this.props.id);

  }


  handleFormSubmit(){
      //contact the backend.
      debugger;
     this.props.saveApplication(this.props.id, this.props.values);

  }

  render() {

    const {
         addValue,
         fields: {name, status, firstName, middleName, lastName, aliases, ssn, dateOfBirth, otherId, driversLicense, phones, email },
         handleSubmit,
         resetForm,
         invalid,
         submitting
       } = this.props

    return (
      <div className="ui segment">

        <form className="ui mini form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="two fields">
            <div className="field">
              <label>application name</label>
              <input {...name}  placeholder="application name"/>
            </div>
            <div className="field">
              <label>status</label>
              <input {...status}  placeholder="status"/>
            </div>
          </div>


          <div className="ui horizontal divider">
            Name Section
          </div>

          <div className="three fields">
            <div className="field">
              <label>first name</label>
              <input {...firstName}  placeholder="first name"/>
            </div>
            <div className="field">
              <label>middle name</label>
              <input {...middleName}  placeholder="middle name"/>
            </div>
            <div className="field">
              <label>last name</label>
              <input {...lastName}  placeholder="last name"/>
            </div>
          </div>

{/* Alias info  */}
        <div className="ui segment">
          <button  className="ui olive mini button right floated" type="button" onClick={() => {
            aliases.addField()    // pushes empty child field onto the end of the array
          }}>Add Alias
          </button>
        </div>

        {!aliases.length && <div>No Aliases</div>}
        {aliases.map((alias, index) => <div key={index}>
          <div className="ui raised segment">
             <h4>{ "alias #" + (index)}</h4>
             <div className="fields">
               <div className="field">
                 <label>alias</label>
                 <PureInput type="text" placeholder="alias" field={alias}/>
               </div>
             </div>


             <div>
              <div className="ui mini compact icon buttons">
                 <button className="ui mini button" type="button" onClick={() => {
                   alias.removeField(index)  // remove from index
                 }}><i className="mini red remove circle outline red icon"></i>
                 </button>
               </div>

             </div>
           </div>
         </div>)}




          <div className="ui horizontal divider">
            Id Section
          </div>

          <div className="two fields">
            <div className="field">
              <label>SSN</label>
              <input {...ssn}  placeholder="social security number"/>
            </div>
            <div className="field">
              <label>date of birth</label>
              <input {...dateOfBirth}  placeholder="date of birth"/>
            </div>
          </div>

          <div className="three fields">
            <div className="field">
              <label>Drivers License</label>
              <input {...driversLicense.number}  placeholder="drivers license number"/>
            </div>
            <div className="field">
              <label>expiration</label>
              <input {...driversLicense.expiration}  placeholder="drivers license expiration"/>
            </div>
            <div className="field">
              <label>State</label>
              <input {...driversLicense.state}  placeholder="drivers license state"/>
            </div>

          </div>


          <div className="one fields fluid">
            <div className="field">
              <label>Other Id</label>
              <input {...otherId}  placeholder="other id"/>
            </div>
          </div>

          <div className="ui horizontal divider">
            Contact Section
          </div>

          <div className="one fields">
            <div className="field">
              <label>email</label>
              <input {...email}  placeholder="email"/>
            </div>
          </div>

          {/* Phone info  */}
          <div className="ui segment">
            <button  className="ui olive mini button right floated" type="button" onClick={() => {
              phones.addField()    // pushes empty child field onto the end of the array
            }}>Add phone
            </button>
          </div>

          {!phones.length && <div>No Phones</div>}
          {phones.map((phone, index) => <div key={index}>
            <div className="ui raised segment">
               <h4>{ "phone #" + (index)}</h4>
               <div className="two fields">
                 <div className="field">
                   <label>phone</label>
                   <PureInput type="text" placeholder="phone number" field={phone.number}/>
                 </div>

                 <div className="field">
                   <label>type</label>
                   <PureInput type="text" placeholder="phone type" field={phone.type}/>
                 </div>

               </div>


               <div>
                <div className="ui mini compact icon buttons">
                   <button className="ui mini button" type="button" onClick={() => {
                     phones.removeField(index)  // remove from index
                   }}><i className="mini red remove circle outline red icon"></i>
                   </button>
                 </div>

               </div>
             </div>
           </div>)}

          <button action="submit" className="ui right floated orange submit button"> save</button>

        </form>
      </div>
    );
  }
}

function mapStateToProps(state){
    debugger;
    return {initialValues: state.application.application};

}

export default reduxForm({
    form: 'generalForm',
    fields
}, mapStateToProps, actions)(General);
