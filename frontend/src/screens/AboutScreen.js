import React from "react";
import { Row, Col, Image, Button, Card } from "react-bootstrap";

function About() {
  return (
    <div>
      <Row>
        <Col md={12}>
          <Card as="h1" className="text-danger text-center bg-primary my-5">
            <Card.Body>Sobre Nós</Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <p>
            A <em id="about-text">Uma Colher de Mel</em> surgiu em 2019 com o
            propósito de quebrar tabus sociais, através da venda e produção de
            conteúdos relacionados à sexualidade. Desde então nós estamos cada
            dia mais nos aprimorando e trazendo pra vocês qualidade em tudo que
            entregamos.
          </p>
          <p>Atualmente temos várias áreas de atuação:</p>
          <p>
            <em id="about-text">Sexshop</em> - nossos produtos são selecionados
            carinhosamente, pensando no prazer e segurança de todos os nossos
            clientes, nós selecionamos os produtos seguindo as normas de
            segurança da Anvisa e buscamos sempre marcas que sejam responsáveis.
          </p>
          <p>
            <em id="about-text">Master love</em> - Fazemos atendimento
            personalizado para ajudar pessoas a resolver problemas internos com
            a sexualidade e/ou relacionamentos. Buscando ajudar pessoas a terem
            mais autonomia, confiança e muito autoconhecimento.
          </p>
          <p>
            <em id="about-text">Colmeia</em> - É o nosso mais novo serviço, nele
            é possível fazer assinatura mensal de uma caixa cheia dos nossos
            produtos completamente personalizados de acordo com o perfil de cada
            cliente
          </p>
          <p>
            O nosso Instagram é o nosso principal canal de comunicação, e lá a
            gente produz muitos conteúdos sobre sexualidade, com embasamento
            científico ajudando muitas pessoas a se libertarem de vários tabus e
            aprenderam várias diquinhas pra melhorar o desempenho sexual
          </p>
          <p>
            Também pensamos sempre em entregar tudo de forma mais sustentável
            possível. Nossos ambientes de comunicação são seguros, discretos e
            sem nenhum tipo de julgamento, aqui todo mundo é bem vindo &#10084;{" "}
          </p>
          <h5>Valores</h5>
          <p>
            Sempre respeitar a diversidade das pessoas e valorizá-las como seres
            únicos, individuais e complexos e é isso as fazem especiais do mundo
            e tornam mudanças estruturais possível.
          </p>
          <h5>Missão</h5>
          <p>
            Garantir aos nossos clientes uma experiência de compra com total
            liberdade e segurança. Nunca julga nenhuma pessoa e principalmente
            ajudar a livrar amarras sociais relacionadas à sua sexualidade.
          </p>
          <h5>Visão</h5>
          <p>
            Ser uma marca reconhecida por falar sobre sexualidade abertamente e
            sempre atender os clientes de forma amistosa, descontraída e
            humanizada, oferecendo sempre produtos de qualidade e preço justo.
          </p>
          <h5>Objetivos</h5>
          <p>
            Crescer como marca visando tornar-se referência no mercado erótico
            digital.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default About;
