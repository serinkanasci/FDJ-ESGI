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