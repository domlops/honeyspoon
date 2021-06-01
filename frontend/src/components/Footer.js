import React from "react";
import { Card, Container, Row, Col, CardGroup } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <Container>
        <CardGroup>
          <Card
            className="text-white bg-primary p-3"
            style={{ width: "20rem" }}
          >
            <Card.Title id="footer-p">Institucional</Card.Title>
            <Card.Text></Card.Text>
            <Card.Link className="link" href="/inst/about">
              Sobre Nós
            </Card.Link>
            <Card.Text></Card.Text>
            <Card.Link className="link" href="/inst/troca">
              Politica de Troca
            </Card.Link>
            <Card.Text></Card.Text>
            <Card.Link className="link" href="/inst/logistica">
              Logistica Reversa
            </Card.Link>
          </Card>

          <Card
            className="text-white bg-primary p-3"
            style={{ width: "20rem" }}
          >
            <Card.Title id="footer-p">Videos</Card.Title>
            <Card.Text></Card.Text>
            <Card.Link className="link" href="" target="_blank">
              Falando sobre coletor menstrual
            </Card.Link>
            <Card.Text></Card.Text>
            <Card.Link
              className="link"
              href="https://www.instagram.com/tv/CDPbmhbp4VT/?utm_medium=copy_link"
              target="_blank"
            >
              Não use comida!
            </Card.Link>
            <Card.Text></Card.Text>
            <Card.Link
              className="link"
              href="https://www.instagram.com/tv/CCt_2-5pXTO/?utm_medium=copy_link"
              target="_blank"
            >
              Como limpar seu sextoy
            </Card.Link>
          </Card>

          <Card
            className="text-white bg-primary p-3"
            style={{ width: "20rem" }}
          >
            <Card.Title id="footer-p">Fale Conosco</Card.Title>
            <Card.Text></Card.Text>
            <Card.Link
              className="link"
              href="https://www.instagram.com/_umacolherdemel/"
              target="_blank"
            >
              Instagram
            </Card.Link>
            <Card.Text></Card.Text>
            <Card.Link
              className="link"
              href="https://wa.me/message/3B7EYFQSVWKQO1"
              target="_blank"
            >
              WhatsApp
            </Card.Link>
            <Card.Text></Card.Text>
            <Card.Link
              className="link"
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
