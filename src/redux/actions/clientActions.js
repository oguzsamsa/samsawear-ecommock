import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE, SET_ADDRESSES } from './actionTypes';

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
