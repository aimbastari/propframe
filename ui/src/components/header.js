import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
           
    renderLinks(){
        if (this.props.authenticated){
            return(
                <li className="nav-item"><Link className="nav-link" to="/signout">sign out</Link></li>
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
            <nav className = "navbar navbar-light" >
                <Link to="/" className="navbar-brand">PropFrame</Link>
                <ul className="nav navbar-nav">
                    {this.renderLinks()}
                </ul>
            </nav> 
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated : state.auth.authenticated 
    }; 
}

export default connect(mapStateToProps)(Header);


