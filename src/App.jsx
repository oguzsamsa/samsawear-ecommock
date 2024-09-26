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

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      console.log("yok");
      history.push("/login");
    } else {
      dispatch(verifyToken(history));
      dispatch(fetchProducts());
    }
  }, [token, history, dispatch]);

  const address = axiosInstance.get("/user/address");
  console.log("adresss", address);

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>

        <PrivateRoute path="/about">
          <About />
        </PrivateRoute>

        <PrivateRoute path="/contact">
          <Contact />
        </PrivateRoute>
        <PrivateRoute path="/create-order">
          <CreateOrderPage />
        </PrivateRoute>
        <Route path="/login">
          <LoginForm />
        </Route>
        <PrivateRoute exact path="/shop">
          <Shop />
        </PrivateRoute>

        <PrivateRoute path="/shop/product-detail/:categoryId/:productId/:name">
          <ProductDetail />
        </PrivateRoute>

        <PrivateRoute path="/shopping-cart">
          <ShoppingCart />
        </PrivateRoute>
        <PrivateRoute path="/signup">
          <SignUp />
        </PrivateRoute>
        <PrivateRoute path="/team">
          <Team />
        </PrivateRoute>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
