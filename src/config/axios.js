import axios from "https://cdn.skypack.dev/axios";

export const api = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 7000,
});
