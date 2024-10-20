import { useState } from "react";

const OrderDetails = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button className="mt-2 text-blue-500" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Hide Details" : "View Details"}
      </button>
      {isOpen && (
        <div className="mt-4 border-t pt-4">
          <p>
            <strong>Order Date:</strong>{" "}
          </p>
          <p>{new Date(order.order_date).toLocaleDateString()}</p>
          <p>
            <strong>Card Used:</strong>
          </p>
          <p>{order.card_name}</p>
          <p>(**** **** **** {order.card_no.toString().slice(-4)})</p>

          <h3 className="my-4 font-semibold">Products</h3>
          <ul className="space-y-2">
            {order.products.map((product) => (
              <li
                key={product.id}
                className="flex gap-2 justify-between max-md:flex-col items-start border-b pb-2"
              >
                <div className="flex items-center max-md:flex-col">
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-16 h-16 mr-4 object-cover"
                  />
                  <div>
                    <p className="font-semibold">{product.name}</p>
                  </div>
                </div>
                <div>
                  <p>Quantity: {product.count}</p>
                  <p>Price: ${product.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
