import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder, checkCoupon } from "../actions/orderActions";

function PlaceOrderScreen({ history }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [cupom, setCupom] = useState("");
  const [observation, setObservation] = useState("");

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, loading, success } = orderCreate;

  const coupon = useSelector((state) => state.coupon);
  const { error: couponError, success: couponSuccess } = coupon;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  cart.itemsPrice = cart.cartItems
    .reduce(
      (acc, item) =>
        acc +
        (item.variation.promo_price > 0
          ? item.variation.promo_price
          : item.variation.price) *
          item.qty,
      0
    )
    .toFixed(2);

  if (cart.shippingAddress.cidade === "Maceió") {
    cart.shippingPrice =
      cart.itemsPrice > 150 ? (0).toFixed(2) : (10).toFixed(2);
  } else {
    cart.shippingPrice = (15).toFixed(2);
  }
  cart.totalPrice = userInfo.is_honey_first
    ? (
        Number(cart.itemsPrice) -
        Number(cart.itemsPrice) * 0.2 +
        Number(cart.shippingPrice)
      ).toFixed(2)
    : (
        Number(cart.itemsPrice) -
        Number(cart.itemsPrice) * 0.1 +
        Number(cart.shippingPrice)
      ).toFixed(2);

  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: "ORDER_CREATE_RESET" });
    }
  }, [dispatch, order, success, history]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
        observation,
      })
    );
  };

  const formatPrice = (price) => {
    if (typeof price == "string") {
      return price.replace(".", ",");
    }
  };

  const sendCoupon = (c) => {
    dispatch(checkCoupon({ coupon: c }));
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Entrega</h2>
              <p>
                <strong>Endereço de Entrega: </strong>
                {cart.shippingAddress.endereço}, {cart.shippingAddress.bairro},{" "}
                {cart.shippingAddress.cidade}
                {"  "}
                {cart.shippingAddress.cep}
                {"  "}
                {cart.shippingAddress.complemento}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Metódo de Pagamento</h2>
              <p>
                {cart.paymentMethod === "Cartão"
                  ? "Cartão de Crédito/Débito"
                  : cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Produtos</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Seu carrinho está vazio</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.variation.image}
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
                            {item.name} ({item.variation.name})
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x R${" "}
                          {item.variation.promo_price > 0
                            ? item.variation.promo_price
                            : item.variation.price}{" "}
                          = R${" "}
                          {(
                            item.qty *
                            (item.variation.promo_price > 0
                              ? item.variation.promo_price
                              : item.variation.price)
                          )
                            .toFixed(2)
                            .replace(".", ",")}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Resumo do Pedido</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Itens:</Col>
                  <Col>R$ {formatPrice(cart.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Desconto:</Col>
                  <Col>{userInfo.is_honey_first ? "- 20%" : "-10%"}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Frete:</Col>
                  <Col>R$ {formatPrice(cart.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>R$ {formatPrice(cart.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      className="fill"
                      placeholder="Insira seu cupom"
                      value={cupom}
                      onChange={(e) => setCupom(e.target.value)}
                    ></Form.Control>{" "}
                  </Col>
                  <Col>
                    <Button
                      type="button"
                      className=" text-danger"
                      onClick={() => sendCoupon(cupom)}
                      disabled={couponSuccess ? true : false}
                    >
                      Enviar
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
                <Button
                  type="button"
                  className="btn-block text-danger"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
                >
                  Finalizar Pedido
                </Button>
                {loading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <Form.Group control="description">
            <Form.Label>Observações</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={observation}
              placeholder="Tem alguma observação para o seu pedido?"
              onChange={(e) => setObservation(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {couponError && <Message variant="danger">{couponError}</Message>}
          {couponSuccess && (
            <Message variant="success">Cupom Inserido com Sucesso</Message>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
