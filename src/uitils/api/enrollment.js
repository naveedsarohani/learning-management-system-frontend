import { toast } from "react-toastify";
import request from "../functions/request";
import { response, where } from "../functions/global";

// function to fetch all course records
async function all(token, set, handler, only = false) {
    handler.setLoading(loading => !loading);
    try {
        const responseData = response(await request.get('/enrollments', token), false, true);
        if (responseData) {
            if (only) set(where(responseData.enrollments, only));
            else set(responseData.enrollments);
        }
    }
    catch (error) { toast.error(error.message); }
    finally { handler.setLoading(loading => !loading); }
}

async function show(id, token, set, handler) {
    handler.setLoading(loading => !loading);
    try {
        const responseData = response(await request.get(`/enrollments/${id}`, token), false, true);
        responseData && set(responseData.enrollment);
    }
    catch (error) { toast.error(error.message); }
    finally { handler.setLoading(loading => !loading); }
}

async function store(token, data, handler) {
    handler.setLoading(loading => !loading);
    try {
        response(await request.post('/enrollments', data, token), handler.setValidationErrors);
        return true;
    }
    catch (error) {
        toast.error(error.message);
        return false;
    }
    finally { handler.setLoading(loading => !loading); }
}

export default { all, show, store };