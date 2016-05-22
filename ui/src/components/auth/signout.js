import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
    
    componentWillMount(){
        this.props.signoutUser();
        
    }
    
    render(){
        return (
        <div>
            Thanks for visiting Prop Frame!!
        </div>  
            
        );
        
    }
    
}


export default connect(null, actions)(Signout);