import { SET_CART, SET_PAYMENT, SET_ADDRESS, ADD_TO_CART, TOGGLE_CART_DROPDOWN } from './actionTypes';

export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
})


export const toggleCartDropdown = () => ({
  type: TOGGLE_CART_DROPDOWN
});