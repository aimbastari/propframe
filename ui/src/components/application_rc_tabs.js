import 'rc-tabs/assets/index.css';
import React from 'react';
import { Component } from 'react';
import Tabs, {TabPane} from 'rc-tabs';
import { connect } from 'react-redux';
import * as actions from '../actions';

import General from './application/general';
import Address from './application/address';
import Occupant from './application/occupant';
import Pet from './application/pet';
import Auto from './application/auto';
import Employment from './application/employment';
import Financial from './application/financial';





export class ApplicationRcTabs extends Component {

  componentWillMount(){
    this.props.getApplication(this.props.params.id);

  }

  render() {
    return(
      <div>
        <h3>Application: {this.props.applicationName}</h3>

        <Tabs defaultActiveKey="1" >
          <TabPane tab='General' key="1">
            <General id = {this.props.params.id}/>
          </TabPane>
          <TabPane tab='Addresses' key="2">
            <Address id = {this.props.params.id}/>
          </TabPane>
          <TabPane tab='Occupants' key="3">
            <Occupant id = {this.props.params.id}/>
          </TabPane>
          <TabPane tab='Pets' key="4">
            <Pet id = {this.props.params.id}/>
          </TabPane>
          <TabPane tab='Autos' key="5">
            <Auto id = {this.props.params.id}/>
          </TabPane>
          <TabPane tab='Employment' key="6">
            <Employment id = {this.props.params.id}/>
          </TabPane>
          <TabPane tab='Financials' key="7">
            <Financial id = {this.props.params.id}/>
          </TabPane>
          <TabPane tab='References' key="8">Reference info</TabPane>
          <TabPane tab='Emergency' key="9">Emergency info</TabPane>
          <TabPane tab='Other' key="10">Other info</TabPane>
          <TabPane tab='Additional' key="11">Additional info</TabPane>
          <TabPane tab='Signature' key="12">Signature info</TabPane>
        </Tabs>
    </div>
    );
  }
}

function mapStateToProps(state){
    return {applicationName : state.application.application.name};
}

export default connect(mapStateToProps, actions)(ApplicationRcTabs);
