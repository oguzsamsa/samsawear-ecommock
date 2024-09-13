import { useSelector, useDispatch } from "react-redux";
import {
  cartQuantityDecrease,
  cartQuantityIncrease,
  removeItem,
  toggleSelectItem,
} from "../redux/actions/shoppingCartActions";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.shoppingCart.cart);

  console.log(cartItems, "cartitemssss");

  const getTotalPrice = () => {
    return cartItems
      .filter((item) => item.checked)
      .reduce((total, item) => total + item.product.price * item.count, 0)
      .toFixed(2);
  };

  return (
    <div className="flex flex-col w-3/5 mx-auto font-display">
      <h1 className="mx-auto font-bold text-2xl text-text-color">
        Your Shopping Cart
      </h1>
      {cartItems.length > 0 ? (
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex flex-row justify-between items-center w-full border-b py-4"
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
                  <p className="text-sm text-gray-600 w-96">
                    {item.product.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {/* Sayıyı artırıp azaltmak için butonlar */}
                  <button
                    onClick={() =>
                      dispatch(cartQuantityDecrease(item.product.id))
                    }
                    className="px-2 py-1 bg-muted-color"
                  >
                    -
                  </button>
                  <p>{item.count}</p>
                  <button
                    onClick={() =>
                      dispatch(cartQuantityIncrease(item.product.id))
                    }
                    className="px-2 py-1 bg-muted-color"
                  >
                    +
                  </button>
                </div>
                <p>Price: ${(item.product.price * item.count).toFixed(2)}</p>
                {/* Ürünü cart'tan kaldırmak için buton */}
                <button
                  onClick={() => dispatch(removeItem(item.product.id))}
                  className="px-4 py-2 bg-muted-color text-black font-bold rounded-md"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Seçili ürünlerin toplam fiyatı */}
          <div className="mt-4 text-right">
            <h2 className="font-bold text-xl">
              Total Price: ${getTotalPrice()}
            </h2>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default ShoppingCart;
