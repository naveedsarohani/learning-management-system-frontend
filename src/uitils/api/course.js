import { toast } from "react-toastify";
import request from "../functions/request";
import { response } from "../functions/global";

// function to fetch all course records
async function all(token, setCourses, handler) {
    handler.setLoading(loading => !loading);
    try {
        const responseData = response(await request.get('/courses', token), false, true);
        responseData && setCourses(responseData[1]);
    }
    catch (error) { toast.error(error.message); }
    finally { handler.setLoading(loading => !loading); }
}

async function show(id, token, setCourse, handler) {
    handler.setLoading(loading => !loading);
    try {
        const responseData = response(await request.get(`/courses/${id}`, token), false, true);
        responseData && setCourse(responseData.course);
    }
    catch (error) { toast.error(error.message); }
    finally { handler.setLoading(loading => !loading); }
}

async function store(token, data, handler) {
    handler.setLoading(loading => !loading);
    try {
        response(await request.post('/courses', data, token), handler.setValidationErrors);
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
        response(await request.put(`/courses/${id}`, data, token), handler.setValidationErrors);
        handler.navigate(-1);
    } catch (error) { toast.error(error.message); }
    finally { handler.setLoading(loading => !loading); }

}

export default { all, show, store, update };