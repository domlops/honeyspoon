import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { mask, unMask } from "remask";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

function RegisterScreen({ location, history }) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  const mCpf = (e) => {
    const original = unMask(e.target.value);
    const masked = mask(original, ["999.999.999-99"]);
    setCpf(masked);
  };

  const mPhone = (e) => {
    const original = unMask(e.target.value);
    const masked = mask(original, ["(99) 9 9999-9999"]);
    setPhone(masked);
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("As senhas não são iguais");
    } else {
      dispatch(register(name, cpf, email, phone, birthday, password));
    }
  };
  return (
    <FormContainer>
      <h1>Entre</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader></Loader>}
      <Form onSubmit={submitHandler}>
        <Form.Group controId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Insira seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controId="cpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Insira seu CPF (Apenas números)"
            value={cpf}
            onChange={mCpf}
          ></Form.Control>
        </Form.Group>

        <Form.Group controId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Insira o email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controId="phone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="(99) 9 9999-9999"
            value={phone}
            onChange={mPhone}
          ></Form.Control>
        </Form.Group>

        <Form.Group controId="birthday">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            required
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Insira a Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controId="passwordConfirm">
          <Form.Label>Confirme a Senha</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirme a Senha"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Confirmar
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Já tem uma conta?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Entre aqui
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
