import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import {
  listVariationDetails,
  updateVariation,
} from "../actions/productActions";

function VariationEditScreen({ match, history }) {
  const variationId = match.params.pk;
  const productId = match.params.id;
  const id = productId;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [promo_price, setPromo_price] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const variationDetails = useSelector((state) => state.variationDetails);
  const { error, loading, variation } = variationDetails;

  const variationUpdate = useSelector((state) => state.variationUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success,
  } = variationUpdate;

  useEffect(() => {
    if (success) {
      dispatch({ type: "VARIATION_UPDATE_RESET" });
      history.push(`/admin/product/${variation.product}/edit`);
    }

    if (variation.id != Number(variationId)) {
      dispatch(listVariationDetails(productId, variationId));
    } else {
      setName(variation.name);
      setPrice(variation.price);
      setPromo_price(variation.promo_price);
      setImage(variation.image);
      setCountInStock(variation.countInStock);
    }
  }, [dispatch, variation, productId, variationId, history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateVariation(productId, {
        id: variationId,
        name,
        price,
        promo_price,
        image,
        countInStock,
      })
    );
  };

  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", productId);
    formData.append("variation_id", variationId);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <div>
      <Link
        to={`/admin/product/${productId}/edit`}
        className="btn btn-outline-danger my-4"
      >
        Voltar
      </Link>

      <FormContainer>
        <h1>Editar Variação</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group control="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="name"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group control="image">
              <Form.Label>Imagem</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Escolher Arquivo"
                custom
                onChange={uploadHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group control="price">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                placeholder="Preço"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group control="promo-price">
              <Form.Label>Preço Promocional</Form.Label>
              <Form.Control
                type="number"
                placeholder="Preço"
                value={promo_price}
                onChange={(e) => setPromo_price(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group control="countinstock">
              <Form.Label>Estoque</Form.Label>
              <Form.Control
                type="number"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Col className="text-right">
              <Button className="text-danger" type="submit" variant="primary">
                Atualizar
              </Button>
            </Col>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default VariationEditScreen;
