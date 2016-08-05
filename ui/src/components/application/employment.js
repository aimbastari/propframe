import React from 'react';
import { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import PureInput from '../pure_input.js';


export const fields = [
  'employments[].supervisor',
  'employments[].phone',
  'employments[].position',
  'employments[].positionLength',
  'employments[].name',
  'employments[].street',
  'employments[].city',
  'employments[].state',
  'employments[].zipcode',
  'grossIncome',
  'paymentInterval'
]

class Employment extends Component {

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
         fields: { employments, grossIncome, paymentInterval },
         handleSubmit,
         resetForm,
         invalid,
         submitting
       } = this.props

    return (
      <div className="ui segment">
        <h3>List of Current and Previous Employments</h3>
        <form className="ui mini form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

            <div className="ui raised segment">
               <div className="two fields">
                 <div className="field">
                   <label>current gross income</label>
                   <PureInput type="text" placeholder="current gross income(USD)" field={grossIncome}/>
                 </div>
                 <div className="field">
                   <label>Payment Interval</label>
                  <label>
                    <input type="radio" {...paymentInterval} value="week" checked={paymentInterval.value === 'week'}/> year
                  </label>
                  <label>
                    <input type="radio" {...paymentInterval} value="month" checked={paymentInterval.value === 'month'}/> month
                  </label>
                  <label>
                    <input type="radio" {...paymentInterval} value="year" checked={paymentInterval.value === 'year'}/> year
                  </label>

                 </div>
               </div>

            </div>


            <div className="ui segment">
              <button  className="ui olive mini button right floated" type="button" onClick={() => {
                employments.addField()    // pushes empty child field onto the end of the array
              }}>Add Employment
              </button>
            </div>

            {!employments.length && <div>No Employments</div>}
            {employments.map((employment, index) => <div key={index}>
              <div className="ui raised segment">
                 <h4>{index == 0 ? "Current Employment" : "Previous Employment #" + (index)}</h4>
                 <div className="two fields">
                   <div className="field">
                     <label>Supervisor name</label>
                     <PureInput type="text" placeholder="name" field={employment.supervisor}/>
                   </div>
                   <div className="field">
                     <label>Supervisor phone</label>
                     <PureInput type="text" placeholder="Apt" field={employment.phone}/>
                   </div>
                 </div>

                 <div className="two fields">
                   <div className="field">
                     <label>Describe position</label>
                     <PureInput type="text" placeholder="position" field={employment.position}/>
                   </div>
                   <div className="field">
                     <label>How long?</label>
                     <PureInput type="text" placeholder="length" field={employment.positionLength}/>
                   </div>
                 </div>

                 <div className="two fields">
                   <div className="field">
                     <label>employer name</label>
                     <PureInput type="text" placeholder="position" field={employment.name}/>
                   </div>
                   <div className="field">
                     <label>employer street</label>
                     <PureInput type="text" placeholder="position" field={employment.street}/>
                   </div>
                 </div>

                 <div className="three fields">
                   <div className="field">
                     <label>city</label>
                     <PureInput type="text" placeholder="city" field={employment.city}/>
                   </div>
                   <div className="field">
                     <label>state</label>
                     <PureInput type="text" placeholder="state" field={employment.state}/>
                   </div>
                   <div className="field">
                     <label>zipcode</label>
                     <PureInput type="text" placeholder="zipcode" field={employment.zipcode}/>
                   </div>
                 </div>

                 <div>
                   <div className="ui mini compact icon buttons">
                     <button className="ui mini button" type="button" disabled={index === 0} onClick={() => {
                       employments.swapFields(index, index - 1)  // swap field with it's predecessor
                     }}><i className="mini orange inverted angle double up icon"></i>
                     </button>
                     <button className="ui mini button" type="button" disabled={index === employments.length - 1} onClick={() => {
                       employments.swapFields(index, index + 1)  // swap field with it's successor
                     }}><i className="mini orange inverted  angle double down icon"></i>
                     </button>
                  </div>
                  <div className="ui mini compact icon buttons">
                     <button className="ui mini button" type="button" onClick={() => {
                       employments.removeField(index)  // remove from index
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
    form: 'employmentForm',
    fields
}, mapStateToProps, actions)(Employment);
