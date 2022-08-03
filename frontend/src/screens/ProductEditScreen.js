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
  listProductAdmin,
  updateProduct,
  createVariation,
  deleteVariation,
} from "../actions/productActions";
import { novasCategorias } from "../Lists";

function EditProductScreen({ match, history }) {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [sub_categories, setSubCategory] = useState([]);
  const [price, setPrice] = useState(0);
  const [promo_price, setPromo_price] = useState(0);
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [expire, setExpire] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [ficha, setFicha] = useState("");
  const [carac, setCarac] = useState("");
  const [como, setComo] = useState("");
  const [cuidados, setCuidados] = useState("");
  const [higiene, setHigiene] = useState("");
  const [recomendacoes, setRecomendacoes] = useState("");
  const [tags, setTags] = useState("");
  const [related, setRelated] = useState("");
  const [similar, setSimilar] = useState("");
  const [uploading, setUploading] = useState(false);
  const [reload, setReload] = useState(false);

  const dispatch = useDispatch();

  const productAdmin = useSelector((state) => state.productAdmin);
  const { error, loading, product } = productAdmin;

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
      dispatch(listProductAdmin(productId));
    }

    if (successVariation) {
      setReload(false);
      history.push(`/admin/product/${productId}/${createdVariation.id}/edit`);
    } else {
      if (product._id !== Number(productId) || !reload) {
        dispatch(listProductAdmin(productId));
        setReload(true);
      } else {
        setName(product.name);
        setCategory(product.category);
        setSubCategory(product.sub_categories);
        setPrice(product.price);
        setPromo_price(product.promo_price);
        setImage(product.image);
        setType(product.type);
        setExpire(product.expire);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setFicha(product.ficha);
        setCarac(product.carac);
        setComo(product.como);
        setCuidados(product.cuidados);
        setHigiene(product.higiene);
        setRecomendacoes(product.recomendacoes);
        setTags(product.tags);
        setRelated(product.related);
        setSimilar(product.similar);
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
        sub_categories,
        price,
        type,
        expire,
        promo_price,
        image,
        countInStock,
        description,
        ficha,
        carac,
        como,
        cuidados,
        higiene,
        recomendacoes,
        tags,
        related,
        similar,
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
      dispatch(listProductAdmin(productId));
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
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}

        {loadingVariation && <Loader />}
        {errorVariation && <Message variant="danger">{errorVariation}</Message>}
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
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
                  {Object.keys(novasCategorias).map((categoria, index) => (
                    <option key={index} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              {category && (
                <Form.Group control="sub-category">
                  <Form.Label>Sub Categorias</Form.Label>
                  <Form.Control
                    as="select"
                    multiple
                    value={sub_categories}
                    onChange={(e) =>
                      setSubCategory(
                        [].slice
                          .call(e.target.selectedOptions)
                          .map((item) => item.value)
                      )
                    }
                  >
                    {novasCategorias[category].map((sub, index) => (
                      <option key={index} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              )}

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

              <Form.Group control="ficha">
                <Form.Label>Ficha Técnica</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={ficha}
                  onChange={(e) => setFicha(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group control="carac">
                <Form.Label>Características</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={carac}
                  onChange={(e) => setCarac(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group control="howto">
                <Form.Label>Como Usar</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={como}
                  onChange={(e) => setComo(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group control="cuidados">
                <Form.Label>Cuidados e Precauções</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={cuidados}
                  onChange={(e) => setCuidados(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group control="higiene">
                <Form.Label>Como Higienizar</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={higiene}
                  onChange={(e) => setHigiene(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group control="recomendacoes">
                <Form.Label>Recomendações</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={recomendacoes}
                  onChange={(e) => setRecomendacoes(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group control="tag">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group control="relacionados">
                <Form.Label>Relacionados</Form.Label>
                <Form.Control
                  type="text"
                  value={related}
                  onChange={(e) => setRelated(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group control="similar">
                <Form.Label>Similares</Form.Label>
                <Form.Control
                  type="text"
                  value={similar}
                  onChange={(e) => setSimilar(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Col className="text-right">
                <Button className="text-danger" type="submit" variant="primary">
                  Atualizar
                </Button>
              </Col>
            </Form>
          </Col>

          <Col md={6}>
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
      )}
    </div>
  );
}

export default EditProductScreen;
