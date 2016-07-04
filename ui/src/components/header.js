import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {

    renderLinks(){
        if (this.props.authenticated){
            return(
                <div className="link item"><Link to="/signout">sign out</Link></div>
            );

        }else{
            return (
                [
                    <div className="link item" key={1}><Link to="/signin">sign in</Link></div>,
                    <div className="link item" key={2}><Link to="/signup">sign up</Link></div>
                ]
            );
        }
    }

    render() {
        return (
            <div className="ui segment" >
                <Link to="/" className="ui grey header">
                  <i className="orange building icon"> </i>
                  PROP FRAME
                </Link>
                <div className="ui mini right floated menu">
                    {this.renderLinks()}
                </div>
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
