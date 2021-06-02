import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Nav,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";

function OrderScreen({ match, history }) {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  const addMercadoPagoScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (
      !order ||
      successPay ||
      order._id !== Number(orderId) ||
      successDeliver
    ) {
      dispatch({ type: "ORDER_PAY_RESET" });
      dispatch({ type: "ORDER_DELIVER_RESET" });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.mercadopago) {
        addMercadoPagoScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, history, userInfo, order, orderId, successPay, successDeliver]);

  const successPaymentHandler = () => {
    dispatch(payOrder(orderId));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Pedido nº {order._id}</h1>
      <Row>
        <Col md={9}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Entrega</h2>
              <p>
                <strong>Nome:</strong> {order.user.name}
              </p>
              <p>Telefone: {order.user.phone}</p>
              <p>
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                <strong>Endereço de Entrega: </strong>
                {order.address.endereço}, {order.address.bairro},{" "}
                {order.address.cidade}
                {"  "}
                {order.address.cep}
                {"  "}
                {order.address.complemento}
                {order.address.ponto}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Entregue no dia: {order.deliveredAt.replace(/-/g, "/")}
                </Message>
              ) : (
                <Message variant="warning">Entrega pendente</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Metódo de Pagamento</h2>
              <p>
                {order.paymentMethod === "Cartão"
                  ? "Cartão de Crédito/Débito"
                  : order.paymentMethod}
              </p>
              {order.paymentMethod === "Pix" && !order.isPaid && (
                <ListGroup as="h5" variant="flush">
                  <ListGroup.Item variant="flush">
                    Pague através do QR Code
                  </ListGroup.Item>
                  <Image
                    src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/imagem_2021-06-02_170048.png"
                    alt="pix"
                    width="250"
                    rounded
                  />
                  <ListGroup.Item
                    action
                    href="https://nubank.com.br/pagar/ox0ih/kWqwsslpx2"
                    target="_blank"
                    className="mb-3"
                  >
                    Ou através do Link
                  </ListGroup.Item>
                </ListGroup>
              )}
              {order.isPaid ? (
                <Message variant="success">
                  Pago em {order.paidAt.replace(/-/g, "/")}
                </Message>
              ) : (
                <Message className="my-3" variant="warning">
                  Pagamento pendente (Caso já esteja pago, envie o comprovante
                  de pagamente através do{" "}
                  <Alert.Link href="https://wa.me/message/3B7EYFQSVWKQO1">
                    WhatsApp
                  </Alert.Link>
                  )
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Produtos</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Pedido vazio</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            className="link"
                            to={`/product/${item.product}`}
                          >
                            {item.type === "U"
                              ? item.name
                              : `${item.name} (${item.variation})`}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x R$ {item.price.replace(".", ",")} = R${" "}
                          {(item.qty * item.price).toFixed(2).replace(".", ",")}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Resumo do Pedido</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Itens:</Col>
                  <Col>R$ {order.itemsPrice.replace(".", ",")}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Frete:</Col>
                  <Col>R$ {order.shippingPrice.replace(".", ",")}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>R$ {order.totalPrice.replace(".", ",")}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            {userInfo && userInfo.is_staff && !order.isPaid && (
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block"
                  onClick={successPaymentHandler}
                >
                  Marcar como Pago
                </Button>
              </ListGroup.Item>
            )}

            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.is_staff &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Marcar como Entregue
                  </Button>
                </ListGroup.Item>
              )}
          </Card>
        </Col>
      </Row>
      <script src="components/ProcessPayment.js"></script>
    </div>
  );
}

export default OrderScreen;
