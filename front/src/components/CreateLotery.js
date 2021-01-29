import React from 'react'; 
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class CreateLotery extends React.Component {

  render() {
    return (
    <div className="container">    
      <Form.Group className="m-4">
        
        <Form.Label>Créer une nouvelle loterie</Form.Label>
        <Form.Control
          label="Test"
          className="textFeedback"
          as="textarea"
          rows="2"
          
          placeholder="Entrez le nom d'une nouvelle loterie !"
       //   value={this.state.val}
       //   onChange={e => this.setState({ val: e.target.value })}
          type="text"
        />
        <Button
          className="btnFormSend"
          variant="outline-success"

          // Ceci est une fonction anonyme, on la déclare à la volée sans lui donnée de de nom
          // Elle a un paterne async / await : Async permet de prévenir que certains traitements ne sont pas "instantannées" et doivent recevoir ce qu'on appelle une Promesse
          // Tout call fait à la Blockchain fait l'objet d'une promesse en attente, qui sera répondue rapidement.
          // await permet de définir, où dans la fonction, sera / seront, le ou les traitements asynchrones
          // Problème à régler : Ici le nom de la loterie à ajouter doit être ce que l'on a dans le champ Form.Control et pas être écrit en dur
          onClick={async (e) => {
            e.preventDefault()
            await this.props.loteryAbi.methods.addLotery("Helder Test").send({ from: this.props.account })}}
          >
          Send Feedback
        </Button>
      </Form.Group>
    </div>         
    );
  }
}

export default CreateLotery;