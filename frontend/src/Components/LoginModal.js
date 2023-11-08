import React, { useState } from 'react';
import { Button, Form, Modal, InputGroup, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function LoginModal({ setShowLoginModla, showLoginModla, setUserSession }) {

  //states for login 
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      login: login,
      password: password
    };

    axios.post('http://localhost:5000/api/login', data, {withCredentials: true})
      .then((response) => {
        console.log(response)
        setUserSession(response.data)
        setShowLoginModla(false)
      })
      .catch((error) => {
        console.log('Error:', error.response.data);
        setLoginErrors(error.response.data);
      });
  };

  return (
    <Modal show={showLoginModla} onHide={() => setShowLoginModla(false)} centered>
      <Modal.Header className="d-flex justify-content-center pt-4">
        <Modal.Title >LOGOWANIE</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-4 pb-4">
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

          {loginErrors && (
            <Alert className="mt-3" variant="danger">
              <div>{loginErrors}</div>
            </Alert>
          )}

          <Button className="mt-3 col-12" variant="primary" type="submit ">
            Zaloguj się
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;