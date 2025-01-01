import { toast } from "react-toastify";
import request from "../functions/request";
import { response, where } from "../functions/global";

// function to fetch all course records
async function all(token, set, handler, only = false) {
    handler.setLoading(loading => !loading);
    try {
        const responseData = response(await request.get('/exam-questions', token), false, true);
        if (responseData) {
            if (only) set(where(responseData.examQuestions, only));
            else set(responseData.examQuestions);
        }
    }
    catch (error) { toast.error(error.message); }
    finally { handler.setLoading(loading => !loading); }
}

async function show(id, token, set, handler) {
    handler.setLoading(loading => !loading);
    try {
        const responseData = response(await request.get(`/exam-questions/${id}`, token), false, true);
        responseData && set(responseData.examQuestion);
    }
    catch (error) { toast.error(error.message); }
    finally { handler.setLoading(loading => !loading); }
}

async function store(token, data, handler) {
    handler.setLoading(loading => !loading);
    try {
        response(await request.post('/exam-questions/', data, token), handler.setValidationErrors);
        handler.navigate(-1);
    }
    catch (error) {
        toast.error(error.message);
    }
    finally { handler.setLoading(loading => !loading); }

}

async function update(id, data, token, handler) {
    handler.setLoading(loading => !loading);
    try {
        response(await request.put(`/exam-questions/${id}`, data, token), handler.setValidationErrors);
        handler.navigate(-1);
    } catch (error) { toast.error(error.message); }
    finally { handler.setLoading(loading => !loading); }

}
export default { all, show, store, update };