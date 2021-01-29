import React from 'react'; 

import { Card, Button } from 'react-bootstrap';

class Lotery extends React.Component { 

  render() {

    // Cette boucle va nous permettre de générer (render()) le composants pour chaque loteries
    const items = []
    if (this.props.account === this.props.admin) {
      for (var i = 0; i < this.props.loteriesLength; i++) {
        items.push(
            <Card key={i} style={{ width: '18rem', marginTop: '1%' }}>
              <Card.Body>
              
              <Card.Subtitle className="mb-2 text-muted">Win : {this.props.LoteriesWin[i]}</Card.Subtitle>
              <Card.Text >
                Ceci pourrait être une description à rajouter dans le smart contract
              </Card.Text>
  
              <Button variant="primary" 
  
              // Ceci est une fonction anonyme, on la déclare à la volée sans lui donnée de de nom
              // Elle a un paterne async / await : Async permet de prévenir que certains traitements ne sont pas "instantannées" et doivent recevoir ce qu'on appelle une Promesse
              // Tout call fait à la Blockchain fait l'objet d'une promesse en attente, qui sera répondue rapidement.
              // await permet de définir, où dans la fonction, sera / seront, le ou les traitements asynchrones
              onClick={async () => {
                await this.props.loteryAbi.methods.participateToLotery(i).send({ from: this.props.account, value: 1000000000000000000})}}
                >Participate {i}!</Button>
  
              <Button style={{marginLeft:'1%'}} 
              variant="primary" 
              onClick={async (e) => {
                e.preventDefault()
                await this.props.loteryAbi.methods.pickWinnerForLotery(i).send({ from: this.props.account })}}
              >Pick Winner !</Button>
              
              </Card.Body>
            </Card>
        )
      }
    } else{
      for (var i = 0; i < this.props.loteriesLength; i++) {
        items.push(
            <Card key={i} style={{ width: '18rem', marginTop: '1%' }}>
              <Card.Body>
              
              <Card.Subtitle className="mb-2 text-muted">Win : {this.props.LoteriesWin[i]}</Card.Subtitle>
              <Card.Text >
                Ceci pourrait être une description à rajouter dans le smart contract
              </Card.Text>
  
              <Button variant="primary" 
  
              // Ceci est une fonction anonyme, on la déclare à la volée sans lui donnée de de nom
              // Elle a un paterne async / await : Async permet de prévenir que certains traitements ne sont pas "instantannées" et doivent recevoir ce qu'on appelle une Promesse
              // Tout call fait à la Blockchain fait l'objet d'une promesse en attente, qui sera répondue rapidement.
              // await permet de définir, où dans la fonction, sera / seront, le ou les traitements asynchrones
              onClick={async () => {
                await this.props.loteryAbi.methods.participateToLotery(i).send({ from: this.props.account, value: 1000000000000000000})}}
                >Participate {i}!</Button>
              
              </Card.Body>
            </Card>
        )
      }
    }
    // Les props sont le state mais passé objet (cela se fait dans le main)
    
    
    // Ici on retourne les composants après traitements
    return (
    <>
    <div className="container"> 
      <div className="row">
        {items}
      </div>
    </div>   
    </>   
        
    );
  }
}

export default Lotery;

// 
