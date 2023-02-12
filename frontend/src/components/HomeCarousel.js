import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";

function HomeCarousel() {
  return (
    <Carousel pause="hover" className="bg-dark">
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/1.svg"
          fluid="true"
        />
      </Carousel.Item>

      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/2.svg"
          fluid="true"
        />
      </Carousel.Item>

      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/3.svg"
          fluid="true"
        />
      </Carousel.Item>

      <Carousel.Item>
        <Link to="/?search=new&page=1">
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
          src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/5.svg"
          fluid="true"
        />
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
