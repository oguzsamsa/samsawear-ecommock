import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE, SET_ADDRESSES, SET_BILLING_ADDRESSES } from '../actions/actionTypes';

const initialState = {
  user: {},
  addressList: [],
  billingAddressList: [],
  creditCards: [],
  roles: [],
  theme: '',
  language: '',
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_ROLES:
      return { ...state, roles: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    case SET_ADDRESSES:
      return {...state, addressList: action.payload};
    case SET_BILLING_ADDRESSES:
      return {...state, billingAddressList: [...state.billingAddressList, action.payload]};
    default:
      return state;
  }
};

export default clientReducer;
