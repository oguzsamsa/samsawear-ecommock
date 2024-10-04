import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCreditCards,
  addCreditCard,
  updateCreditCard,
  deleteCreditCard,
} from "../redux/actions/clientActions";
import axiosInstance from "../axios/axiosInstance";

const CreditCardManager = ({ onSelectCard }) => {
  const dispatch = useDispatch();
  const { creditCards } = useSelector((state) => state.client);

  const [selectedCard, setSelectedCard] = useState(null);
  const [isCardInfoVisible, setIsCardInfoVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Kart formunun görünürlüğünü değiştirme fonksiyonu
  const toggleCardInfo = () => {
    setIsCardInfoVisible((prev) => !prev);
  };

  // Kart formu için state
  const [form, setForm] = useState({
    card_no: "",
    expire_month: "",
    expire_year: "",
    name_on_card: "",
    cvv: "",
  });

  // Kartları sayfa yüklendiğinde getirme
  useEffect(() => {
    axiosInstance
      .get("/user/card")
      .then((res) => {
        dispatch(setCreditCards(res.data));
      })
      .catch((error) => console.error("Error fetching cards:", error));
  }, [dispatch]);

  const formatCardNumber = (value) => {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  const handleSelectCard = (card) => {
    setSelectedCard(card);
    onSelectCard(card);
  };

  const handleCardNumberChange = (e) => {
    const formattedCardNumber = formatCardNumber(e.target.value);
    setForm({ ...form, card_no: formattedCardNumber });
  };

  const handleExpireMonthChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > 12) value = 12;
    if (value < 1) value = 1;
    setForm({ ...form, expire_month: value.toString().padStart(2, "0") });
  };

  const handleExpireYearChange = (e) => {
    const currentYear = new Date().getFullYear();
    let value = parseInt(e.target.value);
    if (value < currentYear) value = currentYear;
    setForm({ ...form, expire_year: value.toString() });
  };

  // Kart ekleme veya güncelleme işlemi
  const handleAddCard = (e) => {
    e.preventDefault();

    const sanitizedCardNumber = form.card_no.replace(/\s/g, "");

    const cardData = {
      card_no: sanitizedCardNumber,
      expire_month: form.expire_month,
      expire_year: form.expire_year,
      name_on_card: form.name_on_card,
    };

    axiosInstance
      .post("/user/card", cardData)
      .then((res) => {
        dispatch(addCreditCard(res.data));
        setSelectedCard(null);
        setForm({
          card_no: "",
          expire_month: "",
          expire_year: "",
          name_on_card: "",
        });
        setIsFormVisible(false);
      })
      .catch((error) => console.error("Error adding card:", error));
  };

  const handleUpdateCard = (e) => {
    e.preventDefault();
    if (selectedCard) {
      axiosInstance
        .put(`/user/card/${selectedCard.id}`, form)
        .then((res) => {
          dispatch(updateCreditCard(res.data));
        })
        .catch((error) => console.error("Error updating card:", error));

      setIsCardInfoVisible(false);
      setIsFormVisible(false);
    }
  };

  // Kart düzenleme işlemi
  const handleEdit = (card) => {
    setSelectedCard(card);
    setForm(card);
    setIsCardInfoVisible(true); // Düzenleme için formu aç
  };

  // Kart silme işlemi
  const handleDelete = (cardId) => {
    axiosInstance
      .delete(`/user/card/${cardId}`)
      .then(() => {
        dispatch(deleteCreditCard(cardId));
      })
      .catch((error) => console.error("Error deleting card:", error));
  };

  const convertCardNo = (cardNo) => {
    const lastFour = cardNo.slice(-4);
    return "**** **** **** " + lastFour;
  };

  const resetForm = () => {
    setForm({
      card_no: "",
      expire_month: "",
      expire_year: "",
      name_on_card: "",
      cvv: "",
    });
  };

  return (
    <div className="mx-auto w-full bg-white  rounded-lg">
      <div className="p-4 border-2 mb-4">
        <h1 className="font-bold mb-4">Credit Card Information</h1>
        {selectedCard ? (
          <div className="mb-4 relative">
            <h3 className="text-lg font-bold">Mastercard</h3>
            <h3 className=" text-second-text-color font-bold my-2">
              {selectedCard.name_on_card}
            </h3>
            <p className="text-second-text-color">
              {selectedCard.card_no
                ? convertCardNo(selectedCard.card_no)
                : "No selected card no"}
            </p>
            <button
              onClick={toggleCardInfo}
              className="text-xs underline absolute right-2 top-2"
            >
              {isCardInfoVisible ? "Close changing" : "Change"}
            </button>
          </div>
        ) : (
          <div className="mb-4 flex gap-4">
            <p className="text-gray-700">No cards selected</p>
            <button
              onClick={toggleCardInfo}
              className="text-text-color underline text-xs"
            >
              {isCardInfoVisible ? "Close Selecting Card" : "Select Card"}
            </button>
          </div>
        )}
      </div>

      {/* Kart formu burada gizlenebilir veya gösterilebilir */}
      {isCardInfoVisible && (
        <div>
          <div>
            <h3 className="font-bold mb-4">Available Cards</h3>

            {creditCards.length > 0 ? (
              creditCards.map((card) => (
                <div
                  key={card.id}
                  className={`border mb-4 border-gray-300 p-4 rounded-md shadow-sm ${
                    selectedCard && selectedCard.id === card.id
                      ? "bg-gray-200"
                      : ""
                  }`}
                >
                  <label>
                    <input
                      type="radio"
                      name="selectedCard"
                      className="mr-3"
                      checked={selectedCard && selectedCard.id === card.id}
                      onChange={() => {
                        handleSelectCard(card);
                        setIsCardInfoVisible(false);
                      }}
                    />
                    <div className="">
                      <h3 className="text-lg font-bold">Mastercard</h3>
                      <p>{card.name_on_card}</p>
                      <div className="inline-block">
                        <p className="">
                          {card.card_no
                            ? convertCardNo(card.card_no)
                            : "No card no"}
                        </p>
                        <div className="w-full flex justify-between">
                          <p>
                            {card.expire_month}/{card.expire_year}
                          </p>
                          <p>***</p>
                        </div>
                      </div>
                    </div>
                  </label>
                  <div className="flex justify-between mt-2">
                    <button
                      className="bg-danger-text-color text-white px-4 py-2 rounded hover:bg-red-700"
                      onClick={() => handleDelete(card.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-primary-color text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => {
                        handleEdit(card);
                        setIsFormVisible(true);
                      }}
                    >
                      Update Card
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="mb-4 text-sm">No card available</p>
            )}
          </div>
          <button
            className="bg-primary-color mt-6 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
            onClick={() => {
              setSelectedCard(null);
              setForm({
                card_no: "",
                expire_month: "",
                expire_year: "",
                name_on_card: "",
              });
              setIsFormVisible(!isFormVisible);
            }}
          >
            {!isFormVisible ? "Add new card" : "Close card form"}
          </button>
          {isFormVisible && !selectedCard && (
            <form onSubmit={handleAddCard} className="mb-4">
              <div>
                <label className="block mb-2">Card Number:</label>
                <input
                  type="text"
                  value={form.card_no}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                  placeholder="XXXX XXXX XXXX XXXX"
                  required
                  className="border p-2 w-1/2 mb-4"
                />
              </div>
              <div>
                <label className="block mb-2">Name on Card:</label>
                <input
                  type="text"
                  value={form.name_on_card}
                  onChange={(e) =>
                    setForm({ ...form, name_on_card: e.target.value })
                  }
                  placeholder="Jane Doe"
                  required
                  className="border p-2 w-1/2 mb-4"
                />
              </div>
              <div className="flex gap-4 ">
                <div className="">
                  <label className="block mb-2">Expire Month:</label>
                  <input
                    type="number"
                    value={form.expire_month}
                    onChange={handleExpireMonthChange}
                    min="1"
                    max="12"
                    placeholder="MM"
                    required
                    className="border p-2 w-16"
                  />
                </div>
                <div>
                  <label className="block mb-2">Expire Year:</label>
                  <input
                    type="number"
                    value={form.expire_year}
                    onChange={handleExpireYearChange}
                    placeholder="YYYY"
                    required
                    className="border p-2 w-24"
                  />
                </div>
                <div>
                  <label className="block mb-2">CVV:</label>
                  <input
                    type="number"
                    value={form.cvv}
                    onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                    maxLength={3}
                    placeholder="***"
                    required
                    className="border p-2 w-16 mb-4"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 mt-4 text-white p-2 rounded"
              >
                Add Card
              </button>
              <button
                className="bg-danger-text-color ml-4 text-white px-4 py-2 rounded hover:bg-red-70"
                onClick={() => {
                  setIsFormVisible(false);
                }}
              >
                Cancel
              </button>
            </form>
          )}
          {isFormVisible && selectedCard && (
            <form onSubmit={handleUpdateCard} className="mb-4">
              <div>
                <label className="block mb-2">Card Number:</label>
                <input
                  type="text"
                  value={form.card_no}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                  placeholder="XXXX XXXX XXXX XXXX"
                  required
                  className="border p-2 w-full mb-4"
                />
              </div>
              <div>
                <label className="block mb-2">Name on Card:</label>
                <input
                  type="text"
                  value={form.name_on_card}
                  onChange={(e) =>
                    setForm({ ...form, name_on_card: e.target.value })
                  }
                  placeholder="Jane Doe"
                  required
                  className="border p-2 w-full mb-4"
                />
              </div>
              <div className="flex gap-4 ">
                <div>
                  <label className="block mb-2">Expire Month:</label>
                  <input
                    type="text"
                    value={form.expire_month}
                    onChange={handleExpireMonthChange}
                    min="1"
                    max="12"
                    placeholder="MM"
                    required
                    className="border p-2 w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2">Expire Year:</label>
                  <input
                    type="text"
                    value={form.expire_year}
                    onChange={handleExpireYearChange}
                    placeholder="YYYY"
                    required
                    className="border p-2 w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2">CVV:</label>
                  <input
                    type="number"
                    value={form.cvv}
                    onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                    maxLength={3}
                    placeholder="***"
                    required
                    className="border p-2 w-full mb-4"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-primary-color mt-4 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update Card
              </button>
              <button
                className="bg-danger-text-color ml-4 text-white px-4 py-2 rounded hover:bg-red-70"
                onClick={() => {
                  setIsFormVisible(false);
                }}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      )}

      {/* Kartların listesi */}
    </div>
  );
};

export default CreditCardManager;
