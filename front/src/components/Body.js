import React, { Component } from 'react'; 
import { Card, Button } from 'react-bootstrap';

class Body extends React.Component {

  render() {
    return (
    <>
    <div className="container">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{this.props.loteries[1]}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.loteries[0]}</Card.Subtitle>
          <Card.Text>
            Ceci pourrait être une description à rajouter dans le smart contract
          </Card.Text>
          <Button variant="primary">Participate !</Button>
        </Card.Body>
      </Card>
    </div>   
    </>   
        
    );
  }
}

export default Body;