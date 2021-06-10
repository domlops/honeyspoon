import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import CategoryBar from "../components/CategoryBar";
import { listProducts } from "../actions/productActions";

function InCicloScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts("/?search=Inciclo&page=1"));
  }, [dispatch]);
  return (
    <div>
      <CategoryBar />
      <Row className="my-4">
        <Image
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/inciclo-1.svg"
          alt="1"
          fluid
        />
      </Row>

      <Row className="my-4">
        <Image
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/inciclo-2.svg"
          alt="2"
          fluid
        />
      </Row>

      <Row className="my-4">
        <Image
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/inciclo-3.svg"
          alt="3"
          fluid
        />
      </Row>

      <Row className="my-4">
        <Image
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/inciclo-4.svg"
          alt="4"
          fluid
        />
      </Row>

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
            keyword={"/?search=Inciclo&page=1"}
            is_staff={false}
          />
        </div>
      )}
    </div>
  );
}

export default InCicloScreen;
