import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar expand="xl" bg="primary" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt=""
                src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/logo-header.svg"
                width="300"
                height="30"
                className=""
              />{" "}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link className="text-danger">
                  <i className="mr-1">
                    {cartItems.length > 0 ? `${cartItems.length}` : ""}
                  </i>
                  <i className="fas fa-shopping-cart pr-1 text-danger"></i>
                  Carrinho
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  id="dropdown-danger"
                  title={userInfo.nickname ? userInfo.nickname : userInfo.name}
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="text-danger">
                    <i className="fas fa-user pr-1 "></i>Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.is_staff && (
                <NavDropdown title="Admin" id="dropdown-danger">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Usuários</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Produtos</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Pedidos</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
