import React from "react";
import { Row, Col, Card } from "react-bootstrap";

function Faq() {
  return (
    <div>
      <Row>
        <Col md={12}>
          <Card as="h1" className="text-danger text-center bg-primary my-5">
            <Card.Body>Breve</Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Faq;
