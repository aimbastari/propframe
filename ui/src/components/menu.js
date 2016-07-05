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
          <div classNamw="item">
            Tennant
            <div className="menu">
              <Link  className="active item" to="/profile">profile</Link>
              <Link  className="item" to="/references">references</Link>
              <Link  className="item" to="/creditreports">credit reports</Link>
            </div>
          </div>

          <div classNamw="item">
            Landlord
            <div className="menu">
              <a className="item">Search</a>
              <a className="item">Add</a>
              <a className="item">Remove</a>
            </div>
          </div>

        </div>


    );

  }

}
