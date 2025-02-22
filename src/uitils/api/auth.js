import { toast } from "react-toastify";
import { capitalize, isNullOrEmpty, response, roleBaseRedirection, where } from "../functions/global";
import request from "../functions/request";

// function to fetch all course records
async function users(token, set, handler, only = false) {
    handler.setLoading(loading => !loading);
    handler.setComponentLoaded(false);
    try {
        const responseData = response(await request.get('/auth/users', token), false, true);
        if (responseData) {
            if (only) set(where(Object.values(responseData.users), only));
            else set(Object.values(responseData.users));
        };
    }
    catch (error) { toast.error(capitalize(error.message)); }
    finally {
        handler.setLoading(loading => !loading);
        handler.setComponentLoaded(true);
    }
}

// function to login
async function register(data, handler) {
    handler.setLoading(loading => !loading);

    try {
        response(await request.post('/auth/register', data), handler.setValidationErrors);
        handler.navigate('/auth/login');
    } catch (error) {
        toast.error(capitalize(error.message));
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
        toast.error(capitalize(error.message));
    } finally {
        handler.setLoading(loading => !loading);
    }
}

// function to logout
async function logout(token, handler) {
    handler.setLoading(loading => !loading);

    try {
        response(await request.get('/auth/logout', token));
        handler.navigate('auth/login', { replace: true });
    } catch (error) {
        console.log(error.message);
    } finally {
        handler.revoke();
        handler.setLoading(loading => !loading);
    }
}

// function to update details
async function update(data, token, handler, options = {}) {
    handler.setLoading(loading => !loading);
    try {
        const responseData = response(await request.put('/auth/update', data, token), handler.setValidationErrors);
        if (!isNullOrEmpty(responseData.user)) {
            options.user.save(responseData.user, options.token);
        }

        options.setHelper(pre => ({ ...pre, [options.target]: false, }));
    } catch (error) { toast.error(capitalize(error.message)); }
    finally { handler.setLoading(loading => !loading); }
}

// function to login
async function updatePassword(data, token, handler, setHelper) {
    handler.setLoading(loading => !loading);

    try {
        response(await request.post('/auth/update-password', data, token), handler.setValidationErrors);
        setHelper(pre => ({ ...pre, isPassUpdate: false, }))
    } catch (error) {
        toast.error(capitalize(error.message));
    } finally {
        handler.setLoading(loading => !loading);
    }
}

export default { users, register, login, logout, update, updatePassword }