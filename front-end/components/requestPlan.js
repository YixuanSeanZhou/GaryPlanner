import {Modal, Button, Form} from 'react-bootstrap'

export default function Request(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Request New Four Year Plan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }