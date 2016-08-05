import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';


class ApplicationList extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount(){
    console.log("component will mount")
   this.props.getApplicationList();
  }

  componentWillUpdate(){
   console.log("component will update")
   //this.props.getApplicationList();
  }

  onCopyClick(id){
    this.props.copyApplication(id);
  }

  onDeleteClick(id){
    this.props.deleteApplication(id);

  }

  onCreateNewClick(id){
    this.props.createNewApplication();

  }


  renderApplications(){
    if(!this.props.applicationList){
      return <div>loading applications</div>
    }else{
      return (
        this.props.applicationList.map((app) => {
          return (
            <tr key={app._id}>
              <td>{app.name}</td>
              <td>{app.createDate}</td>
              <td>{app.status}</td>
              <td><Link to={"/applications/" + app._id}>edit</Link></td>
              <td><button className="mini ui button" onClick={this.onCopyClick.bind(this, [app._id])} >copy</button></td>
              <td><button className="mini ui button" onClick={this.onDeleteClick.bind(this, [app._id])} >del</button></td>
            </tr>
          );
        })
      );
    }//else
  }




  render() {

    if(!this.props.applicationList){
      return <div className="h2">Loading Application lists</div>
    }

    return (

      <div className="ui segment">
        Application list
        <table className="ui inverted yellow selectable table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Create Date</th>
              <th>Status</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderApplications()}

          </tbody>
        </table>

      </div>
    );
  }
}

function mapStateToProps(state){
    debugger;
    return {applicationList : state.application.applications};
}

export default connect(mapStateToProps, actions)(ApplicationList);
