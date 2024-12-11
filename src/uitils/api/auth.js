import { toast } from "react-toastify";
import { response, roleBaseRedirection } from "../functions/global";
import request from "../functions/request";
import { role } from "../functions/constants";

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

export default { login, logout }