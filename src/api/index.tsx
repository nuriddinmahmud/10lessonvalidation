import axios from "axios";

export const api = axios.create({
    baseURL: 'https://car-production-9848.up.railway.app'
})