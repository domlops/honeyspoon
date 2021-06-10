import React from "react";
import { Row, Col, Card } from "react-bootstrap";

function LogisticaScreen() {
  return (
    <div>
      <Row>
        <Col md={12}>
          <Card as="h1" className="text-danger text-center bg-primary my-5">
            <Card.Body>Logistica Reversa</Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <p>
            O Ministério do Meio Ambiente define que “a logística reversa é um
            instrumento de desenvolvimento econômico e social caracterizado por
            um conjunto de ações, procedimentos e meios destinados a viabilizar
            a coleta e a restituição […] “, calma! Esse tanto de palavras
            sofisticadas não são tudo isso que você imagina! Aqui nós vamos
            mostrar na prática como você pode fazer parte dessa logística e
            ainda ter várias vantagens
          </p>
          <p>
            Para que você possa comprar e consumir um produto, existe toda uma
            cadeia logística que extrai matéria prima, leva até a indústria,
            transforma tudo em um produto e o leva até o comércio, onde você
            pode comprá-lo. Depois de comprá-lo e consumi-lo, muitas vezes,
            resta algo. Este “algo” é chamado de resíduo e é uma coisa que não
            tem nenhuma utilidade para você. Mas nas mãos da pessoa certa isso
            pode ter muito valor.{" "}
          </p>
          <p>
            Aqui na loja, a maioria nos nossos produtos podem ser descartados
            diretamente no lixo reciclável, mas caso não haja coleta seletiva na
            sua região não se preocupe:{" "}
          </p>
          <h5>
            Devolvendo embalagens, produtos sem uso ou com vida útil findada, a
            gente faz o descarte adequado e você ainda ganha um vale desconto de
            5% para suas próximas compras (cumulativo com outras promoções)
          </h5>
          <p>
            Pra que o resíduo possa ser coletado basta estar higienizado, você
            pode juntar alguns e mandar pelo motoboy quando ele for fazer suas
            entregas. Então nada de jogar seus resíduos no lixo, combinado?
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default LogisticaScreen;
