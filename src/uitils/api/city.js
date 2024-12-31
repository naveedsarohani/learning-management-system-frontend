import { toast } from "react-toastify";
import request from "../functions/request";
import { response } from "../functions/global";

// function to fetch all course records
async function all(set, handler) {
    handler.setLoading(loading => !loading);
    try {
        const responseData = response(await request.get('/cities'), false, true);
        responseData && set(responseData.cities);
    }
    catch (error) { toast.error(error.message); }
    finally { handler.setLoading(loading => !loading); }
}

export default { all };