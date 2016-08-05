import React from 'react';
import { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

import PureInput from '../pure_input.js';

import 'react-date-picker/index.css';
import { DateField, Calendar } from 'react-date-picker';

export const fields = [
  'occupants[].firstName',
  'occupants[].middleName',
  'occupants[].lastName',
  'occupants[].relationship',
  'occupants[].adult'
]

class Occupant extends Component {

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
         fields: { occupants },
         handleSubmit,
         resetForm,
         invalid,
         submitting
       } = this.props

    return (
      <div className="ui segment">
        <h3>List of all occupants</h3>
        <form className="ui mini form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

            <div className="ui segment">
              <button  className="ui olive mini button right floated" type="button" onClick={() => {
                occupants.addField()    // pushes empty child field onto the end of the array
              }}>Add Occupant
              </button>
            </div>

            {!occupants.length && <div>No Occupants</div>}
            {occupants.map((occupant, index) => <div key={index}>
              <div className="ui raised segment">
                 <div className="three fields">
                   <div className="field">
                     <label>first name</label>
                     <PureInput type="text" placeholder="first name" field={occupant.firstName}/>
                   </div>
                   <div className="field">
                     <label>middle name</label>
                     <PureInput type="text" placeholder="middle name" field={occupant.middleName}/>
                   </div>
                   <div className="field">
                     <label>last name</label>
                     <PureInput type="text" placeholder="last name" field={occupant.lastName}/>
                   </div>

                 </div>

                 <div className="two fields">
                   <div className="field">
                     <label>relationship</label>
                     <PureInput type="text" placeholder="relationship" field={occupant.relationship}/>
                   </div>
                   <div className="field">
                     <label>adult (>18 yrs)</label>
                     <PureInput type="checkbox" placeholder="adult" field={occupant.adult}/>
                   </div>
                 </div>

                 <div>
                   <div className="ui mini compact icon buttons">
                     <button className="ui mini button" type="button" disabled={index === 0} onClick={() => {
                       occupants.swapFields(index, index - 1)  // swap field with it's predecessor
                     }}><i className="mini orange inverted angle double up icon"></i>
                     </button>
                     <button className="ui mini button" type="button" disabled={index === occupants.length - 1} onClick={() => {
                       occupants.swapFields(index, index + 1)  // swap field with it's successor
                     }}><i className="mini orange inverted  angle double down icon"></i>
                     </button>
                  </div>
                  <div className="ui mini compact icon buttons">
                     <button className="ui mini button" type="button" onClick={() => {
                       occupants.removeField(index)  // remove from index
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
    form: 'occupantForm',
    fields
}, mapStateToProps, actions)(Occupant);
