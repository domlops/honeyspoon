import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>

      <Card.Body>
        <Link className="link text-center" to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3 text-center">
            <Rating value={product.rating} color={"#eea9ad"} />
            <p className="text-center">de {product.numReviews} avaliações</p>
          </div>
        </Card.Text>
        {product.countInStock < 1 ? (
          <Card.Text as="h3" className="text-center">
            Indisponível
          </Card.Text>
        ) : product.promo_price > 0 ? (
          <Card.Body>
            <Card.Text as="h4" className="text-center">
              <del>R$ {product.price.replace(".", ",")}</del>
              
            </Card.Text>

            <Card.Text as="h4" className="text-center">
              R$ {product.promo_price.replace(".", ",")}
              
            </Card.Text>
          </Card.Body>
        ) : (
          <Card.Text as="h3" className="text-center">
            R$ {product.price.replace(".", ",")}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
