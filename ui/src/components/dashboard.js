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
      <div>
        Super secret Dashboard
        <div>
          {this.props.dashboard}
        </div>
        <Menu />
        {this.props.children}
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
