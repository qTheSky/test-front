import axios from "axios";

export const instance = axios.create({
    // baseURL: 'http://localhost:4200',
    baseURL: 'https://test-back-vert.vercel.app/',
})