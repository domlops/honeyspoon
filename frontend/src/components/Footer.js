import React from "react";
import { Card, Container, Row, Col, CardGroup } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <Container className="justify-content-md-center">
        <CardGroup>
          <Card
            className="text-white bg-primary p-3"
            style={{ width: "20rem" }}
          >
            <Card.Title id="footer-p">Institucional</Card.Title>
            <Card.Text></Card.Text>
            <Card.Link className="text-danger" href="#/inst/about">
              Sobre Nós
            </Card.Link>
            <Card.Text></Card.Text>
            <Card.Link className="text-danger" href="#/inst/troca">
              Politica de Troca
            </Card.Link>
            <Card.Text></Card.Text>
            <Card.Link className="text-danger" href="#/inst/logistica">
              Logistica Reversa
            </Card.Link>
          </Card>

          <Card
            bg="primary"
            className="text-white p-3"
            style={{ width: "20rem" }}
          >
            <Card.Title id="footer-p">Informações Úteis</Card.Title>
            <Card.Text></Card.Text>
            <Card.Link className="text-danger" href="#/info/entrega">
              Fretes e Entrega
            </Card.Link>
            <Card.Text></Card.Text>
            <Card.Link className="text-danger" href="#/info/faq">
              Dúvidas Frequentes
            </Card.Link>
            <Card.Text></Card.Text>
            <Card.Link className="text-danger" href="#/info/pag">
              Formas de Pagamento
            </Card.Link>
          </Card>

          <Card
            className="text-white bg-primary p-3"
            style={{ width: "20rem" }}
          >
            <Card.Title id="footer-p">Fale Conosco</Card.Title>
            <Card.Text></Card.Text>
            <Card.Link
              className="text-danger"
              href="https://www.instagram.com/_umacolherdemel/"
              target="_blank"
            >
              Instagram
            </Card.Link>
            <Card.Text></Card.Text>
            <Card.Link
              className="text-danger"
              href="https://wa.me/message/3B7EYFQSVWKQO1"
              target="_blank"
            >
              WhatsApp
            </Card.Link>
            <Card.Text></Card.Text>
            <Card.Link
              className="text-danger"
              href="https://t.me/grupoumacolherdemel"
              target="_blank"
            >
              Telegram
            </Card.Link>
          </Card>
        </CardGroup>

        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Uma Colher de Mel
            <h6 className="my-2">Feito por Domenico Lopes</h6>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
