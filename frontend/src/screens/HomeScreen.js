import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import CategoryBar from "../components/CategoryBar";
import HomeCarousel from "../components/HomeCarousel";
import { listProducts } from "../actions/productActions";

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = history.location.search;
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {!keyword && <HomeCarousel />}
      <CategoryBar />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          {keyword === "?search=Bazar&page=1" && (
            <div>
              <Row>
                <Col md={12}>
                  <Card
                    as="h1"
                    className="text-danger text-center bg-primary my-5"
                  >
                    <Card.Body>Bazar</Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col class="text-center">
                  <h5>
                    O <em id="about-text">Bazar</em> é uma alternativa criada
                    por nós para que você possa ter um acesso mais barato a
                    alguns produtos e também para que a gente mantenha nossa
                    proposta de sermos mais ecológicos. Aqui você vai encontrar
                    algumas peças que a embalagem veio estragada, mas o produto
                    se mantém apto para uso (substituíremos por uma linda
                    embalagem, não se preocupe), produtos que violamos o lacre
                    para produzir algum conteúdo para o instagram, produtos com
                    pequenas avarias ou ultimas unidades que não voltarão para o
                    estoque. Leia a descrição do produto do seu interesse com
                    atenção, nela você encontrará o motivo para ele estar aqui
                    para que você possa adquirí-lo com consciência do que estará
                    sendo entregue. Aproveite!
                  </h5>
                </Col>
              </Row>
            </div>
          )}
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={6} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword}
            is_staff={false}
          />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
