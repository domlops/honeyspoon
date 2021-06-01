import { Container } from "react-bootstrap";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutScreen from "./screens/AboutScreen";
import TrocaScreen from "./screens/TrocaScreen";
import LogisticaScreen from "./screens/LogisticaScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import VariationEditScreen from "./screens/VariationEditScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ColmeiaScreen from "./screens/ColmeiaScreen";
import MasterLoveScreen from "./screens/MasterLoveScreen";
import InCicloScreen from "./screens/InCicloScreen";
import AromaScreen from "./screens/AromaScreen";
import ValentinesScreen from "./screens/ValentinesScreen";

function App() {
  return (
    <Router>
      <Header />
      <main id="page-container" className="py-3">
        <Container id="content-wrap">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />

          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/productlist" component={ProductListScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route
            path="/admin/product/:id/:pk/edit"
            component={VariationEditScreen}
          />

          <Route path="/inst/about" component={AboutScreen} />
          <Route path="/inst/troca" component={TrocaScreen} />
          <Route path="/inst/logistica" component={LogisticaScreen} />

          <Route path="/colmeia" component={ColmeiaScreen} />
          <Route path="/mlove" component={MasterLoveScreen} />
          <Route path="/inciclo" component={InCicloScreen} />
          <Route path="/aroma-honeyspoon" component={AromaScreen} />

          <Route path="/namorados" component={ValentinesScreen} />
        </Container>
      </main>
      <Footer id="footer" />
    </Router>
  );
}

export default App;
