import React, { useState } from 'react';
import { Button, Form, Modal, InputGroup, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function MyModal() {
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(['Złe hasło', 'Zła nazwa']);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      login: login,
      password: password
    };

    console.log("Login:"+data.login);
    console.log("Password:"+data.password);

    axios.post('http://localhost:5000/api/login', data)
      .then((response) => {
        console.log('Response:', response.data);
        handleClose();
      })
      .catch((error) => {
        console.log('Error:', error);
        setErrors(error);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Zaloguj się
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>LOGOWANIE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
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
                
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text >
                <FontAwesomeIcon icon={faLock} />
              </InputGroup.Text>
              <Form.Control
                className="placeholder-white"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                
              />
            </InputGroup>
            <div className="text-center mt-2"><a href="">Forgot your password?</a></div>
            {errors.length > 0 && (
              <Alert className="mt-3" variant="danger" >
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </Alert>
            )}
            <Button className="mt-1 col-12" variant="primary" type="submit">
              Zaloguj się
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MyModal;