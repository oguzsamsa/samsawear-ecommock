import { Switch, Route, Link } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import LoginForm from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts, verifyToken } from "./redux/actions/thunkActions";
import { useHistory } from "react-router-dom";
import ShoppingCart from "./pages/ShoppingCart";
import axiosInstance from "./axios/axiosInstance";
import PrivateRoute from "./components/PrivateRoute";
import CreateOrderPage from "./pages/CreateOrderPage";
import OrderCompletedPage from "./pages/OrderCompletedPage";
import PreviousOrders from "./pages/PreviousOrders";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(verifyToken(history));
    }

    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/contact">
          <Contact />
        </Route>
        <PrivateRoute path="/create-order">
          <CreateOrderPage />
        </PrivateRoute>
        <Route path="/login">
          <LoginForm />
        </Route>
        <PrivateRoute exact path="/order-completed">
          <OrderCompletedPage />
        </PrivateRoute>
        <PrivateRoute exact path="/previous-orders">
          <PreviousOrders />
        </PrivateRoute>
        <Route exact path="/shop">
          <Shop />
        </Route>

        <Route path="/shop/product-detail/:categoryId/:productId/:name">
          <ProductDetail />
        </Route>

        <Route path="/shopping-cart">
          <ShoppingCart />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/team">
          <Team />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
