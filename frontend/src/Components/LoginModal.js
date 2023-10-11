import React, { useState } from 'react';
import { Button, Form, Modal, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function MyModal() {
 const [show, setShow] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tutaj możesz dodać obsługę logowania, np. wysłanie danych na serwer
    handleClose();
  };
  
    return  (
        <>
          <Button variant="primary" onClick={handleShow}>
            Zaloguj się
          </Button>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Logowanie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3" data-bs-theme="dark">
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                  <Form.Control
                    className="placeholder-white"
                    type="text"
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                    data-bs-theme="dark"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text data-bs-theme="dark">
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <Form.Control
                    className="placeholder-white"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    data-bs-theme="dark"
                  />
                </InputGroup>
                <div class="text-center mt-2"><a href="">Forgot your password?</a></div>
                <Button className="mt-4 col-12" variant="primary" type="submit">
                  Zaloguj się
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      );
    }
  
  export default MyModal;