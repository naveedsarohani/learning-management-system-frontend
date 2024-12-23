import { toast } from "react-toastify";
import { useHandler } from "../../contexts/Handler"
import { capEach, isLoading, response } from "../../uitils/functions/global";
import request from "../../uitils/functions/request";
import { useDelete } from "../../contexts/Delete";
import { useAuth } from "../../contexts/Authentication";

export function DeleteModal() {
    const { handler } = useHandler();
    const { credentials: { token } } = useAuth();
    const { deletion: { route, id, identity }, setIsDeleting, setIsDeleted } = useDelete();

    async function handleDelete() {
        handler.setLoading(true);
        try {
            response(await request.delete(`${route}/${id}`, token));
            setIsDeleted(true);
        } catch (error) { toast.error(error.message) }
        finally {
            handler.setLoading(false);
            setIsDeleting(false);
        }
    }

    // return <div className="h-screen bg-gray-300 text-center flex justify-center items-center bg-transparent absolut ">
    return <div>
        <div className="modal">
            <h3>Are you sure do you want to delete the <strong>{capEach(identity)}</strong>?</h3>
            <button onClick={handleDelete}>{isLoading(handler, "Confirm", "Deleting...")}</button>
            <button onClick={() => setIsDeleting(false)}>Cancel</button>
        </div>
    </div>
}