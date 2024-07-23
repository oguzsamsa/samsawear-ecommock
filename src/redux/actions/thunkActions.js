// src/redux/actions/thunkActions.js
import axiosInstance from "../../axios/axiosInstance";
import { fetchCategoriesFailure, fetchCategoriesRequest, fetchCategoriesSuccess } from "./categoryActions";
import { setRoles, setUser } from "./clientActions";
import { toast } from "react-toastify";
import { setFetchState, setProductList, setTotal } from "./productActions";

export const fetchRoles = () => {
    return async (dispatch, getState) => {
        const state = getState();

        if (state.client.roles.length > 0) {
            return;
        }

        try {
            const response = await axiosInstance.get('/roles');
            const reversedRoles = response.data.reverse();
            dispatch(setRoles(reversedRoles));
        } catch (error) {
            console.error('Failed to fetch roles: ', error);
        }
    };
};

export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/login", { email, password });
            const userData = response.data;

            dispatch(setUser(userData));

            if (rememberMe) {
                localStorage.setItem("token", userData.token);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
            }

            toast.success("Login successful!");
        } catch (error) {
            toast.error("Login failed. Please check your email and password.");
            throw new Error(error.response?.data?.message || "Login failed");
        }
    };
};

export const verifyToken = (history) => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");

        if (token) {
            axiosInstance.defaults.headers.common["Authorization"] = token;


        }
        
        try {
            const response = await axiosInstance.get("/verify");
            const user = response.data;
            dispatch(setUser(user));
            localStorage.setItem("token", user.token);
            axiosInstance.defaults.headers["Authorization"] = user.token

        } catch (error) {
            console.error("Token verification failed:", error);
            localStorage.removeItem("token");
            delete axiosInstance.defaults.headers["Authorization"];
            history.push("/login")
        }
    };
};

export const fetchCategories = () => {
    return async (dispatch) => {
        dispatch(fetchCategoriesRequest());

        try {
            const response = await axiosInstance.get('categories');
            dispatch(fetchCategoriesSuccess(response.data));
        } catch(error) {
            dispatch(fetchCategoriesFailure(error.message));     
        }
    }
}

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const state = getState().product;
        const { categoryId, sort, filterText, limit, offset } = state;
        dispatch(setFetchState('FETCHING'));

        try {
            let query = `limit=${limit}&offset=${offset}`;
            if (categoryId) query += `&category=${categoryId}`;
            if (filterText) query += `&filter=${filterText}`;
            if (sort) query += `&sort=${sort}`;

            const response = await axiosInstance.get(`/products?${query}`);
            const { total, products } = response.data;
            dispatch(setProductList(products));
            dispatch(setTotal(total));
            dispatch(setFetchState('FETCHED'));

        } catch (error) {
            console.error("Failed to fetch products: ", error);
            dispatch(setFetchState('FETCH_ERROR'));
        }
    }
}



