import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
    const isErrorExpected = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!isErrorExpected) {
        toast.error("something went wrong");
    }
    return Promise.reject(error);
});


const setJwt = token => {
    axios.defaults.headers.common["Authorization"] = token ? "Bearer " + token : null; // fixes bi-directional dependecies problem
}

export default {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put,
    setJwt
};