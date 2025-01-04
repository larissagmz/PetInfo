import { api } from "../../config/axios.js";

export const getPosts = async (token) => {
    try {
        const response = await api.get("/posts", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUser = async (token) => {
    try {
        const response = await api.get("/users/profile", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createPost = async (token, payload) => {
    try {
        const response = await api.post("/posts/create", payload, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deletePostRequest = async (token, id) => {
    try {
        const response = await api.delete(`/posts/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const editPostRequest = async (token, id, post) => {
    try {
        const response = await api.patch(`/posts/${id}`, post, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPost = async (token, id) => {
    try {
        const response = await api.get(`/posts/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
