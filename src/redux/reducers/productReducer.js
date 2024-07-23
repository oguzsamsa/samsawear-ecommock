import {
    SET_CATEGORIES,
    SET_PRODUCT_LIST,
    SET_TOTAL,
    SET_FETCH_STATE,
    SET_LIMIT,
    SET_OFFSET,
    SET_FILTER,
    SET_SORT,
    SET_CATEGORY_ID,
    SET_FILTER_TEXT,
  } from '../actions/actionTypes';
  
  const initialState = {
    categories: [],
    productList: [],
    total: 0,
    limit: 25,
    offset: 0,
    sort: '',
    categoryId: '',
    filterText: '',
    fetchState: 'NOT_FETCHED',
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CATEGORIES:
        return { ...state, categories: action.payload };
      case SET_PRODUCT_LIST:
        return { ...state, productList: action.payload };
      case SET_TOTAL:
        return { ...state, total: action.payload };
      case SET_FETCH_STATE:
        return { ...state, fetchState: action.payload };
      case SET_LIMIT:
        return { ...state, limit: action.payload };
      case SET_OFFSET:
        return { ...state, offset: action.payload };
      case SET_FILTER:
        return { ...state, filter: action.payload };
      case SET_SORT:
        return { ...state, sort: action.payload};
      case SET_CATEGORY_ID:
        return { ...state, categoryId: action.payload };
      case SET_FILTER_TEXT:
        return { ...state, filterText: action.payload };
      default:
        return state;
    }
  };
  
  export default productReducer;
  