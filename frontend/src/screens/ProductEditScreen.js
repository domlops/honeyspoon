import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { mask, unMask } from "remask";
import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  listProductDetails,
  updateProduct,
  createVariation,
  deleteVariation,
} from "../actions/productActions";
import { Categorias } from "../Lists";

function EditProductScreen({ match, history }) {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [promo_price, setPromo_price] = useState(0);
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [expire, setExpire] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [reload, setReload] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { error: errorUpdate, loading: loadingUpdate, success } = productUpdate;

  const variationCreate = useSelector((state) => state.variationCreate);
  const {
    loading: loadingVariation,
    error: errorVariation,
    success: successVariation,
    variation: createdVariation,
  } = variationCreate;

  const variationDelete = useSelector((state) => state.variationDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = variationDelete;

  const mExpire = (e) => {
    const original = unMask(e.target.value);
    const masked = mask(original, ["S/S", "SS/SS"]);
    setExpire(masked);
  };

  useEffect(() => {
    dispatch({ type: "VARIATION_CREATE_RESET" });

    if (success) {
      dispatch({ type: "PRODUCT_UPDATE_RESET" });
      dispatch(listProductDetails(productId));
    }

    if (successVariation) {
      setReload(false);
      console.log(reload);
      history.push(`/admin/product/${productId}/${createdVariation.id}/edit`);
    } else {
      if (product._id !== Number(productId) || !reload) {
        dispatch(listProductDetails(productId));
        setReload(true);
      } else {
        setName(product.name);
        setCategory(product.category);
        setPrice(product.price);
        setPromo_price(product.promo_price);
        setImage(product.image);
        setType(product.type);
        setExpire(product.expire);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [
    dispatch,
    product,
    productId,
    history,
    success,
    successVariation,
    successDelete,
    createdVariation,
    reload,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        category,
        price,
        type,
        expire,
        promo_price,
        image,
        countInStock,
        description,
      })
    );
  };

  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", productId);

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

  const createVariationHandler = (id) => {
    dispatch(createVariation(id));
  };

  const deleteHandler = (pk, id) => {
    if (window.confirm("Você tem certeza que deseja excluir essa variação?")) {
      dispatch(deleteVariation(pk, id));
      dispatch(listProductDetails(productId));
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <Link to="/admin/productlist" className="btn btn-outline-danger my-4">
            Voltar
          </Link>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3 text-danger"
            onClick={() => createVariationHandler(productId)}
          >
            <i className="fas fa-plus"></i> Adicionar Variação
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={5}>
          <h1>Editar Produto</h1>

          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

          {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}

          {loadingVariation && <Loader />}
          {errorVariation && (
            <Message variant="danger">{errorVariation}</Message>
          )}

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

              <Form.Group control="type">
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  as="select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="V">Variado</option>
                  <option value="U">Único</option>
                </Form.Control>
              </Form.Group>

              <Form.Group control="category">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                  as="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {Categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </Form.Control>
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

              <Form.Group control="expire">
                <Form.Label>Validade</Form.Label>
                <Form.Control
                  type="text"
                  value={expire}
                  onChange={mExpire}
                ></Form.Control>
              </Form.Group>

              <Form.Group control="description">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={9}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Col className="text-right">
                <Button className="text-danger" type="submit" variant="primary">
                  Atualizar
                </Button>
              </Col>
            </Form>
          )}
        </Col>
        <Col md={7}>
          <h1>Variações</h1>

          <Table striped bordered hover className="table-sm">
            <thead>
              <th className="text-center">Nome</th>
              <th className="text-center">Preço</th>
              <th className="text-center">P. Promocional</th>
              <th className="text-center">Estoque</th>
              <th></th>
            </thead>

            <tbody>
              {product.variations.map((variation) => (
                <tr>
                  <td className="text-center">{variation.name}</td>
                  <td className="text-center">{variation.price}</td>
                  <td className="text-center">{variation.promo_price}</td>
                  <td className="text-center">{variation.countInStock}</td>
                  <td className="text-center">
                    <LinkContainer
                      to={`/admin/product/${productId}/${variation.id}/edit`}
                    >
                      <Button id="dropdown-danger" className="btn-sm">
                        Editar
                      </Button>
                    </LinkContainer>
                    <Button
                      className="btn-sm"
                      variant="light"
                      onClick={() => {
                        deleteHandler(productId, variation.id);
                      }}
                    >
                      <i id="honey" className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default EditProductScreen;
