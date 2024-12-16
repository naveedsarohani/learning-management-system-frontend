import axios from "axios";
import { getURL, response } from "./global";

// utility functions
function setConfig(token = null) {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
        },
    };

    token && (config.headers.Authorization = `Bearer ${token}`);

    return config;
}

// get 
async function get(route, token = null) {
    return await axios.get(getURL(route), {
        ...setConfig(token),
        validateStatus: () => true
    });
}

// post 
async function post(route, data, token = null) {
    return await axios.post(getURL(route), data, {
        ...setConfig(token),
        validateStatus: () => true
    });
}

// put 
async function put(route, data, token = null) {
    return await axios.post(getURL(route), { ...data, _method: 'put' }, {
        ...setConfig(token),
        validateStatus: () => true
    });
}

// delete
async function destory(route, token = null) {
    return await axios.post(getURL(route), { _method: 'delete' }, {
        ...setConfig(token),
        validateStatus: () => true
    });
}

export default { get, post, put, delete: destory, }