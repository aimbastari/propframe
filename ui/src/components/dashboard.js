import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Menu from './menu';

class Dashboard extends Component {

  componentWillMount(){
    this.props.dashboardGet();

  }

  render() {
    return (
      <div className="ui segment">
        <div className="ui  breadcrumb">
          <a className="section">Home</a>
          <i className="right chevron icon divider"></i>
          <a className="section">Registration</a>
          <i className="right chevron icon divider"></i>
          <div className="active section">Personal Information</div>
        </div>

        <div className="ui stackable grid container">
          <div className="four wide column">
            <Menu />
          </div>
          <div className="eight wide column">
            {this.props.children}
          </div>
          <div className="four wide column">
            <div className="ui segment">
              {this.props.dashboard}
             </div>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dashboard: state.auth.message
  };

}

export default connect(mapStateToProps, actions)(Dashboard);
