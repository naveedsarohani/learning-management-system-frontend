import { toast } from "react-toastify";
import { response, roleBaseRedirection, where } from "../functions/global";
import request from "../functions/request";

// function to fetch all course records
async function users(token, set, only = false) {
    try {
        const responseData = response(await request.get('/auth/users', token), false, true);
        if (responseData) {
            if (only) set(where(Object.values(responseData.users), only));
            else set(Object.values(responseData.users));
        };
    }
    catch (error) { toast.error(error.message); }
}

// function to login
async function register(data, handler) {
    handler.setLoading(loading => !loading);

    try {
        response(await request.post('/auth/register', data), handler.setValidationErrors);
    } catch (error) {
        toast.error(error.message);
    } finally {
        handler.setLoading(loading => !loading);
    }
}

// function to login
async function login(data, handler, user) {
    handler.setLoading(loading => !loading);

    try {
        const responseData = response(await request.post('/auth/login', data), handler.setValidationErrors);

        if (responseData) {
            user.save(responseData.user, responseData.auth_token);
            roleBaseRedirection(responseData.user.role, handler.navigate);
        }
    } catch (error) {
        toast.error(error.message);
    } finally {
        handler.setLoading(loading => !loading);
    }
}

// function to logout
async function logout(token, handler) {
    handler.setLoading(loading => !loading);

    try {
        response(await request.get('/auth/logout', token));
        handler.revoke();
        handler.navigate('auth/login', { replace: true });
    } catch (error) {
        toast.error(error.message);
    } finally {
        handler.setLoading(loading => !loading);
    }
}

// function to login
async function updatePassword(data, token, handler) {
    handler.setLoading(loading => !loading);

    try {
        response(await request.post('/auth/update-password', data, token), handler.setValidationErrors);
    } catch (error) {
        toast.error(error.message);
    } finally {
        handler.setLoading(loading => !loading);
    }
}

export default { users, register, login, logout, updatePassword }