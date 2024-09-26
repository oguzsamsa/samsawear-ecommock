import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddresses } from "../redux/actions/clientActions";
import axiosInstance from "../axios/axiosInstance";

const CreateOrderPage = () => {
  const dispatch = useDispatch();
  const addressList = useSelector((state) => state.client.addressList);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: "",
    name: "",
    surname: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
  });

  useEffect(() => {
    axiosInstance.get("/user/address").then((response) => {
      dispatch(setAddresses(response.data));
    });
  }, [dispatch]);

  const handleAddAddress = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/user/address", newAddress)
      .then((response) => {
        axiosInstance.get("/user/address").then((res) => {
          dispatch(setAddresses(res.data));
        });
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Adres eklenirken bir hata oluştu:", error);
      });
    setNewAddress({
      title: "",
      name: "",
      surname: "",
      phone: "",
      city: "",
      district: "",
      neighborhood: "",
    });
  };

  const handleUpdateAddress = (addressId, updatedAddress) => {
    axiosInstance
      .put("/user/address", { id: addressId, ...updatedAddress })
      .then((response) => {
        axiosInstance.get("/user/address").then((res) => {
          dispatch(setAddresses(res.data));
        });
      })
      .catch((error) => {
        console.error("Adres güncellenirken bir hata oluştu:", error);
      });
  };

  const handleDeleteAddress = (addressId) => {
    axiosInstance
      .delete(`/user/address/${addressId}`)
      .then(() => {
        axiosInstance.get("/user/address").then((res) => {
          dispatch(setAddresses(res.data));
        });
      })
      .catch((error) => {
        console.error("Adres silinirken bir hata oluştu:", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Create Order - Address Information
      </h1>
      <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
      {addressList.length > 0 ? (
        <ul className="space-y-4">
          {addressList.map((address) => (
            <li
              key={address.id}
              className="border border-gray-300 p-4 rounded-md shadow-sm"
            >
              <p className="font-semibold">{address.title}</p>
              <p>
                {address.name} {address.surname}
              </p>
              <p>{address.phone}</p>
              <p>
                {address.city}, {address.district}, {address.neighborhood}
              </p>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleUpdateAddress(address.id, address)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No addresses saved.</p>
      )}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Address
      </button>

      {showForm && (
        <form onSubmit={handleAddAddress} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Address Title"
              value={newAddress.title}
              onChange={(e) =>
                setNewAddress({ ...newAddress, title: e.target.value })
              }
              className="border border-gray-300 p-2 rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Name"
              value={newAddress.name}
              onChange={(e) =>
                setNewAddress({ ...newAddress, name: e.target.value })
              }
              className="border border-gray-300 p-2 rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Surname"
              value={newAddress.surname}
              onChange={(e) =>
                setNewAddress({ ...newAddress, surname: e.target.value })
              }
              className="border border-gray-300 p-2 rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Phone"
              value={newAddress.phone}
              onChange={(e) =>
                setNewAddress({ ...newAddress, phone: e.target.value })
              }
              className="border border-gray-300 p-2 rounded-md w-full"
            />
            <input
              type="text"
              placeholder="City"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
              className="border border-gray-300 p-2 rounded-md w-full"
            />
            <input
              type="text"
              placeholder="District"
              value={newAddress.district}
              onChange={(e) =>
                setNewAddress({ ...newAddress, district: e.target.value })
              }
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
          <textarea
            placeholder="Neighborhood"
            value={newAddress.neighborhood}
            onChange={(e) =>
              setNewAddress({ ...newAddress, neighborhood: e.target.value })
            }
            className="border border-gray-300 p-2 rounded-md w-full h-24"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Address
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateOrderPage;
