import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Product({ product }) {
  const formatPrice = (price) => {
    if (typeof price == "string") {
      return price.replace(".", ",");
    }
    if (typeof price == "number") {
      return price.toFixed(2).replace(".", ",");
    }
  };
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>

      <Card.Body>
        <Link className="text-center" to={`/product/${product._id}`}>
          <Card.Title>
            <h6>{product.name}</h6>
          </Card.Title>
        </Link>

        {product.countInStock < 1 ? (
          <Card.Text as="h3" className="text-center">
            Indisponível
          </Card.Text>
        ) : product.promo_price > 0 ? (
          <Card.Body>
            <Card.Text as="h4" className="text-center">
              <del>R$ {formatPrice(product.price)}</del>
            </Card.Text>

            <Card.Text as="h4" className="text-center">
              R$ {formatPrice(product.promo_price)}
            </Card.Text>
          </Card.Body>
        ) : (
          <Card.Text as="h3" className="text-center">
            R$ {formatPrice(product.price)}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
