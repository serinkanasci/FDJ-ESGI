import React, { Component } from 'react'; 
import { InputGroup } from 'react-bootstrap';
// import Web3 from 'web3';

import { Card, Button } from 'react-bootstrap';

class Body extends React.Component { 
  render() {
    const items = []
    for (var i = 0; i < this.props.loteriesLength; i++) {
      items.push(
          <Card key={i} style={{ width: '18rem', marginTop: '1%' }}>
            <Card.Body>
            <Card.Title>{this.props.loteries[i][1]}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Win : {this.props.LoteriesWin[i]}</Card.Subtitle>
            <Card.Text >
              Ceci pourrait être une description à rajouter dans le smart contract
            </Card.Text>
            <Button variant="primary" onClick={async () => {await this.props.loteryAbi.methods.participateToLotery(i).send({ from: this.props.account, value: 1000000000000000000})}}>Participate to {i}!</Button>
            <Button style={{marginLeft:'1%'}} variant="primary" onClick={ async () => {await this.props.loteryAbi.methods.pickWinnerForLotery(i).send({ from: this.props.account })}}>Pick Winner !</Button>
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

// 
