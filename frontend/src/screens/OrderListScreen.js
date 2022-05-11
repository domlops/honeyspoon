import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { listAdminOrders } from "../actions/orderActions";

function OrderListScreen({ history }) {
  const dispatch = useDispatch();

  const orderAdminList = useSelector((state) => state.orderAdminList);
  const { loading, error, orders, page, pages } = orderAdminList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let keyword = history.location.search;

  useEffect(() => {
    if (userInfo && userInfo.is_staff) {
      dispatch(listAdminOrders(keyword));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, keyword, userInfo]);

  return (
    <div>
      <h1>Pedidos</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USUARIO</th>
                <th>DATA</th>
                <th>VALOR</th>
                <th className="text-center">PAGAMENTO</th>
                <th className="text-center">ENTREGA</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {order.user.nickname
                      ? order.user.nickname
                      : `${order.user.name} ${order.user.last_name}`}
                  </td>
                  <td>{order.createdAt.replace(/-/g, "/")}</td>
                  <td>R$ {order.totalPrice.replace(".", ",")}</td>
                  <td className="text-center">
                    {order.isPaid ? (
                      order.paidAt.replace(/-/g, "/")
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td className="text-center">
                    {order.isDelivered ? (
                      order.deliveredAt.replace(/-/g, "/")
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td className="text-center">
                    <LinkContainer to={`/order/${order._id}/`}>
                      <Button variant="light" className="btn-sm text-danger">
                        Detalhes
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} orders={true} />
        </div>
      )}
    </div>
  );
}

export default OrderListScreen;
