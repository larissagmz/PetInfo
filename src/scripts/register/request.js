import { api } from "../../config/axios.js";

export const registerRequest = async (user) => {
    try {
        const response = await api.post("/users/create", user);

        return response;
    } catch (error) {
        throw error;
    }
};
