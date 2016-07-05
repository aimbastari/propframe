import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Profile extends Component {

  componentWillMount(){
//    this.props.dashboardGet();

  }

  render() {
    return (
      <div className="ui segment">
        Profile page
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };

}

export default connect(mapStateToProps, actions)(Profile);
