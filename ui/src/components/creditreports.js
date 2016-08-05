import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CreditReports extends Component {

  componentWillMount(){
//    this.props.dashboardGet();

  }

  render() {
    return (
      <div>
        CreditReports page
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };

}

export default connect(mapStateToProps, actions)(CreditReports);
