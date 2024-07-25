import { SET_CART, SET_PAYMENT, SET_ADDRESS, ADD_TO_CART, TOGGLE_CART_DROPDOWN } from '../actions/actionTypes';

const initialState = {
  cart: [],
  payment: {},
  address: {},
  isDropdownOpen: false
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload };
    case SET_PAYMENT:
      return { ...state, payment: action.payload };
    case SET_ADDRESS:
      return { ...state, address: action.payload };
    case ADD_TO_CART:
        const product = action.payload;
        const existingProductIndex = state.cart.findIndex(item => item.product.id === product.id);
  
        if (existingProductIndex >= 0) {
          // Eğer ürün zaten varsa, ürün sayısını artır
          const updatedCart = state.cart.map((item, index) => {
            if (index === existingProductIndex) {
              return {
                ...item,
                count: item.count + 1
              };
            }
            return item;
          });
  
          return {
            ...state,
            cart: updatedCart
          };
        } else {
          // Ürün yoksa, yeni ürünü ekle
          return {
            ...state,
            cart: [...state.cart, { count: 1, checked: true, product }]
          };
        };
    case TOGGLE_CART_DROPDOWN:
      return {
        ...state,
        isDropdownOpen: !state.isDropdownOpen
        };
    default:
      return state;
  }
};

export default shoppingCartReducer;
