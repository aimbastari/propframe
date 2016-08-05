import React from 'react';
import { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

import PureInput from '../pure_input.js';

import 'react-date-picker/index.css';
import { DateField, Calendar } from 'react-date-picker';

export const fields = [
  'pets[].description',
  'pets[].size'
]

class Pet extends Component {

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
         fields: { pets },
         handleSubmit,
         resetForm,
         invalid,
         submitting
       } = this.props

    return (
      <div className="ui segment">
        <h3>List of pets</h3>
        <form className="ui mini form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

            <div className="ui segment">
              <button  className="ui olive mini button right floated" type="button" onClick={() => {
                pets.addField()    // pushes empty child field onto the end of the array
              }}>Add Pet
              </button>
            </div>

            {!pets.length && <div>No Pets</div>}
            {pets.map((pet, index) => <div key={index}>
              <div className="ui raised segment">
                 <div className="two fields">
                   <div className="field">
                     <label>description</label>
                     <PureInput type="text" placeholder="description" field={pet.description}/>
                   </div>
                   <div>
                      <label>size</label>
                      <div>
                        <select
                          {...pet.size}
                          value={pet.size.value || ''}>
                          <option></option>
                          <option value="small">0-29 pounds</option>
                          <option value="medium">30-60 pounds</option>
                          <option value="large">>60 pounds</option>
                        </select>
                      </div>
                    </div>

                 </div>

                 <div>
                   <div className="ui mini compact icon buttons">
                     <button className="ui mini button" type="button" disabled={index === 0} onClick={() => {
                       pets.swapFields(index, index - 1)  // swap field with it's predecessor
                     }}><i className="mini orange inverted angle double up icon"></i>
                     </button>
                     <button className="ui mini button" type="button" disabled={index === pets.length - 1} onClick={() => {
                       pets.swapFields(index, index + 1)  // swap field with it's successor
                     }}><i className="mini orange inverted  angle double down icon"></i>
                     </button>
                  </div>
                  <div className="ui mini compact icon buttons">
                     <button className="ui mini button" type="button" onClick={() => {
                       pets.removeField(index)  // remove from index
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
    return {initialValues: state.application.application};

}

export default reduxForm({
    form: 'petForm',
    fields
}, mapStateToProps, actions)(Pet);
