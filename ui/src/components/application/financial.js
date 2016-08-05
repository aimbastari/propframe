import React from 'react';
import { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import PureInput from '../pure_input.js';


export const fields = [
  'bankAccounts[].name',
  'bankAccounts[].address',
  'bankAccounts[].type',
  'bankAccounts[].number',
  'creditors[].name',
  'creditors[].address',
  'creditors[].number',
  'creditors[].monthlyPayment'
]

class Financial extends Component {

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
         fields: { bankAccounts, creditors },
         handleSubmit,
         resetForm,
         invalid,
         submitting
       } = this.props

    return (
      <div className="ui segment">
        <h3>Financial Information</h3>
        <form className="ui mini form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

            <div className="ui horizontal divider">
              Bank Section
            </div>

            <div className="ui segment">
              <button  className="ui olive mini button right floated" type="button" onClick={() => {
                bankAccounts.addField()    // pushes empty child field onto the end of the array
              }}>Add Bank Account
              </button>
            </div>

            {!bankAccounts.length && <div>No Bank Accounts</div>}
            {bankAccounts.map((bankAccount, index) => <div key={index}>
              <div className="ui raised segment">
                 <h4>{"Bank Account #" + (index)}</h4>
                 <div className="two fields">
                   <div className="field">
                     <label>bank name</label>
                     <PureInput type="text" placeholder="name" field={bankAccount.name}/>
                   </div>
                   <div className="field">
                     <label>bank address</label>
                     <PureInput type="text" placeholder="Apt" field={bankAccount.address}/>
                   </div>
                 </div>

                 <div className="two fields">
                   <div className="field">
                     <label>account number</label>
                     <PureInput type="text" placeholder="number" field={bankAccount.number}/>
                   </div>
                   <div className="field">
                     <label>account type</label>
                     <div>
                       <select
                         {...bankAccount.type}
                         value={bankAccount.type.value || ''}>
                         <option></option>
                         <option value="savings">savings</option>
                         <option value="checking">checking</option>
                       </select>
                     </div>
                   </div>
                 </div>


                 <div>
                   <div className="ui mini compact icon buttons">
                     <button className="ui mini button" type="button" disabled={index === 0} onClick={() => {
                       bankAccounts.swapFields(index, index - 1)  // swap field with it's predecessor
                     }}><i className="mini orange inverted angle double up icon"></i>
                     </button>
                     <button className="ui mini button" type="button" disabled={index === bankAccounts.length - 1} onClick={() => {
                       bankAccounts.swapFields(index, index + 1)  // swap field with it's successor
                     }}><i className="mini orange inverted  angle double down icon"></i>
                     </button>
                  </div>
                  <div className="ui mini compact icon buttons">
                     <button className="ui mini button" type="button" onClick={() => {
                       bankAccounts.removeField(index)  // remove from index
                     }}><i className="mini red remove circle outline red icon"></i>
                     </button>
                   </div>

                 </div>
               </div>
             </div>)}


             <div className="ui horizontal divider">
               Creditors Section
             </div>

             <div className="ui segment">
               <button  className="ui olive mini button right floated" type="button" onClick={() => {
                 creditors.addField()    // pushes empty child field onto the end of the array
               }}>Add Creditor
               </button>
             </div>

             {!creditors.length && <div>No Bank Accounts</div>}
             {creditors.map((creditor, index) => <div key={index}>
               <div className="ui raised segment">
                  <h4>{"Creditor #" + (index)}</h4>
                  <div className="two fields">
                    <div className="field">
                      <label>creditor name</label>
                      <PureInput type="text" placeholder="name" field={creditor.name}/>
                    </div>
                    <div className="field">
                      <label>creditor address</label>
                      <PureInput type="text" placeholder="Apt" field={creditor.address}/>
                    </div>
                  </div>

                  <div className="two fields">
                    <div className="field">
                      <label>creditor phone</label>
                      <PureInput type="text" placeholder="number" field={creditor.number}/>
                    </div>
                    <div className="field">
                      <label>monthly payment</label>
                      <PureInput type="text" placeholder="number" field={creditor.monthlyPayment}/>
                    </div>
                  </div>


                  <div>
                    <div className="ui mini compact icon buttons">
                      <button className="ui mini button" type="button" disabled={index === 0} onClick={() => {
                        creditors.swapFields(index, index - 1)  // swap field with it's predecessor
                      }}><i className="mini orange inverted angle double up icon"></i>
                      </button>
                      <button className="ui mini button" type="button" disabled={index === creditors.length - 1} onClick={() => {
                        creditors.swapFields(index, index + 1)  // swap field with it's successor
                      }}><i className="mini orange inverted  angle double down icon"></i>
                      </button>
                   </div>
                   <div className="ui mini compact icon buttons">
                      <button className="ui mini button" type="button" onClick={() => {
                        creditors.removeField(index)  // remove from index
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
    form: 'financialForm',
    fields
}, mapStateToProps, actions)(Financial);
