import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CategoryBar from "../components/CategoryBar";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

function ProductScreen({ match, history }) {
  const productId = match.params.id;

  const [vary, setVary] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [add, setAdd] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReview,
    error: errorReview,
    success,
  } = productReviewCreate;

  useEffect(() => {
    if (success) {
      setRating(0);
      setComment("");
      dispatch({ type: "PRODUCT_CREATE_REVIEW_RESET" });
    }

    dispatch(listProductDetails(productId));
  }, [dispatch, match, success, productId]);

  const addToCartHandler = () => {
    dispatch(addToCart(productId, vary));
    setAdd(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
  };

  const formatPrice = (price) => {
    if (typeof price == "string") {
      return price.replace(".", ",");
    }
  };

  console.log(vary);

  return (
    <div>
      <Link to="/" className="text-danger btn btn-primary my-4">
        Voltar
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <CategoryBar />
          <Row className="mt-5">
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={7}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`de ${product.numReviews} avaliações`}
                    color={"#eea9ad"}
                  />
                </ListGroup.Item>
              </ListGroup>
              {product.variations.map((variation) => (
                <Card key={variation.id} className="rounded">
                  <Row>
                    <Col>
                      <Card.Img
                        src={variation.image}
                        style={{ width: "10rem" }}
                      />
                    </Col>
                    <Col key={variation.name}>
                      <Card.Title as="h5" className="text-center my-3">
                        {variation.name}
                      </Card.Title>
                      {variation.countInStock < 1 ? (
                        <Card.Text className="text-center" as="h5">
                          Indisponível
                        </Card.Text>
                      ) : variation.promo_price > 0 ? (
                        <Card.Text id="lb" className="text-center" as="h5">
                          de <del>R$ {formatPrice(variation.price)}</del>
                          <h5>Por R$ {formatPrice(variation.promo_price)}</h5>
                        </Card.Text>
                      ) : (
                        <Card.Text id="lb" as="h5" className="text-center">
                          R$ {formatPrice(variation.price)}
                        </Card.Text>
                      )}
                    </Col>
                  </Row>
                </Card>
              ))}
              <Card className="rounded">
                <Col>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <Form.Control
                            as="select"
                            value={vary}
                            onChange={(e) => setVary(e.target.value)}
                          >
                            {product.variations.map((variation, index) => (
                              <option key={variation.name} value={index}>
                                {variation.name}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col>
                          <Button
                            onClick={addToCartHandler}
                            className="text-danger btn-block"
                            disabled={
                              product.variations[vary].countInStock < 1
                                ? true
                                : false
                            }
                            type="button"
                          >
                            Adicionar ao Carrinho
                          </Button>
                        </Col>
                      </Row>
                      {add && (
                        <Message className="my-3" variant="success">
                          Produto Adicionado com Sucesso!
                        </Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card as="h3" className="text-danger bg-primary my-5">
                <Card.Body>Descrição</Card.Body>
              </Card>
            </Col>
            <Col id="lb" className="mx-3">
              <p>{product.description}</p>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Card as="h3" className="text-danger bg-primary my-5">
                <Card.Body>Avaliações dos Clientes</Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mt-4">
              {product.reviews.length === 0 && (
                <Message variant="info">
                  Esse produto ainda não foi avaliado
                </Message>
              )}

              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <p>
                      ({review.createdAt.substring(0, 10).replace(/-/g, "/")})
                    </p>
                    <Rating value={review.rating} color="#eea9ad" />

                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h4>Deixe a sua avaliação</h4>

                  {loadingReview && <Loader />}
                  {success && (
                    <Message variant="success">Avaliação submetida</Message>
                  )}
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Nota</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Selecione...</option>
                          <option value="1">1 - Fraco</option>
                          <option value="2">2 - Funciona</option>
                          <option value="3">3 - Bom</option>
                          <option value="4">4 - Muito Bom</option>
                          <option value="5">5 - Excelente!</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment">
                        <Form.Label>Avaliação</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        disabled={loadingReview}
                        className="text-danger"
                        type="submit"
                        variant="primary"
                      >
                        Enviar
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      <Link to="/login">Entre</Link> para poder deixar sua
                      avaliação
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
