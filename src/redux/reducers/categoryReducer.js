import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE } from "../actions/actionTypes";

const initialState = {
    categories: [],
    fetchState: 'NOT_FETCHED',
    error: null,
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CATEGORIES_REQUEST:
        return { ...state, fetchState: 'LOADING' };
      case FETCH_CATEGORIES_SUCCESS:
        return { ...state, fetchState: 'SUCCEEDED', categories: action.payload };
      case FETCH_CATEGORIES_FAILURE:
        return { ...state, fetchState: 'FAILED', error: action.payload };
      default:
        return state;
    }
  };
  
  export default categoryReducer;