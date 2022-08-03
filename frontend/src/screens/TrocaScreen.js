import React from "react";
import { Row, Col, Card } from "react-bootstrap";

function TrocaScreen() {
  return (
    <div>
      <Row>
        <Col md={12}>
          <Card as="h1" className="text-danger text-center bg-primary my-5">
            <Card.Body>Politica de Troca</Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="mx-3">
          <p>
            Oi Bee, aqui vamos conversar um pouco sobre nossa política de troca.
            Nós da Uma Colher de Mel conferimos todos os produtos pra garantir
            que eles cheguem perfeitos pra você! Mas alguns produtos vem
            completamente lacrados e aí a gente não tem como conferir, né?! Em
            caso do seu produto vir com defeito de fábrica, apresentar mal
            funcionamento ou você simplesmente não gostou do que comprou, entra
            em contato com a gente pra que possamos te ajudar.
          </p>
          <p>De acordo com o Código de Defesa do Consumidor:</p>
          <h5>Caso haja defeitos:</h5>
          <p>
            A troca poderá acontecer em até no máximo 30 dias após o dia da
            compra. Será avaliado o estado geral do produto para que possamos
            garantir o estorno ou a troca;
          </p>
          <h5>Caso haja desistência ou arrependimento:</h5>
          <p>
            A troca poderá acontecer em até no máximo 7 dias. Será avaliado o
            estado geral do produto para que possamos garantir o estorno ou a
            troca.
          </p>
          <p>
            Qualquer dúvida entra em contato com a gente, estamos sempre
            disponíveis para te atender &#10084;
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default TrocaScreen;
