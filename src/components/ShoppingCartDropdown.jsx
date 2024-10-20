import { useDispatch } from "react-redux";
import {
  cartQuantityDecrease,
  cartQuantityIncrease,
} from "../redux/actions/shoppingCartActions";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { verifyToken } from "../redux/actions/thunkActions";

export default function ShoppingCartDropdown({ cart }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCartQuantityDecrease = (productId) => {
    dispatch(cartQuantityDecrease(productId));
  };

  const handleCartQuantityIncrease = (productId) => {
    dispatch(cartQuantityIncrease(productId));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.count,
    0
  );

  const handleCheckout = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      history.push("/login", { from: "/create-order" });
    } else {
      try {
        await dispatch(verifyToken(history));
        history.push("/create-order");
      } catch (error) {
        console.error("Token verification failed:", error);
        history.push("/login", { from: "/checkout" });
      }
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-300 shadow-lg p-4 z-20">
      {cart.length === 0 ? (
        <div className="p-4">Your cart is empty</div>
      ) : (
        <ul>
          {cart.map((item) => (
            <li
              key={item.product.id}
              className="flex items-center p-2 border-b border-gray-300"
            >
              <img
                src={item.product.images[0]?.url}
                alt={item.product.name}
                className="w-24 h-full object-cover"
              />
              <div className="ml-4 flex-1">
                <p className="font-bold text-text-color">{item.product.name}</p>
                <p className="text-sm text-second-text-color">
                  {item.product.description}
                </p>
                <div className="flex items-center mt-2">
                  <span className="mr-6 text-second-text-color font-bold">
                    Quantity: {item.count}
                  </span>
                  <button
                    className="w-8 h-8 border-2 border-primary-color rounded-full text-primary-color font-bold flex items-center justify-center mr-1"
                    onClick={() => handleCartQuantityDecrease(item.product.id)}
                  >
                    -
                  </button>

                  <button
                    className="w-8 h-8 border-2 border-primary-color rounded-full text-primary-color font-bold flex items-center justify-center"
                    onClick={() => handleCartQuantityIncrease(item.product.id)}
                  >
                    +
                  </button>
                </div>
                <p className="mt-2 font-bold text-text-color">
                  ${(item.product.price * item.count).toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="px-2 pt-4 flex justify-between items-center ">
        <p className="font-bold text-text-color">Summary:</p>
        <p className="font-bold text-text-color">${totalPrice.toFixed(2)}</p>
      </div>
      <div className="mt-4 flex justify-between border-t border-gray-300 pt-2">
        <Link to="/shopping-cart">
          <button className="bg-primary-color text-white px-4 py-2 rounded">
            Go to Cart
          </button>
        </Link>
        <button
          onClick={handleCheckout}
          className="bg-success-text-color text-white px-4 py-2 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
