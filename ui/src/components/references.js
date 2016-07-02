import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class References extends Component {

  componentWillMount(){
//    this.props.dashboardGet();

  }

  render() {
    return (
      <div>
        References page
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };

}

export default connect(mapStateToProps, actions)(References);
