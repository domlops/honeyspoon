import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart, addSameItem } from "../actions/cartActions";

function CartScreen({ match, location, history }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const removeFromCartHandler = (pin) => {
    dispatch(removeFromCart(pin));
  };
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const totalPrice = cartItems
    .reduce(
      (acc, item) =>
        acc +
        item.qty *
          (item.variation.promo_price > 0
            ? item.variation.promo_price
            : item.variation.price),
      0
    )
    .toFixed(2);

  const honeyPrice = (totalPrice - totalPrice * 0.1).toFixed(2);
  const honeyFirstPrice = (totalPrice - totalPrice * 0.2).toFixed(2);

  return (
    <Row>
      <Col md={8}>
        <h1>Carrinho de Compras</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Seu carrinho está vazio. <Link to="/">Voltar</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item, index) => (
              <ListGroup.Item key={item.variation}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.variation.image}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link className="link" to={`/product/${item.product}`}>
                      {item.name} ({item.variation.name})
                    </Link>
                  </Col>
                  <Col md={2}>
                    R${" "}
                    {item.variation.promo_price > 0
                      ? item.variation.promo_price
                      : item.variation.price}
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addSameItem(
                            item.product,
                            item.index,
                            Number(e.target.value)
                          )
                        )
                      }
                    >
                      {[...Array(item.variation.countInStock).keys()].map(
                        (x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() =>
                        removeFromCartHandler(item.variation.remove_pin)
                      }
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal</h2>
              <h4>
                {cartItems.reduce((acc, item) => acc + item.qty, 0) > 1
                  ? `(${cartItems.reduce(
                      (acc, item) => acc + item.qty,
                      0
                    )} Itens)`
                  : `(${cartItems.reduce(
                      (acc, item) => acc + item.qty,
                      0
                    )} Item)`}
              </h4>
              <h4>
                R${" "}
                {userInfo
                  ? userInfo.is_honey_first
                    ? `${totalPrice}
                  - 20%
                   = R$ ${honeyFirstPrice.replace(".", ",")}`
                    : userInfo.is_honey
                    ? `${totalPrice}
                  - 10%
                   = R$ ${honeyPrice.replace(".", ",")}`
                    : totalPrice.replace(".", ",")
                  : totalPrice.replace(".", ",")}{" "}
              </h4>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Finalizar a Compra
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
