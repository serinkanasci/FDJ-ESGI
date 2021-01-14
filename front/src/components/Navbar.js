import React, { Component } from 'react';
import logo from '../logo.svg';

class Navbar extends React.Component {

  render() {
    return (
    <>
        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="www.facebook.com">
                <img src={logo} width="30" height="30" class="d-inline-block align-top" alt="Logo Bitclic"/> 
                Bitclic
            </a>
            &nbsp; <span>Current user address : {this.props.account}</span>
        </nav>
    </>   
        
    );
  }
}

export default Navbar;