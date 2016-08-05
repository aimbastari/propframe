import React from 'react';
import { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

import PureInput from '../pure_input.js';

import 'react-date-picker/index.css';
import { DateField, Calendar } from 'react-date-picker';

export const fields = [
  'autos[].make',
  'autos[].model',
  'autos[].year',
  'autos[].license'
]

class Auto extends Component {

  componentWillMount(){
    this.props.getApplication(this.props.id);

  }

  handleFormSubmit(){
      //contact the backend.
     this.props.saveApplication(this.props.id, this.props.values);

  }
  render() {

    const {
         addValue,
         fields: { autos },
         handleSubmit,
         resetForm,
         invalid,
         submitting
       } = this.props

    return (
      <div className="ui segment">
        <h3>List of autos</h3>
        <form className="ui mini form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

            <div className="ui segment">
              <button  className="ui olive mini button right floated" type="button" onClick={() => {
                autos.addField()    // pushes empty child field onto the end of the array
              }}>Add Auto
              </button>
            </div>

            {!autos.length && <div>No Autos</div>}
            {autos.map((auto, index) => <div key={index}>
              <div className="ui raised segment">
                 <div className="three fields">
                   <div className="field">
                     <label>make</label>
                     <PureInput type="text" placeholder="make" field={auto.make}/>
                   </div>
                   <div className="field">
                     <label>model</label>
                     <PureInput type="text" placeholder="model" field={auto.model}/>
                   </div>
                   <div className="field">
                     <label>year</label>
                     <PureInput type="text" placeholder="year" field={auto.year}/>
                   </div>
                 </div>
                 <div className="one fields">
                   <div className="field">
                     <label>license #</label>
                     <PureInput type="text" placeholder="license" field={auto.license}/>
                   </div>
                 </div>

                 <div>
                   <div className="ui mini compact icon buttons">
                     <button className="ui mini button" type="button" disabled={index === 0} onClick={() => {
                       autos.swapFields(index, index - 1)  // swap field with it's predecessor
                     }}><i className="mini orange inverted angle double up icon"></i>
                     </button>
                     <button className="ui mini button" type="button" disabled={index === autos.length - 1} onClick={() => {
                       autos.swapFields(index, index + 1)  // swap field with it's successor
                     }}><i className="mini orange inverted  angle double down icon"></i>
                     </button>
                  </div>
                  <div className="ui mini compact icon buttons">
                     <button className="ui mini button" type="button" onClick={() => {
                       autos.removeField(index)  // remove from index
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
    form: 'autoForm',
    fields
}, mapStateToProps, actions)(Auto);
