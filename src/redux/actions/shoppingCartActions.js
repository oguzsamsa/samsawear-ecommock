import { SET_CART, SET_PAYMENT, SET_ADDRESS, ADD_TO_CART, TOGGLE_CART_DROPDOWN, CART_QUANTITY_INCREASE, CART_QUANTITY_DECREASE, REMOVE_ITEM, TOGGLE_SELECT_ITEM } from './actionTypes';

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

export const cartQuantityIncrease = (productId) => ({
  type: CART_QUANTITY_INCREASE,
  payload: productId
})

export const cartQuantityDecrease = (productId) => ({
  type: CART_QUANTITY_DECREASE,
  payload: productId
})

export const removeItem = (productId) => ({
  type: REMOVE_ITEM,
  payload: productId
});

export const toggleSelectItem = (productId) => ({
  type: TOGGLE_SELECT_ITEM,
  payload: productId
});

