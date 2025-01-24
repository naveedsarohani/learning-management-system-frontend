import { toast } from "react-toastify";
import request from "../functions/request";
import { capitalize, response, where } from "../functions/global";

// function to fetch all course records
async function all(token, set, handler, only = false) {
    handler.setLoading(loading => !loading);
    handler.setComponentLoaded(false);
    try {
        const responseData = response(await request.get('/exam-submissions', token), false, true);
        if (responseData) {
            if (only) set(where(responseData.examSubmissions, only));
            else set(responseData.examSubmissions);
        }
    }
    catch (error) { toast.error(capitalize(error.message)); }
    finally {
        handler.setLoading(loading => !loading);
        handler.setComponentLoaded(true);
    }
}

async function show(id, token, set, handler) {
    handler.setLoading(loading => !loading);
    handler.setComponentLoaded(false);
    try {
        const responseData = response(await request.get(`/exam-submissions/${id}`, token), false, true);
        responseData && set(responseData.examSubmission);
    }
    catch (error) { toast.error(capitalize(error.message)); }
    finally {
        handler.setLoading(loading => !loading);
        handler.setComponentLoaded(true);
    }
}

async function store(token, data, handler) {
    handler.setLoading(loading => !loading);
    try {
        response(await request.post('/exam-submissions/', data, token), handler.setValidationErrors);
    }
    catch (error) {
        toast.error(capitalize(error.message));
    }
    finally { handler.setLoading(loading => !loading); }
}

async function update(id, data, token, handler) {
    handler.setLoading(loading => !loading);
    try {
        response(await request.put(`/exam-submissions/${id}`, data, token), handler.setValidationErrors);
        handler.navigate(-1);
    } catch (error) { toast.error(capitalize(error.message)); }
    finally { handler.setLoading(loading => !loading); }

}
export default { all, show, store, update };