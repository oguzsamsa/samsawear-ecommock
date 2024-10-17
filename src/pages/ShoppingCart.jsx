import { useSelector, useDispatch } from "react-redux";
import {
  cartQuantityDecrease,
  cartQuantityIncrease,
  removeItem,
  toggleSelectItem,
} from "../redux/actions/shoppingCartActions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { verifyToken } from "../redux/actions/thunkActions";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.shoppingCart.cart);
  const history = useHistory();

  const shippingCost = cartItems.length > 0 ? 5.99 : 0;
  const discount = cartItems.length > 0 ? 10.0 : 0;

  const getTotalPrice = () => {
    return cartItems
      .filter((item) => item.checked)
      .reduce((total, item) => total + item.product.price * item.count, 0)
      .toFixed(2);
  };

  const getGrandTotalPrice = () => {
    const totalPrice = parseFloat(getTotalPrice());
    const grandTotal = totalPrice + shippingCost - discount;
    return grandTotal.toFixed(2);
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    console.log("Token:", token);

    if (!token) {
      history.push("/login", { from: "/create-order" });
    } else {
      try {
        await dispatch(verifyToken(history));
        history.push("/create-order");
      } catch (error) {
        history.push("/login", { from: "/create-order" });
      }
    }
  };

  return (
    <div className="flex flex-row max-md:flex-col justify-between mx-auto font-display md:items-center md:w-11/12">
      <div className="flex flex-col w-3/5 max-md:w-4/5 max-md:mx-auto">
        <h1 className="mx-auto font-bold text-2xl text-text-color">
          Your Shopping Cart
        </h1>
        {cartItems.length > 0 ? (
          <div className="flex flex-col gap-4 py-20">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-row max-lg:flex-col max-lg:gap-4 justify-between items-center w-full border-b py-4"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => dispatch(toggleSelectItem(item.product.id))}
                    className="w-6 h-6 rounded-sm border-gray-300 checked:bg-blue-600 checked:border-blue-600 focus:ring-blue-500 focus:ring-offset-2" // checkbox ve ürün arasında boşluk oluşturur
                  />
                  <img
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover"
                  />
                  <div>
                    <h2 className="font-bold text-lg">{item.product.name}</h2>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        dispatch(cartQuantityDecrease(item.product.id))
                      }
                      className="w-8 h-8 border-2 border-primary-color rounded-full text-primary-color font-bold flex items-center justify-center"
                    >
                      -
                    </button>
                    <p className="text-primary-color text-lg">{item.count}</p>
                    <button
                      onClick={() =>
                        dispatch(cartQuantityIncrease(item.product.id))
                      }
                      className="w-8 h-8 border-2 border-primary-color rounded-full text-primary-color font-bold flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-second-text-color font-bold">
                    Price: ${(item.product.price * item.count).toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(removeItem(item.product.id))}
                    className="px-4 py-2 text-danger-text-color border-2 border-danger-text-color font-bold rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 text-right max-md:text-center">
              <h2 className="font-bold text-xl">
                Total Price: ${getTotalPrice()}
              </h2>
            </div>
          </div>
        ) : (
          <p className="p-20 text-second-text-color text-2xl text-center">
            Your cart is empty.
          </p>
        )}
      </div>
      <div className="flex flex-col w-1/3  p-6 rounded-md py-10 max-md:mx-auto max-md:w-4/5">
        <h2 className="font-bold text-xl mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2 max-md:gap-4">
          <p>Products Total:</p>
          <p>${getTotalPrice()}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Shipping Cost:</p>
          <p>${shippingCost.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Discount:</p>
          <p>-${discount.toFixed(2)}</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between font-bold text-lg">
          <p>Grand Total:</p>
          <p>${getGrandTotalPrice()}</p>
        </div>

        <button
          onClick={handleCreateOrder}
          className="mt-6 w-full py-2 bg-blue-600 text-white font-bold rounded-md"
        >
          Create Order
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
