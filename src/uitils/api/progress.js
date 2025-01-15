import { toast } from "react-toastify";
import request from "../functions/request";
import { capitalize, isNullOrEmpty, response, where } from "../functions/global";

// function to fetch all course records
async function all(token, set, handler, options = false) {
    handler.setLoading(loading => !loading);
    handler.setComponentLoaded(false);
    try {
        const responseData = response(await request.get('/progresses', token), false, true);
        if (responseData) {
            if (only) set(where(responseData.progresses, only));
            else set(responseData.progresses);
        }
    }
    catch (error) { toast.error(capitalize(error.message)); }
    finally {
        handler.setLoading(loading => !loading);
        handler.setComponentLoaded(true);
    }
}

async function show(courseId, token, set, handler) {
    handler.setLoading(loading => !loading);
    try {
        const responseData = response(await request.get(`/progresses/${courseId}`, token), false, true);
        !isNullOrEmpty(responseData.progresses) && set(responseData.progresses[0]);
    }
    catch (error) { toast.error(capitalize(error.message)); }
    finally {
        handler.setLoading(loading => !loading);
    }
}

async function initiate(token, data, handler) {
    handler.setLoading(loading => !loading);
    try {
        response(await request.post('/progresses/', data, token), handler.setValidationErrors, true);
    }
    catch (error) {
        toast.error(capitalize(error.message));
    }
    finally { handler.setLoading(loading => !loading); }
}

async function update(id, data, token, handler) {
    handler.setLoading(loading => !loading);
    try {
        response(await request.put(`/progresses/${id}`, data, token), handler.setValidationErrors, true);
    } catch (error) { toast.error(capitalize(error.message)); }
    finally { handler.setLoading(loading => !loading); }
}

export default { all, show, initiate, update };