import { toast } from "react-toastify"
import { useHandler } from "../../contexts/Handler"
import { capEach, isLoading, response } from "../../uitils/functions/global"
import request from "../../uitils/functions/request"
import { useDelete } from "../../contexts/Delete"
import { useAuth } from "../../contexts/Authentication"

export function DeleteModal() {
  const { handler } = useHandler()
  const {
    credentials: { token },
  } = useAuth()
  const {
    deletion: { route, id, identity, set },
    setIsDeleting,
  } = useDelete()

  async function handleDelete() {
    handler.setLoading(true)
    try {
      response(await request.delete(`${route}/${id}`, token))
      if (set) {
        if (set == -1) window.history.back();
        else set(pre => pre.filter(item => item.id != id));
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      handler.setLoading(false)
      setIsDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="modal bg-white p-[2rem] rounded-lg shadow-lg relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white rounded-t-lg p-4 absolute top-0 left-0 right-0">
          <h2 className="text-2xl font-bold ">Delete Confirmation</h2>
        </div>

        {/* Modal Content */}
        <div className="pt-[5rem]">
          {" "}
          {/* Added padding to avoid overlap with header */}
          <h3 className="text-xl">
            Are you sure do you want to delete the
            <strong className="pl-2">{capEach(identity)}</strong>?
          </h3>
          <div className="flex justify-end items-center pt-8">
            <button
              onClick={handleDelete}
              className="bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white py-2 px-4 rounded-md"
            >
              {isLoading(handler, "Confirm", "Deleting...")}
            </button>
            <button
              onClick={() => setIsDeleting(false)}
              className="bg-red-500 text-white py-2 px-4 rounded-md ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
