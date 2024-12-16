import { toast } from "react-toastify";
import request from "../functions/request";
import { response } from "../functions/global";

// function to fetch all course records
async function all(token, set, handler) {
    handler.setLoading(loading => !loading);
    try {
        const responseData = response(await request.get('/questions', token));
        responseData && set(responseData.questions);
    }
    catch (error) { toast.error(error.message); }
    finally { handler.setLoading(loading => !loading); }
}

async function show(id, token, set, handler) {
    handler.setLoading(loading => !loading);
    try {
        const responseData = response(await request.get(`/questions/${id}`, token));
        responseData && set(responseData.question);
    }
    catch (error) { toast.error(error.message); }
    finally { handler.setLoading(loading => !loading); }
}

async function store(token, data, handler) {
    handler.setLoading(loading => !loading);
    try {
        response(await request.post('/questions/', data, token), handler.setValidationErrors);
    }
    catch (error) {
        toast.error(error.message);
    }
    finally { handler.setLoading(loading => !loading); }

}

async function update(id, data, token, handler) {
    handler.setLoading(loading => !loading);
    try {
        response(await request.put(`/questions/${id}`, data, token), handler.setValidationErrors);
    } catch (error) { toast.error(error.message); }
    finally { handler.setLoading(loading => !loading); }

}
export default { all, show, store, update };