import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {

    renderLinks(){
        if (this.props.authenticated){
            return(
                <li className="ui right floated"><Link className="nav-link" to="/signout">sign out</Link></li>
            );

        }else{
            return (
                [
                    <li className="nav-item" key={1}><Link className="nav-link" to="/signin">sign in</Link></li>,
                    <li className="nav-item" key={2}><Link className="nav-link" to="/signup">sign up</Link></li>
                ]
            );
        }
    }

    render() {
        return (
            <div className="ui container">
            <nav className="ui inverted segment" >
                <Link to="/" className="ui standard inverted header">
                  <i className="orange building icon"> </i>
                  PROP FRAME
                </Link>
                <ul className="ui right floated">
                    {this.renderLinks()}
                </ul>
            </nav>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated : state.auth.authenticated
    };
}

export default connect(mapStateToProps)(Header);
