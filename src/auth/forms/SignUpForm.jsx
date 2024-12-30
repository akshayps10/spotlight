import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/sign-up", { name, email, password })
      .then((result) => console.log(result))
      .catch((err) => setError("Error: Unable to register. Please try again."));
  };

  return (
    <Container className="mt-5 mb-10 bg-success bg-opacity-25">
      <Row className="justify-content-center">
        <Col xs={6} md={6}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
          
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

           
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            
            <Button type="submit" variant="danger" className="w-100 mb-3">
              Register
            </Button>

           
            {error && <p className="text-danger text-center">{error}</p>}

            
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpForm;
