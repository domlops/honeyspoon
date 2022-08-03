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
    !keyword
      ? dispatch(listProducts("/?search=home&page=1"))
      : dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {!keyword && (
        <div>
          <Col md={12}>
            <Card className="text-danger bg-primary my-2 rounded">
              <Card.Link
                href="https://api.whatsapp.com/message/3B7EYFQSVWKQO1?autoload=1&app_absent=0"
                target="_blank"
              >
                <Card.Img src="https://honeyspoon-bucket.s3.sa-east-1.amazonaws.com/(82)+9+8131+4346.png" />
              </Card.Link>
            </Card>
          </Col>
          <HomeCarousel />
          <Col md={12}>
            <Card as="h3" className="text-danger bg-primary my-2 rounded">
              <Card.Img src="https://honeyspoon-bucket.s3.sa-east-1.amazonaws.com/barra.png" />
            </Card>
          </Col>
        </div>
      )}
      <CategoryBar />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
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
