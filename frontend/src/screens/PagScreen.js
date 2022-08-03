import React from "react";
import { Row, Col, Card } from "react-bootstrap";

function Pag() {
  return (
    <div>
      <Row>
        <Col md={12}>
          <Card as="h1" className="text-danger text-center bg-primary my-5">
            <Card.Body>Formas de Pagamento</Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col className="mx-3">
          <p>
            Atualmente, para segurança (a sua e nossa), nenhuma forma de
            pagamento é automatizada em nosso site, dessa forma, você será
            redirecionade ao nosso Whatsapp para conclusão do pedido Nossas
            formas de pagamento são variadas, para que você consiga encontrar
            facilidade para pagar da forma que preferir
          </p>
          <ul>
            <li>Cartão de Crédito </li>
            <li>Pix</li>
            <li>Boleto Bancário</li>
          </ul>

          <h5 className="ml-3">Cartão de Crédito</h5>
          <p>
            Para pagar seu pedido usando o cartão de crédito, ao chegar na tela
            de pagamento, basta clicar na opção CARTÃO DE CRÉDITO. Ao clicar, o
            link vai te direcionar para o nosso whatsapp, onde você vai me dizer
            o número do pedido e receber o link de pagamento. A partir de R$100
            em produtos, você pode parcelar sua compra em até 5x SEM JUROS.
            (Consulte-nos para parcelas maiores e parcelamento de serviços Papo
            de Mel e Colmeia){" "}
          </p>
          <p>
            Seu pedido fica reservado por 48h aguardando o pagamento. Não sendo
            este identificado, a compra é cancelada.
          </p>

          <h5 className="ml-3">Pix</h5>

          <p>
            Para pagar por pix, basta selecionar a opção na tela de pagamento, a
            chave pix pode ser copiada e colada ou digitada no seu banco ou você
            pode ler o QR code que aparece na sua tela.{" "}
          </p>
          <p>
            Para que sua compra seja enviada mais rapidamente, envie o numero do
            seu pedido e o comprovante para o nosso Whatsapp (82 981314346) ou
            email (umacolherdemel@outlook.com). Precisamos que você envie porque
            são muitos pedidos e pode acontecer de duas ou mais compras terem o
            mesmo valor e temos que saber quem efetivamente pagou.{" "}
          </p>
          <p>
            Seu pedido fica reservado por 48h aguardando o pagamento. Não sendo
            este identificado, a compra é cancelada.
          </p>

          <h5 className="ml-3">Boleto</h5>
          <p>
            Essa opção é uma alternativa pra quem não quer/não pode transferir
            direto pra conta bancária ou pagar com o cartão de crédito. Porém,
            não é a mais interessante se você quer que seu pedido seja enviado
            com rapidez, pois o boleto pode levar até 72 horas úteis pra
            compensar (como qualquer boleto) e nós só enviamos com a confirmação
            de recebimento do valor pela instituição financeira (NuBank ou
            Mercado Pago). Normalmente, compensa no dia útil seguinte ao
            pagamento. De qualquer modo, pagar seu pedido por Boleto Bancário é
            bem simples. Na tela de pagamento, clique na opção BOLETO BANCÁRIO e
            em seguida, o site te direcionará para o nosso Whatsapp onde você só
            precisa informar o número do pedido para receber o seu boleto.
            Atente-se a data do vencimento e esteja ciente de que, se no dia
            útil seguinte a ela o pagamento não for identificado, o pedido será
            cancelado. Infelizmente não basta pagar e enviar o comprovante para
            nossa equipe, é imprescindível que aguarde a compensação do boleto.
            Isso é pela sua segurança e pela nossa também, porque do mesmo jeito
            que clientes estão suscetíveis a fraudes, infelizmente nós lojistas
            também estamos.{" "}
          </p>
          <p>
            Para pagamentos por Boleto Bancário, não há possibilidade de
            entrega/envio no mesmo dia!
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Pag;
