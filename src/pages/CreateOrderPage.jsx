import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBillingAddress,
  setAddresses,
  setBillingAddresses,
} from "../redux/actions/clientActions";
import axiosInstance from "../axios/axiosInstance";

const CreateOrderPage = () => {
  const dispatch = useDispatch();

  // ORDER SUMMARY //

  const cartItems = useSelector((state) => state.shoppingCart.cart);

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

  // ADDRESS INFORMATION //

  const addressList = useSelector((state) => state.client.addressList);
  const billingAddressList = useSelector(
    (state) => state.client.billingAddressList
  );

  const [showForm, setShowForm] = useState(false);
  const [isBillingSame, setIsBillingSame] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentUpdatingAddress, setCurrentUpdatingAddress] = useState(null);

  const [newAddress, setNewAddress] = useState({
    title: "",
    name: "",
    surname: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
  });

  const [newBillingAddress, setNewBillingAddress] = useState({
    title: "",
    name: "",
    surname: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    name: "",
    surname: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
  });

  const resetErrors = () => {
    setErrors({
      title: "",
      name: "",
      surname: "",
      phone: "",
      city: "",
      district: "",
      neighborhood: "",
    });
  };

  const validateForm = (addressToValidate) => {
    const newErrors = {
      title: "",
      name: "",
      surname: "",
      phone: "",
      city: "",
      district: "",
      neighborhood: "",
    };

    if (!addressToValidate.title)
      newErrors.title = "Address title is required.";
    if (!addressToValidate.name || addressToValidate.name.length < 2)
      newErrors.name = "Name must be at least 2 characters.";
    if (!addressToValidate.surname || addressToValidate.surname.length < 2)
      newErrors.surname = "Surname must be at least 2 characters.";
    if (!addressToValidate.phone || !/^\d+$/.test(addressToValidate.phone))
      newErrors.phone = "Valid phone number is required.";
    if (!addressToValidate.city || addressToValidate.city.length < 3)
      newErrors.city = "City must be at least 3 characters.";
    if (!addressToValidate.district || addressToValidate.district.length < 2)
      newErrors.district = "District must be at least 2 characters.";
    if (!addressToValidate.neighborhood)
      newErrors.neighborhood = "Neighborhood is required.";

    setErrors(newErrors);

    return Object.values(newErrors).some((error) => error !== "");
  };

  const [isAddressInfoVisible, setIsAddressInfoVisible] = useState(false);

  useEffect(() => {
    axiosInstance.get("/user/address").then((response) => {
      dispatch(setAddresses(response.data));
    });
  }, [dispatch]);

  const resetForm = (setFormState) => {
    setFormState({
      title: "",
      name: "",
      surname: "",
      phone: "",
      city: "",
      district: "",
      neighborhood: "",
    });
  };

  const handleAddAddress = (e) => {
    e.preventDefault();

    const hasErrors = validateForm(newAddress);
    if (hasErrors) return;

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
    resetForm(setNewAddress);
  };

  const handleAddBillingAddress = (e) => {
    e.preventDefault();

    const hasErrors = validateForm(newBillingAddress);
    if (hasErrors) return;

    const currentAddresses = billingAddressList;
    const updatedAddresses = [...currentAddresses, newBillingAddress];
    dispatch(setBillingAddresses(newBillingAddress));
    setSelectedBillingAddress(updatedAddresses.length - 1);

    resetForm(setNewBillingAddress);
    setIsBillingSame(true);
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

  const handleDeleteBillingAddress = (address) => {
    dispatch(deleteBillingAddress(address));
  };

  const toggleAddressInfo = () => {
    setIsAddressInfoVisible(!isAddressInfoVisible);
  };

  const openUpdateForm = (address) => {
    setCurrentUpdatingAddress(address);
    setIsUpdating(true);
  };

  const handleUpdateAddress = (e) => {
    e.preventDefault();

    const hasErrors = validateForm(currentUpdatingAddress);
    if (hasErrors) return;

    axiosInstance
      .put(`/user/address`, currentUpdatingAddress) // Güncellenecek adres bilgilerini gönder
      .then(() => {
        // Güncel adresleri tekrar al
        return axiosInstance.get("/user/address");
      })
      .then((res) => {
        // Yeni adres listesini Redux state'ine güncelle
        dispatch(setAddresses(res.data));
        // Güncelleme formunu kapatma ve sıfırlama
        setIsUpdating(false);
        setCurrentUpdatingAddress(null);
      })
      .catch((error) => {
        console.error("Adres güncellenirken bir hata oluştu:", error);
      });
  };

  // CARD INFORMATION //

  return (
    <div className="container mx-auto p-4 flex justify-around max-md:flex-col">
      <div className="flex flex-col gap-8">
        <div>
          <div className="p-4 border-2">
            <h1 className="font-bold mb-4">Address Information</h1>

            {selectedAddress ? (
              <div className="mb-4 relative">
                <h3 className="text-lg font-bold">
                  {
                    addressList.find(
                      (address) => address.id === selectedAddress
                    )?.title
                  }
                </h3>
                <p className="text-gray-700">
                  {
                    addressList.find(
                      (address) => address.id === selectedAddress
                    )?.neighborhood
                  }
                  ,{" "}
                  {
                    addressList.find(
                      (address) => address.id === selectedAddress
                    )?.district
                  }
                  ,{" "}
                  {
                    addressList.find(
                      (address) => address.id === selectedAddress
                    )?.city
                  }
                </p>
                <button
                  onClick={toggleAddressInfo}
                  className="text-xs underline absolute right-2 top-2"
                >
                  {isAddressInfoVisible ? "Close changing" : "Change"}
                </button>
              </div>
            ) : (
              <div className="mb-4 flex gap-4">
                <p className="text-gray-700">No address selected</p>
                <button
                  onClick={toggleAddressInfo}
                  className="text-text-color underline text-xs"
                >
                  {isAddressInfoVisible
                    ? "Close Selecting Address"
                    : "Select Address"}
                </button>
              </div>
            )}
          </div>

          {isAddressInfoVisible && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
              {addressList.length > 0 ? (
                <ul className="space-y-4">
                  {addressList.map((address) => (
                    <li
                      key={address.id}
                      className={`border border-gray-300 p-4 rounded-md shadow-sm ${
                        selectedAddress === address.id ? "bg-gray-200" : ""
                      }`}
                    >
                      <label>
                        <input
                          type="radio"
                          name="selectedAddress"
                          value={address.id}
                          onChange={() => {
                            setSelectedAddress(address.id);
                            setIsAddressInfoVisible(false);
                          }}
                          checked={selectedAddress === address.id}
                        />
                        <p className="font-semibold">{address.title}</p>
                        <p>
                          {address.name} {address.surname}
                        </p>
                        <p>{address.phone}</p>
                        <p>
                          {address.city}, {address.district},{" "}
                          {address.neighborhood}
                        </p>
                      </label>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="bg-red-500 mr-4 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => openUpdateForm(address)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
                      >
                        Update Address
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No addresses saved.</p>
              )}
              {isUpdating && currentUpdatingAddress && (
                <form onSubmit={handleUpdateAddress} className="mt-6 space-y-4">
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Address Title"
                      value={currentUpdatingAddress.title}
                      onChange={(e) =>
                        setCurrentUpdatingAddress({
                          ...currentUpdatingAddress,
                          title: e.target.value,
                        })
                      }
                      className="border border-gray-300 p-2 rounded-md w-full"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm">{errors.title}</p>
                    )}
                    <input
                      type="text"
                      placeholder="Name"
                      value={currentUpdatingAddress.name}
                      onChange={(e) =>
                        setCurrentUpdatingAddress({
                          ...currentUpdatingAddress,
                          name: e.target.value,
                        })
                      }
                      className="border border-gray-300 p-2 rounded-md w-full"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                    <input
                      type="text"
                      placeholder="Surname"
                      value={currentUpdatingAddress.surname}
                      onChange={(e) =>
                        setCurrentUpdatingAddress({
                          ...currentUpdatingAddress,
                          surname: e.target.value,
                        })
                      }
                      className="border border-gray-300 p-2 rounded-md w-full"
                    />
                    {errors.surname && (
                      <p className="text-red-500 text-sm">{errors.surname}</p>
                    )}
                    <input
                      type="text"
                      placeholder="Phone"
                      value={currentUpdatingAddress.phone}
                      onChange={(e) =>
                        setCurrentUpdatingAddress({
                          ...currentUpdatingAddress,
                          phone: e.target.value,
                        })
                      }
                      className="border border-gray-300 p-2 rounded-md w-full"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                    <input
                      type="text"
                      placeholder="City"
                      value={currentUpdatingAddress.city}
                      onChange={(e) =>
                        setCurrentUpdatingAddress({
                          ...currentUpdatingAddress,
                          city: e.target.value,
                        })
                      }
                      className="border border-gray-300 p-2 rounded-md w-full"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city}</p>
                    )}
                    <input
                      type="text"
                      placeholder="District"
                      value={currentUpdatingAddress.district}
                      onChange={(e) =>
                        setCurrentUpdatingAddress({
                          ...currentUpdatingAddress,
                          district: e.target.value,
                        })
                      }
                      className="border border-gray-300 p-2 rounded-md w-full"
                    />
                    {errors.district && (
                      <p className="text-red-500 text-sm">{errors.district}</p>
                    )}
                    <textarea
                      placeholder="Neighborhood, street, door number, etc."
                      value={currentUpdatingAddress.neighborhood}
                      onChange={(e) =>
                        setCurrentUpdatingAddress({
                          ...currentUpdatingAddress,
                          neighborhood: e.target.value,
                        })
                      }
                      className="border border-gray-300 p-2 rounded-md w-full h-24"
                    ></textarea>
                    {errors.neighborhood && (
                      <p className="text-red-500 text-sm">
                        {errors.neighborhood}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={() => validateForm()}
                    className="bg-blue-500 mr-4 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Update Address
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => setIsUpdating(false)}
                  >
                    Cancel Updating
                  </button>
                </form>
              )}
              {billingAddressList.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mt-6">
                    Billing Addresses
                  </h2>
                  {billingAddressList.length > 0 ? (
                    <ul className="space-y-4 w-1/2">
                      {billingAddressList.map((address, index) => (
                        <li
                          key={index}
                          className={`border border-gray-300 p-4 rounded-md shadow-sm ${
                            selectedBillingAddress === index
                              ? "bg-gray-200"
                              : ""
                          }`}
                        >
                          <label>
                            <input
                              type="radio"
                              name="selectedBillingAddress"
                              value={index}
                              onChange={() => {
                                setSelectedBillingAddress(index);
                                setIsAddressInfoVisible(false);
                              }}
                              checked={selectedBillingAddress === index}
                            />
                            <p className="font-semibold">{address.title}</p>
                            <p>
                              {address.name} {address.surname}
                            </p>
                            <p>{address.phone}</p>
                            <p>
                              {address.city}, {address.district},{" "}
                              {address.neighborhood}
                            </p>
                          </label>
                          <button
                            onClick={() => handleDeleteBillingAddress(address)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">
                      No separate billing addresses saved.
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={() => setShowForm(!showForm)}
                className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add New Address
              </button>

              {showForm && (
                <form onSubmit={handleAddAddress} className="mt-6 space-y-4">
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Address Title"
                      value={newAddress.title}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, title: e.target.value })
                      }
                      className="border border-gray-300 p-2 rounded-md w-full"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm">{errors.title}</p>
                    )}
                    <input
                      type="text"
                      placeholder="Name"
                      value={newAddress.name}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, name: e.target.value })
                      }
                      className="border border-gray-300 p-2 rounded-md w-full"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                    <input
                      type="text"
                      placeholder="Surname"
                      value={newAddress.surname}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          surname: e.target.value,
                        })
                      }
                      className="border border-gray-300 p-2 rounded-md w-full"
                    />
                    {errors.surname && (
                      <p className="text-red-500 text-sm">{errors.surname}</p>
                    )}
                    <input
                      type="text"
                      placeholder="Phone"
                      value={newAddress.phone}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, phone: e.target.value })
                      }
                      className="border border-gray-300 p-2 rounded-md w-full"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, city: e.target.value })
                      }
                      className="border border-gray-300 p-2 rounded-md w-full"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city}</p>
                    )}
                    <input
                      type="text"
                      placeholder="District"
                      value={newAddress.district}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          district: e.target.value,
                        })
                      }
                      className="border border-gray-300 p-2 rounded-md w-full"
                    />
                    {errors.district && (
                      <p className="text-red-500 text-sm">{errors.district}</p>
                    )}
                    <textarea
                      placeholder="Neighborhood, street, door number, etc."
                      value={newAddress.neighborhood}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          neighborhood: e.target.value,
                        })
                      }
                      className="border border-gray-300 p-2 rounded-md w-full h-24"
                    ></textarea>
                    {errors.neighborhood && (
                      <p className="text-red-500 text-sm">
                        {errors.neighborhood}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={() => validateForm()}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Save Address
                  </button>
                  <button
                    onClick={() => {
                      resetForm(setNewAddress);
                      setShowForm(false);
                      resetErrors();
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4"
                  >
                    Cancel
                  </button>
                </form>
              )}

              <div className="mt-8">
                <label>
                  <input
                    type="checkbox"
                    checked={isBillingSame}
                    onChange={() => setIsBillingSame(!isBillingSame)}
                  />
                  <span className="ml-2">Is this also billing address?</span>
                </label>
                {!isBillingSame && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 mt-4">
                      Billing Address
                    </h2>
                    <form
                      onSubmit={handleAddBillingAddress}
                      className="space-y-4 mt-4"
                    >
                      <div className="flex flex-col gap-4">
                        <input
                          type="text"
                          placeholder="Billing Address Title"
                          value={newBillingAddress.title}
                          onChange={(e) =>
                            setNewBillingAddress({
                              ...newBillingAddress,
                              title: e.target.value,
                            })
                          }
                          className="border border-gray-300 p-2 rounded-md w-full"
                        />
                        {errors.title && (
                          <p className="text-red-500 text-sm">{errors.title}</p>
                        )}
                        <input
                          type="text"
                          placeholder="Name"
                          value={newBillingAddress.name}
                          onChange={(e) =>
                            setNewBillingAddress({
                              ...newBillingAddress,
                              name: e.target.value,
                            })
                          }
                          className="border border-gray-300 p-2 rounded-md w-full"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm">{errors.name}</p>
                        )}
                        <input
                          type="text"
                          placeholder="Surname"
                          value={newBillingAddress.surname}
                          onChange={(e) =>
                            setNewBillingAddress({
                              ...newBillingAddress,
                              surname: e.target.value,
                            })
                          }
                          className="border border-gray-300 p-2 rounded-md w-full"
                        />
                        {errors.surname && (
                          <p className="text-red-500 text-sm">
                            {errors.surname}
                          </p>
                        )}
                        <input
                          type="text"
                          placeholder="Phone"
                          value={newBillingAddress.phone}
                          onChange={(e) =>
                            setNewBillingAddress({
                              ...newBillingAddress,
                              phone: e.target.value,
                            })
                          }
                          className="border border-gray-300 p-2 rounded-md w-full"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm">{errors.phone}</p>
                        )}
                        <input
                          type="text"
                          placeholder="City"
                          value={newBillingAddress.city}
                          onChange={(e) =>
                            setNewBillingAddress({
                              ...newBillingAddress,
                              city: e.target.value,
                            })
                          }
                          className="border border-gray-300 p-2 rounded-md w-full"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm">{errors.city}</p>
                        )}
                        <input
                          type="text"
                          placeholder="District"
                          value={newBillingAddress.district}
                          onChange={(e) =>
                            setNewBillingAddress({
                              ...newBillingAddress,
                              district: e.target.value,
                            })
                          }
                          className="border border-gray-300 p-2 rounded-md w-full"
                        />
                        {errors.district && (
                          <p className="text-red-500 text-sm">
                            {errors.district}
                          </p>
                        )}
                        <textarea
                          placeholder="Neighborhood"
                          value={newBillingAddress.neighborhood}
                          onChange={(e) =>
                            setNewBillingAddress({
                              ...newBillingAddress,
                              neighborhood: e.target.value,
                            })
                          }
                          className="border border-gray-300 p-2 rounded-md w-full h-24"
                        ></textarea>
                        {errors.neighborhood && (
                          <p className="text-red-500 text-sm">
                            {errors.neighborhood}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={() => validateForm()}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Save Billing Address
                      </button>
                      <button
                        onClick={() => {
                          resetForm(setNewBillingAddress);
                          setIsBillingSame(true);
                          resetErrors();
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4"
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="">
          <div className="p-4 border-2">
            <h1 className="font-bold">Card Information</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col border-2 w-1/3  p-6 rounded-md py-10 max-md:mx-auto max-md:w-4/5">
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
        <button className="mt-6 w-full py-2 bg-blue-600 text-white font-bold rounded-md">
          Create Order
        </button>
      </div>
    </div>
  );
};

export default CreateOrderPage;
