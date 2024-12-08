import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

const AboutPage = () => {
  return (
    <Container className="mt-5">
     
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <h2 className="fw-bold text-warning">Who We Are</h2>
          <p className="text-muted">
            We are a passionate team committed to driving change through
            innovation and collaboration. Our platform is designed to empower
            individuals and organizations to unlock their true potential.
          </p>
        </Col>
        <Col md={6}>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaKtfQ75Tgu7GSepkzd-r-MTj9L_hlyTFkcSOEIX_3H3-535-hV24MvOVbph0QHncBhKw&usqp=CAU"
            alt="Who We Are"
            fluid
            rounded
          />
        </Col>
      </Row>

      
      <Row className="text-center mb-5">
        <h2 className="fw-bold mb-4">Meet Our Team</h2>
        <Col md={4} sm={6} className="mb-4">
          <Card className="border-0">
            <Image
              src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
              alt="Jaime Lannister"
              roundedCircle
              fluid
              style={{ width: "100px", height: "100px", margin: "0 auto" }}
            />
            <Card.Body>
              <h5>Jithin</h5>
              <p className="text-muted">CEO</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={6} className="mb-4">
          <Card className="border-0">
            <Image
              src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369990.png"
              alt="Cersei Lannister"
              roundedCircle
              fluid
              style={{ width: "100px", height: "100px", margin: "0 auto" }}
            />
            <Card.Body>
              <h5>Rahul</h5>
              <p className="text-muted">CTO</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={6} className="mb-4">
          <Card className="border-0">
            <Image
              src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
              alt="Daenerys Targaryen"
              roundedCircle
              fluid
              style={{ width: "100px", height: "100px", margin: "0 auto" }}
            />
            <Card.Body>
              <h5>Praveen</h5>
              <p className="text-muted">Lead Designer</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
