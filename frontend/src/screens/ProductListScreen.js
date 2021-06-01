import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, FormControl } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {
  listProducts,
  createProduct,
  deleteProduct,
} from "../actions/productActions";

function ProductListScreen({ history }) {
  const dispatch = useDispatch();

  const [choice, setChoice] = useState("category");
  const [order, setOrder] = useState("asc");

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let keyword = history.location.search;

  useEffect(() => {
    console.log(history.push);
    dispatch({ type: "PRODUCT_CREATE_RESET" });

    if (!userInfo.is_staff) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword));
    }
  }, [
    dispatch,
    history,
    keyword,
    userInfo,
    success,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Você tem certeza que deseja excluir esse produto?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = (product) => {
    dispatch(createProduct());
  };

  function compareValues(key, order = "asc") {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }

  products.sort(compareValues(choice, order));

  var sortBy = (value) => {
    setChoice(value[0]);
    setOrder(value[1]);
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Produtos</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3 text-danger" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Adicionar Produto
          </Button>
        </Col>
        <Col md={3} className="text-right">
          <FormControl
            as="select"
            onChange={(e) => sortBy(e.target.value.split("-"))}
          >
            <option value="category-asc">Categoria (maior-menor)</option>
            <option value="category-desc">Categoria (menor-maior)</option>
            <option value="price-asc">Preço (maior-menor)</option>
            <option value="price-desc">Preço (menor-maior)</option>
            <option value="expire-asc">Validade (menor-maior)</option>
            <option value="expire-desc">Validade (menor-maior)</option>
          </FormControl>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Table striped bordered hover className="table-sm mt-5">
            <thead>
              <tr>
                <th>ID</th>
                <th>CATEGORIA</th>
                <th>NOME</th>
                <th className="text-center">PREÇO</th>
                <th className="text-center">P. PROMOCIONAL</th>
                <th className="text-center">Tipo</th>
                <th className="text-center">Validade</th>
                <th className="text-center">ESTOQUE</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.category}>
                  <td>{product._id}</td>
                  <td>{product.category}</td>
                  <td>{product.name}</td>
                  <td className="text-center">R$ {product.price}</td>
                  <td className="text-center">R$ {product.promo_price}</td>
                  <td className="text-center">
                    {product.type === "U" ? "Único" : "Variado"}
                  </td>
                  <td className="text-center">{product.expire}</td>
                  <td className="text-center">{product.countInStock}</td>
                  <td className="text-center">
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button id="dropdown-danger" className="btn-sm">
                        Editar
                      </Button>
                    </LinkContainer>
                    <Button
                      className="btn-sm"
                      variant="light"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i id="honey" className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} is_staff={true} />
        </div>
      )}
    </div>
  );
}

export default ProductListScreen;
