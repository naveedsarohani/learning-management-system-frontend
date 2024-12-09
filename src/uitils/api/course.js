import { toast } from "react-toastify";
import request from "../functions/request";
import { response } from "../functions/global";

// function to fetch all course records
async function all(token, setCourses, handler) {
    handler.setLoading(loading => !loading);
    try {
        const responseData = response(await request.get('/courses', token));
        responseData && setCourses(responseData[1]);
        console.log(responseData);
    }
    catch (error) { toast.error(error.message); }
    finally { handler.setLoading(loading => !loading); }
}

function show(token, setCourses, setMessage, setLoading) {

}

function store(token, setCourses, setMessage, setLoading) {

}

function update(token, setCourses, setMessage, setLoading) {

}

function destory(token, setCourses, setMessage, setLoading) {

}

export default { all, show, store, update, destory };