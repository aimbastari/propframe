import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Link } from 'react-router';

export default class Menu extends Component{



  render(){
    return (
        <ul>
          <li key={1}><Link  to="/profile">manage profile</Link></li>
          <li  key={2}><Link to="/references">references</Link></li>
          <li  key={3}><Link to="/creditreports">credit reports</Link></li>

        </ul>
    );


  }


}
