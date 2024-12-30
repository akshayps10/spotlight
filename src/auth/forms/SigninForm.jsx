import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with email:", email, "password:", password);
    axios.post("http://localhost:3001/sign-in", { email, password })
    .then(response => {
      if (response.data.status === "success") {
        localStorage.setItem("token", response.data.token); 
        navigate("/dashboard");
      } else {
        setError(response.data.message);
      }
    })
      
      .catch((err) => {
        console.error("Error during API call:", err);
        setError("An error occurred. Please try again later.");
      });
  };
  

  return (
    <Container className="mt-5 mb-10 bg-success bg-opacity-25">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
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

            {error && (
              <p className="text-danger text-center" aria-live="polite">
                {error}
              </p>
            )}

            <Button type="submit" variant="success " className="w-100 mb-3">
              Sign In
            </Button>

            <Link to="/sign-up">
              <Button variant="warning" className="w-100">
                Sign Up
              </Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInForm;
