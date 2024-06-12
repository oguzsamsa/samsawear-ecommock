import { Switch, Route, Link } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import About from "./pages/About";

function App() {
  return (
    <>
      <Header />
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
