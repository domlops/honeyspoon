import React, { useRef } from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import CategoryBar from "../components/CategoryBar";
import { Colmeia } from "../Lists";

function ColmeiaScreen() {
  const myRef = useRef(null);

  const scrollDown = () => myRef.current.scrollIntoView({ behavior: "smooth" });

  return (
    <div>
      <CategoryBar />
      <Row>
        <Col md={12}>
          <Button
            as="h2"
            className="btn-block text-danger my-2"
            onClick={scrollDown}
          >
            Assine Já!
          </Button>
        </Col>
        <Image
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/colmeia3.png"
          alt="intro"
          fluid
        />
      </Row>
      <Row className="my-4">
        <Image
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/colmeia4.png"
          alt="intro"
          fluid
        />
      </Row>

      <Row>
        <Col md={12}>
          <Card as="h3" className="text-danger bg-primary my-3">
            <Card.Body className="text-center">Escolha seu plano</Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="my-4">
        <Image
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/colmeia1.png"
          alt="intro"
          fluid
        />
      </Row>
      <Row className="my-4">
        <Image
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/colmeia2.png"
          alt="intro"
          fluid
        />
      </Row>
      <Row className="my-4">
        <Image
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/colmeia5.png"
          alt="intro"
          fluid
        />
      </Row>
      <Row className="my-4">
        <Image
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/colmeia6.png"
          alt="intro"
          fluid
        />
      </Row>
      <Row className="my-4">
        <Image
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/colmeia7.png"
          alt="intro"
          fluid
        />
      </Row>
      <Row>
        <Col md={12}>
          <Card as="h3" className="text-danger bg-primary my-3">
            <Card.Body className="text-center">
              Pólen do Mês de Agosto
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-4">
        <Image
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/colmeia8.png"
          alt="intro"
          fluid
        />
      </Row>
      <Row>
        <h6>
          * Produtos sujeitos a disponibilidade de estoque. Em caso de
          indisponibilidade, o produto será substituido por um de igual valor ou
          função.
        </h6>
      </Row>

      <Row>
        <Col md={12}>
          <Card as="h3" className="text-danger bg-primary my-3">
            <Card.Body className="text-center">Assine Aqui</Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-md-center" ref={myRef}>
        {Colmeia.map((categoria) => (
          <Col key={categoria.name} sm={6} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded">
              <Card.Body>
                <Card.Title as="h3" className="text-danger text-center">
                  {categoria.name}
                </Card.Title>

                <Card.Text as="h3" className="text-center">
                  R$ {categoria.price}
                  <h5>/ mês</h5>
                </Card.Text>

                {categoria.disc && (
                  <Card.Text as="h6" className="text-center">
                    {categoria.disc}
                  </Card.Text>
                )}

                <Card.Text as="h6" className="text-center">
                  {categoria.description}
                </Card.Text>
              </Card.Body>

              <Button
                href={categoria.link}
                target="_blank"
                className="text-danger"
              >
                ASSINE JÁ
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <h6 className="text-center">
        *O pagamento será concluido através do site do Mercado Pago
      </h6>
    </div>
  );
}

export default ColmeiaScreen;
