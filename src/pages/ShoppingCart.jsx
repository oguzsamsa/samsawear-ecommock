import { useSelector } from "react-redux";

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.shoppingCart.cart);

  console.log(cartItems, "cartitemsssssssss");

  const getTotalPrice = (price, count) => {
    return (price * count).toFixed(2); // İki ondalıklı formatta fiyat döner
  };
  return (
    <div>
      <h1 className=" text-black">Your Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li
              key={item.product.id}
              className="flex flex-row justify-center items-center gap-4"
            >
              <img
                src={item.product.images[0].url}
                alt={item.product.name}
                className="w-1/12 h-32"
              />
              <div>
                <h2>{item.product.name}</h2>
                <p>{item.product.description}</p>
              </div>

              <p>Quantity: {item.count}</p>
              <p>Price: ${getTotalPrice(item.product.price, item.count)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default ShoppingCart;
