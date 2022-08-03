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
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CategoryBar from "../components/CategoryBar";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, listProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

function ProductScreen({ match, history }) {
  const productId = match.params.id;

  const [vary, setVary] = useState(0);
  const [add, setAdd] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const keyword = "/?search=essentials&page=1";

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, match, keyword, productId]);

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const addToCartHandler = () => {
    dispatch(addToCart(productId, vary));
    setAdd(true);
  };

  const formatPrice = (price) => {
    if (typeof price == "string") {
      return price.replace(".", ",");
    }
  };

  const excludeList = ["DOCES", "LINGERIES", "COLEÇÕES"];
  const checkCategory = () => excludeList.includes(product.category);

  return (
    <div>
      <Link to="/" className="text-danger btn btn-primary my-4 rounded">
        Voltar
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <CategoryBar />
          <Row className="mt-3 mx-1">
            <h3>{product.name}</h3>
          </Row>
          <Row className="mt-3">
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={7}>
              {product.variations.map((variation) => (
                <Card key={variation.id} className="rounded">
                  <Row>
                    <Col>
                      <Card.Img
                        src={variation.image}
                        style={{ width: "10rem" }}
                        className="ml-3"
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
                        <Card.Body>
                          <Card.Text as="h5" className="text-center">
                            <del>R$ {formatPrice(variation.price)}</del>
                          </Card.Text>

                          <Card.Text as="h5" className="text-center">
                            R$ {formatPrice(variation.promo_price)}
                          </Card.Text>
                        </Card.Body>
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
                              <option key={variation.remove_pin} value={index}>
                                {variation.name}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col>
                          <Button
                            onClick={addToCartHandler}
                            className="rounded text-danger btn-block"
                            disabled={
                              product.variations[vary].countInStock < 1
                                ? true
                                : false
                            }
                            type="button"
                          >
                            Comprar{" "}
                            <i className="fas fa-shopping-cart pr-1 text-danger"></i>
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
              <Card as="h3" className="rounded text-light bg-secondary mt-5">
                <Card.Body>Descrição</Card.Body>
              </Card>
            </Col>
            <Col id="lb" className="mx-3">
              <p className="mt-3">{product.description}</p>
              {checkCategory() || (
                <div>
                  <h5 className="text-danger">♡ Ficha Técnica ♡</h5>
                  <p>{product.ficha}</p>
                  <h5 className="text-danger">♡ Características ♡</h5>
                  <p>{product.carac}</p>
                  <h5 className="text-danger">♡ Como Usar ♡</h5>
                  <p>{product.como}</p>
                  <h5 className="text-danger">♡ Como Higienizar ♡</h5>
                  <p>{product.higiene}</p>
                  <h5 className="text-danger">♡ Cuidados e Precauções ♡</h5>
                  <p>{product.cuidados}</p>
                  <h5 className="text-danger">♡ Recomendações ♡</h5>
                  <p>{product.recomendacoes}</p>
                </div>
              )}
            </Col>
          </Row>
          {loading ? (
            <Loader />
          ) : (
            <div>
              <Row>
                <Col md={12}>
                  <Card
                    as="h3"
                    className="rounded text-light bg-secondary mt-5"
                  >
                    <Card.Body>Produtos Relacionados</Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row>
                {product.related.map((obj) => (
                  <Col key={obj._id} sm={4} md={4} lg={4} xl={4}>
                    <Product product={obj} />
                  </Col>
                ))}
              </Row>

              {product.category !== "Chocolates" && (
                <div>
                  <Row>
                    <Col md={12}>
                      <Card
                        as="h3"
                        className="rounded text-light bg-secondary mt-5"
                      >
                        <Card.Body>Essenciais</Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  <Row>
                    {products.map((product) => (
                      <Col key={product._id} sm={3} md={3} lg={3} xl={3}>
                        <Product product={product} />
                      </Col>
                    ))}
                  </Row>
                </div>
              )}

              <Row>
                <Col md={12}>
                  <Card
                    as="h3"
                    className="rounded text-light bg-secondary mt-5"
                  >
                    <Card.Body>Você Também Pode Gostar</Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row>
                {product.similar.map((obj) => (
                  <Col key={obj._id} sm={4} md={4} lg={4} xl={4}>
                    <Product product={obj} />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
