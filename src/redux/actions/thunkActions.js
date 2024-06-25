// src/redux/actions/thunkActions.js
import axiosInstance from "../../axios/axiosInstance";
import { setRoles, setUser } from "./clientActions";
import { toast } from "react-toastify";

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
