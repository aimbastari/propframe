import React from 'react';
import { Component } from 'react';
import Header from './header.js';
import SignIn from './auth/signin.js';

export default class App extends Component {
  render() {
    return (
      <div className="ui container">
        <Header />
        {this.props.children}
       </div>
    );
  }
}
