import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axiosInstance from "../axios/axiosInstance";

const OrderCompletedPage = () => {
  const location = useLocation();
  const orderInfo = location.state?.orderInfo;

  const [orders, setOrders] = useState([]);
  const formattedDate = new Date(orderInfo.order_date).toLocaleString("tr-TR");

  const order = orders.find((o) => o.id === orderInfo?.id);

  const address = useSelector(
    (state) =>
      state.client.addressList.filter(
        (adres) => adres.id === orderInfo["address_id"]
      )[0]
  );

  useEffect(() => {
    axiosInstance
      .get("/order")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!orderInfo) {
    return (
      <p className="text-red-500">
        Bir hata oluştu, sipariş bilgisi bulunamadı.
      </p>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg font-display">
      <h1 className="text-2xl font-bold text-center text-success-text-color mb-4">
        Tebrikler, siparişiniz tamamlandı!
      </h1>
      <p className="text-center font-bold">
        Sipariş ID:{" "}
        <span className="  text-second-text-color">{orderInfo.id}</span>
      </p>
      <p className="text-center font-bold">
        Sipariş Tarihi:{" "}
        <span className="font-semibold text-second-text-color">
          {formattedDate}
        </span>
      </p>
      <p className="text-center text-lg font-bold">
        Toplam Fiyat:{" "}
        <span className="text-success-text-color">
          ${orderInfo.price.toFixed(2)}
        </span>
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Ürünler:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {order?.products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg  p-4 transition-transform transform hover:scale-105"
          >
            <img
              src={product.images[0].url}
              alt={product.name}
              className="w-full h-48 object-cover mb-2 rounded-lg"
            />
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-700">{product.description}</p>
            <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-8">
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 flex-1">
          <h2 className="text-lg font-semibold">Teslimat Adresi:</h2>
          <p className="text-gray-700">Başlık: {address.title} </p>
          <p className="text-gray-700">
            Ad: {address.name} {address.surname}
          </p>
          <p className="text-gray-700">Telefon: {address.phone}</p>
          <p className="text-gray-700">Şehir: {address.city}</p>
          <p className="text-gray-700">İlçe: {address.district}</p>
          <p className="text-gray-700">Mahalle: {address.neighborhood}</p>
        </div>

        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 flex-1">
          <h2 className="text-lg font-semibold">Ödeme Bilgileri:</h2>
          <p className="text-gray-700">
            Kart Sahibinin Adı: {orderInfo.card_name}
          </p>
          <p className="text-gray-700">
            Kart Numarası: **** **** ****{" "}
            {orderInfo.card_no.toString().slice(-4)}
          </p>
          <p className="text-gray-700">
            Kart Son Kullanma Tarihi: {orderInfo.card_expire_month}/
            {orderInfo.card_expire_year}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCompletedPage;
