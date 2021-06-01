import React, { useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { mask, unMask } from "remask";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShipping } from "../actions/cartActions";
import { Bairros, Cidades } from "../Lists";

function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();

  const [endereço, setEndereço] = useState(shippingAddress.endereço);
  const [cidade, setCidade] = useState(
    shippingAddress.cidade ? shippingAddress.cidade : "Maceió"
  );
  const [cep, setCEP] = useState(shippingAddress.cep);
  const [bairro, setBairro] = useState(
    shippingAddress.bairro ? shippingAddress.bairro : "Antares"
  );
  const [ponto, setPonto] = useState("");
  const [complemento, setComplemento] = useState("");

  const mCep = (e) => {
    const original = unMask(e.target.value);
    const masked = mask(original, ["99999-999"]);
    setCEP(masked);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShipping({ endereço, cep, bairro, cidade, ponto, complemento })
    );
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Entrega</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controId="endereço">
          <Form.Label>Endereço*</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Insira seu endereço"
            value={endereço ? endereço : ""}
            onChange={(e) => setEndereço(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controId="cidade">
          <Form.Label>Cidade*</Form.Label>
          <Form.Control
            required
            as="select"
            placeholder="Cidade"
            value={cidade ? cidade : ""}
            onChange={(e) => setCidade(e.target.value)}
          >
            {Cidades.map((cidade) => (
              <option key={cidade} value={cidade}>
                {cidade}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        {cidade === "Maceió" ? (
          <Form.Group controId="bairro">
            <Form.Label>Bairro*</Form.Label>
            <Form.Control
              as="select"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            >
              {Bairros.map((bairro) => (
                <option key={bairro} value={bairro}>
                  {bairro}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        ) : (
          <Form.Group controId="bairro">
            <Form.Label>Bairro*</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Bairro"
              value={bairro ? bairro : ""}
              onChange={(e) => setBairro(e.target.value)}
            ></Form.Control>
          </Form.Group>
        )}

        <Form.Group controId="cep">
          <Form.Label>CEP*</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="CEP"
            value={cep}
            onChange={mCep}
          ></Form.Control>
        </Form.Group>

        <Form.Group controId="ponto">
          <Form.Label>Ponto de Referência</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ponto de Referência"
            value={ponto ? ponto : ""}
            onChange={(e) => setPonto(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controId="complemento">
          <Form.Label>Complemento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Complemento"
            value={complemento ? complemento : ""}
            onChange={(e) => setComplemento(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="text-danger" type="submit" variant="primary">
          Continuar
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
