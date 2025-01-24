import { toast } from "react-toastify";
import request from "../functions/request";
import { capitalize, response, where } from "../functions/global";

// function to fetch all course records
async function all(token, set, handler, only = false) {
    handler.setLoading(loading => !loading);
    handler.setComponentLoaded(false);
    try {
        const responseData = response(await request.get('/answers', token), false, true);
        if (responseData) {
            if (only) set(where(responseData.answers, only)[0]);
            else set(responseData.answers);
        };
    }
    catch (error) { toast.error(capitalize(error.message)); }
    finally {
        handler.setLoading(loading => !loading);
        handler.setComponentLoaded(true);
    }
}

async function show(id, token, set, handler) {
    handler.setLoading(loading => !loading);
    try {
        const responseData = response(await request.get(`/answers/${id}`, token), false, true);
        responseData && set(responseData.answer);
    }
    catch (error) { toast.error(capitalize(error.message)); }
    finally { handler.setLoading(loading => !loading); }
}

async function store(token, data, handler) {
    handler.setLoading(loading => !loading);
    try {
        response(await request.post('/answers/', data, token), handler.setValidationErrors);
    }
    catch (error) {
        toast.error(capitalize(error.message));
    }
    finally { handler.setLoading(loading => !loading); }

}

export default { all, show, store };