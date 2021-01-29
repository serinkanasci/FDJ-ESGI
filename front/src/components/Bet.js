import React from 'react'; 
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Bet extends React.Component {

  render() {
    // VOtre mission si vous l'acceptez sera de faire afficher les paris si possible sur une autre page que les loteries
    // Il faudra aussi les générer de la même manière que les loteries 
    return (
    <>    
    
      <Card>
          <Card.Body>
            <Card.Title> Ceci est le titre de la carte</Card.Title>
            <Card.Subtitle> Ceci est le sous-titre de la carte</Card.Subtitle>
            <Card.Text >
              Ceci pourrait être une description à rajouter dans le smart contract
            </Card.Text>

            <Button> Pari de l'équipe A </Button>

            <Button> Pari de l'équipe B </Button>
            
            </Card.Body>
      </Card>
    </>         
    );
  }
}

export default Bet;