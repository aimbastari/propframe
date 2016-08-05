import React from 'react';
import { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

import PureInput from '../pure_input.js';

import 'react-date-picker/index.css';
import { DateField, Calendar } from 'react-date-picker';

export const fields = [
  'addresses[].street',
  'addresses[].apt',
  'addresses[].city',
  'addresses[].state',
  'addresses[].zipcode',
  'addresses[].dateIn',
  'addresses[].dateOut',
  'addresses[].manager',
  'addresses[].number',
  'addresses[].reasonForLeaving'
]

class Application extends Component {

  componentWillMount(){
    this.props.getApplication(this.props.id);

  }


  handleFormSubmit(){
      //contact the backend.
      debugger;
     this.props.saveApplication(this.props.id, this.props.values);

  }
  render() {
    let date = '2017-04-24';
    const onChange = (dateString, { dateMoment, timestamp }) => {
      console.log(dateString)
    }

    const {
         addValue,
         fields: { addresses },
         handleSubmit,
         resetForm,
         invalid,
         submitting
       } = this.props

    return (
      <div className="ui segment">
        <h3>List of Current and Previous Addresses</h3>
        <form className="ui mini form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

            <div className="ui segment">
              <button  className="ui olive mini button right floated" type="button" onClick={() => {
                addresses.addField()    // pushes empty child field onto the end of the array
              }}>Add Address
              </button>
            </div>

            {!addresses.length && <div>No Addresses</div>}
            {addresses.map((address, index) => <div key={index}>
              <div className="ui raised segment">
                 <h4>{index == 0 ? "Current Address" : "Previous Address #" + (index)}</h4>
                 <div className="two fields">
                   <div className="field">
                     <label>street</label>
                     <PureInput type="text" placeholder="Street" field={address.street}/>
                   </div>
                   <div className="field">
                     <label>apt</label>
                     <PureInput type="text" placeholder="Apt" field={address.apt}/>
                   </div>
                 </div>

                 <div className="three fields">
                   <div className="field">
                     <label>city</label>
                     <PureInput type="text" placeholder="city" field={address.city}/>
                   </div>
                   <div className="field">
                     <label>state</label>
                     <PureInput type="text" placeholder="state" field={address.state}/>
                   </div>
                   <div className="field">
                     <label>zipcode</label>
                     <PureInput type="text" placeholder="zipcode" field={address.zipcode}/>
                   </div>
                 </div>


                 <div className="two fields">
                   <div className="field">
                     <label>date in</label>
                       <DateField
                         dateFormat="YYYY-MM-DD"
                         date={address.dateIn}
                         onChange={onChange}
                       />
                   </div>
                   <div className="field">
                     <label>date out</label>
                     <PureInput type="text" placeholder="date out" field={address.dateOut}/>
                   </div>
                 </div>


                 <div className="three fields">
                   <div className="field">
                     <label>owner</label>
                     <PureInput type="text" placeholder="owner" field={address.manager}/>
                   </div>
                   <div className="field">
                     <label>owner number</label>
                     <PureInput type="text" placeholder="owner phone" field={address.number}/>
                   </div>
                   <div className="field">
                     <label>reason for leaving</label>
                     <PureInput type="textarea" placeholder="reason for leaving" field={address.reasonForLeaving}/>
                   </div>

                 </div>





                 <div>
                   <div className="ui mini compact icon buttons">
                     <button className="ui mini button" type="button" disabled={index === 0} onClick={() => {
                       addresses.swapFields(index, index - 1)  // swap field with it's predecessor
                     }}><i className="mini orange inverted angle double up icon"></i>
                     </button>
                     <button className="ui mini button" type="button" disabled={index === addresses.length - 1} onClick={() => {
                       addresses.swapFields(index, index + 1)  // swap field with it's successor
                     }}><i className="mini orange inverted  angle double down icon"></i>
                     </button>
                  </div>
                  <div className="ui mini compact icon buttons">
                     <button className="ui mini button" type="button" onClick={() => {
                       addresses.removeField(index)  // remove from index
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
    form: 'addressForm',
    fields
}, mapStateToProps, actions)(Application);
