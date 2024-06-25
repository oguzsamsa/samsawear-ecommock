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

function App() {
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
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/shop">
          <Shop />
        </Route>
        <Route path="/shop/product-detail/:id">
          <ProductDetail />
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
