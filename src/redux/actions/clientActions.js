import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE, SET_ADDRESSES, SET_BILLING_ADDRESSES, DELETE_BILLING_ADDRESS } from './actionTypes';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const setAddresses = (addresses) => ({
  type: SET_ADDRESSES,
  payload: addresses,
});

export const setBillingAddresses = (billingAddress) => ({
  type: SET_BILLING_ADDRESSES,
  payload: billingAddress,
})

export const deleteBillingAddress = (address) => ({
  type: DELETE_BILLING_ADDRESS,
  payload: address
})
