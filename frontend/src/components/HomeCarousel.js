import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

function HomeCarousel() {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      <Carousel.Item>
        <Link to="#">
          <Image className="d-block w-100" src="/images/1.svg" fluid="true" />
        </Link>
      </Carousel.Item>

      <Carousel.Item>
        <Link to="#">
          <Image className="d-block w-100" src="images/2.svg" fluid="true" />
        </Link>
      </Carousel.Item>

      <Carousel.Item>
        <Link to="#">
          <Image className="d-block w-100" src="images/5.svg" fluid="true" />
        </Link>
      </Carousel.Item>

      <Carousel.Item>
        <Link to="#">
          <Image className="d-block w-100" src="images/4.svg" fluid="true" />
        </Link>
      </Carousel.Item>

      <Carousel.Item>
        <Link to="#">
          <Image className="d-block w-100" src="images/6.svg" fluid="true" />
        </Link>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
