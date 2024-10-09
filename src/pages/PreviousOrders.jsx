import { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import OrderDetails from "../components/OrderDetails";

const PreviousOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/order");
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching orders", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 font-display w-3/5 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Previous Orders</h2>
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-md">
              <div className="flex justify-between max-md:flex-col">
                <p>Order ID: {order.id}</p>
                <p>Total Price: ${order.price}</p>
              </div>
              <OrderDetails order={order} />
            </div>
          ))
        ) : (
          <p>No previous orders found.</p>
        )}
      </div>
    </div>
  );
};

export default PreviousOrders;
