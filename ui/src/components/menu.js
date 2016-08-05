import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Link } from 'react-router';

export default class Menu extends Component{

  render(){
    return (

        // <ul>
        //   <li key={1}><Link  to="/profile">manage profile</Link></li>
        //   <li  key={2}><Link to="/references">references</Link></li>
        //   <li  key={3}><Link to="/creditreports">credit reports</Link></li>
        //
        // </ul>

        <div className="ui vertical menu">
          <div className="item">
            <div className="header">Profile</div>
            <div className="menu">
              <Link  className="active item" to="/profile">edit</Link>
            </div>
          </div>

          <div className="item">
            <div className="header">Applications</div>
            <div className="menu">
              <Link  className="item" to="/applications">list</Link>
              <Link  className="item" to="/history">rental history</Link>
              <Link  className="item" to="/references">references</Link>
              <Link  className="item" to="/creditreports">credit reports</Link>
              <Link  className="item" to="/creditreports">apply</Link>
            </div>
          </div>

          <div className="item">
            <div className="header">Contract</div>
            <div className="menu">
              <Link  className="item" to="/history">read</Link>
              <Link  className="item" to="/references">sign</Link>
            </div>
          </div>

          <div className="item">
            <div className="header">Subsidies</div>
            <div className="menu">
              <Link  className="item" to="/history">Housing assistance</Link>
              <Link  className="item" to="/references">apply</Link>
            </div>
          </div>


          <div className="item">
            <div className="header">Service</div>
            <div className="menu">
              <a className="item">New Request</a>
              <a className="item">Pending</a>
              <a className="item">History</a>
            </div>
          </div>

        </div>


    );

  }

}
