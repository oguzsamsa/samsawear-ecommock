import axiosInstance from "../../axios/axiosInstance";
import { setRoles } from "./clientActions";

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