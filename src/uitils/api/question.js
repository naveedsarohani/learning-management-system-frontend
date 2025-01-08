import { toast } from "react-toastify";
import request from "../functions/request";
import { capitalize, response, where } from "../functions/global";

// function to fetch all course records
async function all(token, set, handler, only = false) {
    handler.setLoading(loading => !loading);
    handler.setComponentLoaded(false);
    try {
        const responseData = response(await request.get('/questions', token), false, true);
        if (responseData) {
            if (only) set(where(responseData.questions, only));
            else set(responseData.questions);
        }
    }
    catch (error) { toast.error(capitalize(error.message)); }
    finally { handler.setLoading(loading => !loading);
        handler.setComponentLoaded(true); }
}

async function show(id, token, set, handler) {
    handler.setLoading(loading => !loading);
    try {
        const responseData = response(await request.get(`/questions/${id}`, token), false, true);
        responseData && set(responseData.question);
    }
    catch (error) { toast.error(capitalize(error.message)); }
    finally { handler.setLoading(loading => !loading); }
}

async function store(token, data, handler) {
    handler.setLoading(loading => !loading);
    try {
        response(await request.post('/questions/', data, token), handler.setValidationErrors);
        handler.navigate(-1);
    }
    catch (error) {
        toast.error(capitalize(error.message));
    }
    finally { handler.setLoading(loading => !loading); }
}

export default { all, show, store };