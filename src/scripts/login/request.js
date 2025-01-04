import { api } from "../../config/axios.js";

export const loginRequest = async (user) => {
    try {
        const response = await api.post("/login", user);

        return response.data.token;
    } catch (error) {
        throw error;
    }
};
