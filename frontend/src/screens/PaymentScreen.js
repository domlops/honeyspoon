import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("Boleto");

  if (!shippingAddress.endereço) {
    history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Forma de Pagamento</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Cartão de Crédito/Débito"
              id="Cartão"
              name="paymentMethod"
              className="py-2"
              onChange={(e) => setPaymentMethod(e.target.id)}
            ></Form.Check>

            <Form.Check
              type="radio"
              label="Boleto"
              id="Boleto"
              name="paymentMethod"
              className="py-2"
              onChange={(e) => setPaymentMethod(e.target.id)}
            ></Form.Check>

            <Form.Check
              type="radio"
              label="Pix"
              id="Pix"
              name="paymentMethod"
              className="py-2"
              onChange={(e) => setPaymentMethod(e.target.id)}
            ></Form.Check>

            <Form.Check
              type="radio"
              label="Transfêrencia Nubank"
              id="Nubank"
              name="paymentMethod"
              className="py-2"
              onChange={(e) => setPaymentMethod(e.target.id)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button className="text-danger" type="submit" variant="primary">
          Continuar
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
