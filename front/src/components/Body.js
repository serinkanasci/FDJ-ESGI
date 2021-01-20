import React, { Component } from 'react'; 
import { Card, Button } from 'react-bootstrap';

class Body extends React.Component {

  render() {
    

    const items = []
    for (var i = 0; i < this.props.loteriesLength; i++) {
      items.push(
          <Card style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>{this.props.loteries[i][1]}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{this.props.loteries[i][0]}</Card.Subtitle>
            <Card.Text>
              Ceci pourrait être une description à rajouter dans le smart contract
            </Card.Text>
            <Button variant="primary" onClick={ async () => {await this.props.loteryAbi.methods.participateToLotery(i).send({ from: this.props.account })}}>Participate !</Button>
            </Card.Body>
          </Card>
      )
    }
    return (
    <>
    <div className="container"> 
      {items}
    </div>   
    </>   
        
    );
  }
}

export default Body;