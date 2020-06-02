import http from "./httpService";
import jwt from "jsonwebtoken";
import { baseUrl } from "../constants";

const jwtToken = "token";

const register = async account => {
    const { data: { token } } = await http.post(`${baseUrl}/api/auth/signup`, account);
    storeJwt(token);
};

const login = async account => {
    const { data: { token } } = await http.post(`${baseUrl}/api/auth/signin`, account)
    storeJwt(token);
};

const getCurrentUser = () => {
    const token = localStorage.getItem(jwtToken);
    if (!token) return null;
    return jwt.decode(token);
};

const getJwt = () => localStorage.getItem(jwtToken);

const storeJwt = (token) => localStorage.setItem(jwtToken, token)

const removeJwt = () => localStorage.removeItem(jwtToken);

http.setJwt(getJwt()); // fixes bi-directional dependecies problem

export default {
    login,
    register,
    getCurrentUser,
    removeJwt,
    getJwt
}
