import React from "react";
import { Row, Card, Image } from "react-bootstrap";

function Papo() {
  return (
    <div>
      <div>
        <Row>
          <Image
            src="https://honeyspoon-bucket.s3.sa-east-1.amazonaws.com/papo-1.png"
            alt="1"
            fluid
          ></Image>
        </Row>
        <Row>
          <Card.Link
            href="https://api.whatsapp.com/message/3B7EYFQSVWKQO1?autoload=1&app_absent=0"
            target="_blank"
          >
            <Card.Img src="https://honeyspoon-bucket.s3.sa-east-1.amazonaws.com/papo-2.png" />
          </Card.Link>
        </Row>
      </div>
    </div>
  );
}

export default Papo;
