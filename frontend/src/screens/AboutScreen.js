import React from "react";
import { Row, Col, Card } from "react-bootstrap";

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
        <Col className="mx-3">
          <p>
            Somos um espaço livre de julgamentos onde todes podem se expressar
            livremente e praticar o autoconhecimento de diversas formas.
            Existimos para quebrar tabus e levar informações sobre sexo e
            sexualidade, de forma livre, leve e aberta, e queremos ser cada vez
            mais um lugar seguro e inclusivo. O que mais nos motiva é saber que
            nem todas as pessoas conhecem a si mesmos e/ou tem liberdade para
            tratar sobre certos assuntos ou tirar algumas dúvidas sobre assuntos
            que é um direito delas e agora vemos como nosso dever. Queremos ser
            fonte de conhecimento, muito além de um sex shop.
          </p>
          <p>
            Pilares: confiança, conhecimento, comprometimento, profissionalismo,
            ética, segurança.
          </p>
          <p>
            Nascemos na mente de uma empreendedora que vendia lingeries com uma
            sacola, indo de porta em porta. Ela viu que o seu público também
            queria algo a mais, uns brinquedos, géis, e assim começou a vender
            produtos mais relacionados com sex shop que com uma loja de
            lingeries. Logo ela deixou de se chamar de “Lojinha da Mel” e passou
            a se chamar “Uma Colher de Mel”. Em 2019 a loja então se estabeleceu
            no Instagram, e sempre tivemos em mente o propósito de ser um
            ambiente livre de julgamentos e um local onde as pessoas pudessem se
            informar com segurança e consumir com consciência. Desde então nós
            estamos cada dia mais nos aprimorando e trazendo pra vocês qualidade
            em tudo que entregamos.
          </p>
          <p>Atualmente o Grupo Mel têm várias áreas de atuação: </p>
          <p>
            <em id="about-text">Uma Colher de Mel</em> - venda de produtos que
            passam por uma rigorosa curadoria e por vários testes, pensando no
            prazer, facilidade de uso e acesso e segurança de todos os nossos
            clientes. Nós selecionamos os produtos seguindo as normas de
            segurança da Anvisa e buscamos sempre marcas que conversem com os
            nossos valores e visão
          </p>
          <p>
            <em id="about-text">Papo de Mel</em> - prestação serviços como
            palestras, organizadora de eventos, mentoria e consultoria, sempre
            focando na privacidade, segurança e conforto dos clientes, cada
            serviço é analisado individualmente para suprir as demandas
            sugeridas.{" "}
          </p>
          <p>
            <em id="about-text">Colmeia</em> - um clube de assinatura mensal com
            produtos selecionados de acordo com cada cliente, se propõe a ser um
            serviço no qual o cliente confia em nossa seleção e recebe produtos
            surpresa para testar. A seleção é pautada em um formulário
            preenchido pelo cliente
          </p>
          <p>
            O nosso Instagram é o nosso principal canal de comunicação, e lá a
            gente produz muitos conteúdos sobre sexualidade, com embasamento
            científico ajudando muitas pessoas a se libertarem de vários tabus e
            aprenderam várias diquinhas pra melhorar o desempenho sexual Também
            pensamos sempre em entregar tudo de forma mais sustentável possível.
            Nossos ambientes de comunicação são seguros, discretos e sem nenhum
            tipo de julgamento, aqui todo mundo é bem vindo ❤
          </p>
          <h5>Valores</h5>
          <p>
            Sempre respeitar a diversidade das pessoas e valorizá-las como seres
            únicos, individuais e complexos e é isso as fazem especiais do mundo
            e tornam mudanças estruturais possível.
          </p>
          <h5>Missão</h5>
          <p>
            Garantir aos nossos clientes uma experiência de compra e diálogo com
            total liberdade e segurança. Nunca julgar nenhuma pessoa e
            principalmente ajudar a livrar amarras sociais relacionadas à sua
            sexualidade.
          </p>
          <h5>Visão</h5>
          <p>
            Ser uma marca reconhecida por falar sobre sexualidade abertamente e
            sempre atender os clientes de forma amistosa, descontraída e
            respeitosa, oferecendo sempre produtos de qualidade e preço justo.
          </p>
          <h5>Objetivos</h5>
          <p>
            Oferecer serviços que sejam prazerosos em todas as etapas, desde o
            primeiro contato com a Uma Colher de Mel até o seu uso final.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default About;
