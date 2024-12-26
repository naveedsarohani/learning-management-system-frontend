import { useHandler } from "../../contexts/Handler"
import { useAuth } from "../../contexts/Authentication"
import auth from "../../uitils/api/auth"
import Form from "../../components/form/Form"
import InputField from "../../components/form/InputField"
import SubmitButton from "../../components/form/SubmitButton"
import { isLoading } from "../../uitils/functions/global"
import ActionButton from "../../components/global/ActionButton"

export default function UpdatePassword({ setHelper }) {
  const { handler } = useHandler()
  const {
    credentials: { token },
  } = useAuth()

  function handleSubmit(creds) {
    auth.updatePassword(creds, token, handler, setHelper)
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Update Password</h1>
      <h5 className="text-sm text-gray-600 mb-6">
        Using your old password, you can update your password
      </h5>

      <Form {...{ handleSubmit }}>
        <div className="space-y-4">
          <InputField
            type="password"
            name="old_password"
            placeholder="Enter your old password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />

          <InputField
            type="password"
            name="password"
            placeholder="Create a new password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />

          <InputField
            type="password"
            name="password_confirmation"
            placeholder="Confirm your new password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />

          <div className="flex items-center gap-4 mt-4">
            <SubmitButton
              name={isLoading(handler, "Save")}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            />
            <ActionButton
              name="Cancel"
              onClick={() =>
                setHelper((pre) => ({ ...pre, isPassUpdate: false }))
              }
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            />
          </div>
        </div>
      </Form>
    </div>
  )
}
