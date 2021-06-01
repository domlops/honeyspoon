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
        <Image
          className="d-block w-100"
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/1.svg"
          fluid="true"
        />
      </Carousel.Item>

      <Carousel.Item>
        <Link to="/?search=Vibradores&page=1">
          <Image
            className="d-block w-100"
            src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/2.svg"
            fluid="true"
          />
        </Link>
      </Carousel.Item>

      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/3.svg"
          fluid="true"
        />
      </Carousel.Item>

      <Carousel.Item>
        <Link to="/colmeia">
          <Image
            className="d-block w-100"
            src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/5.svg"
            fluid="true"
          />
        </Link>
      </Carousel.Item>

      <Carousel.Item>
        <Link to="/namorados">
          <Image
            className="d-block w-100"
            src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/4.svg"
            fluid="true"
          />
        </Link>
      </Carousel.Item>

      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/6.svg"
          fluid="true"
        />
      </Carousel.Item>

      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/7.svg"
          fluid="true"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
