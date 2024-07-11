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
        
        try {
            const response = await axiosInstance.get("/verify");
            const user = response.data;

            dispatch(setUser(user));

            // Yeni token'i localStorage'a ve axios header'ına ekleyin
            localStorage.setItem("token", response.headers["authorization"]);
            axiosInstance.defaults.headers["Authorization"] = response.headers["authorization"];

            toast.success("Token verified successfully!");
        } catch (error) {
            console.error("Token verification failed:", error);
            // Token geçerli değilse localStorage'dan ve axios header'ından token'i silin
            localStorage.removeItem("token");
            delete axiosInstance.defaults.headers["Authorization"];
            toast.error("Token verification failed. Please login again.");

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
    return async (dispatch) => {
        dispatch(setFetchState('FETCHING'));

        try {
            const response = await axiosInstance.get('/products');
            const {total, products} = response.data;
            dispatch(setProductList(products));
            dispatch(setTotal(total));
            dispatch(setFetchState('FETCHED'));

        } catch(error){
            console.error("Failed to fetch products: ", error);
            dispatch(setFetchState('FETCH_ERROR'));
        }
    }
}



