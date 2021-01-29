import logo from '../logo.svg';
import React from 'react'; 
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class NavbarPerso extends React.Component {

  render() {
    return (
    <>    
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home"> <img src={logo} height="30" width="30"></img></Navbar.Brand>
        <Navbar.Brand href="#home">Bitclic</Navbar.Brand>
        
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: {this.props.account} <br></br>
              Actual balance: {this.props.currentBalance}
            </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>         
    );
  }
}

export default NavbarPerso;