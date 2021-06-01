import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";

function EditUserScreen({ match, history }) {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [is_staff, setStaff] = useState(false);
  const [is_honey, setHoney] = useState(false);
  const [is_honey_first, setFirst] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { error: errorUpdate, loading: loadingUpdate, success } = userUpdate;

  useEffect(() => {
    if (success) {
      dispatch({ type: "USER_UPDATE_RESET" });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== Number(userId)) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setStaff(user.is_staff);
        setHoney(user.is_honey);
        setFirst(user.is_honey_first);
      }
    }
  }, [dispatch, user, userId, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: user._id,
        name,
        email,
        is_staff,
        is_honey,
        is_honey_first,
      })
    );
  };

  console.log(is_honey);
  return (
    <div>
      <Link to="/admin/userlist" className="btn btn-outline-danger my-4">
        Voltar
      </Link>
      <FormContainer>
        <h1>Editar Usuário</h1>
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
                placeholder="Insira seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group control="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Insira o email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group control="isstaff">
              <Form.Check
                type="checkbox"
                label="Administrador"
                checked={is_staff}
                onChange={(e) => setStaff(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group control="ishoney">
              <Form.Check
                type="checkbox"
                label="Colmeia"
                checked={is_honey}
                onChange={(e) => setHoney(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group control="isfirst">
              <Form.Check
                type="checkbox"
                label="Colmeia 1º Mês"
                checked={is_honey_first}
                onChange={(e) => setFirst(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" className="text-danger" variant="primary">
              Atualizar
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default EditUserScreen;
