import React from "react";
import { Row, Col, Card } from "react-bootstrap";

function Entrega() {
  return (
    <div>
      <Row>
        <Col md={12}>
          <Card as="h1" className="text-danger text-center bg-primary my-5">
            <Card.Body>Fretes e Entregas</Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col className="mx-3">
          <p>
            Atualmente, nós trabalhamos com entregas para Maceió-AL e cidades
            adjacentes (Rio Largo, Satuba, Santa Luzia do Norte), com entrega em
            até 2 dias úteis*. Com valor de frete fixo de R$15 para bairros de
            Maceió e R$20 para cidades adjacentes
          </p>
          <p>
            A entrega será realizada por mim e/ou pelo Domenico (sempre será
            informado antes), garantindo que o seu pedido seja entregue de forma
            sigilosa.
          </p>
          <p>
            * Em casos de promoções, eventos, lançamentos o prazo de entrega
            pode ser alterado, mediante informações prévias
          </p>
          <h5>Frete Grátis</h5>
          <p>
            Em pedidos acima de R$100 para Maceió o valor de frete fica grátis,
            com data de entrega a combinar
          </p>
          <p>
            Também é possível combinar com a gente um local para retirada
            gratuita ou com valor de frete reduzido. Temos pontos fixos em
            alguns bairros, mas precisamos combinar direitinho antes pra esse
            método funcionar bem, tá?!
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Entrega;
