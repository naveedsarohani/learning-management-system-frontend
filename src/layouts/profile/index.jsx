import { useState } from "react"
import ActionButton from "../../components/global/ActionButton"
import {
  capEach,
  handleImagePreview,
  isNullOrEmpty,
  readFile,
} from "../../uitils/functions/global"
import Form from "../../components/form/Form"
import InputField from "../../components/form/InputField"
import SubmitButton from "../../components/form/SubmitButton"
import { useAuth } from "../../contexts/Authentication"
import UpdateImagePreview from "../../components/global/UpdateImagePreview"
import UpdatePassword from "./UpdatePassword"
import auth from "../../uitils/api/auth"
import { useHandler } from "../../contexts/Handler"

export default function ProfilePage() {
  const { credentials, user } = useAuth()
  const [helper, setHelper] = useState({
    name: false,
    image: false,
    isPassUpdate: false,
  })
  const [authUser, setAuthUser] = useState(credentials.user)
  const { handler } = useHandler()

  function handleSubmit(data) {
    if (Object.keys(data)[0] == "image") {
      if (isNullOrEmpty(data.image.name)) {
        data.image = ""
      }
    }
    auth.update(data, credentials.token, handler, {
      setHelper,
      user,
      token: credentials.token,
      target: [Object.keys(data)[0]],
    })
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          {!helper.name ? (
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">
                {capEach(authUser.name)}
              </h1>
              <ActionButton
                name="Edit"
                onClick={() => setHelper({ ...helper, name: true })}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              />
            </div>
          ) : (
            <div>
              <Form handleSubmit={handleSubmit}>
                <div className="space-y-4">
                  <InputField
                    name="name"
                    value={authUser.name}
                    set={setAuthUser}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <div className="flex items-center gap-4">
                    <SubmitButton
                      name="Save Changes"
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    />
                    <ActionButton
                      name="Cancel"
                      onClick={() => setHelper({ ...helper, name: false })}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    />
                  </div>
                </div>
              </Form>
            </div>
          )}
        </div>

        <div className="p-6 flex items-center gap-4">
          <UpdateImagePreview
            currentImage={authUser.image}
            classes="w-20 rounded-full"
          />
          {helper.image ? (
            <div className="w-full">
              <Form handleSubmit={handleSubmit}>
                <div className="space-y-4">
                  <InputField
                    type="file"
                    name="image"
                    accept=".jpg,.png,.jpeg"
                    customeFunc={handleImagePreview}
                    className="block w-full text-sm text-gray-500 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <div className="flex items-center gap-4">
                    <SubmitButton
                      name="Upload Picture"
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    />
                    <ActionButton
                      name="Cancel"
                      onClick={() => setHelper({ ...helper, image: false })}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    />
                  </div>
                </div>
              </Form>
            </div>
          ) : (
            <ActionButton
              name="Update Profile Picture"
              onClick={() => setHelper({ ...helper, image: true })}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            />
          )}
        </div>

        <div className="p-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <strong>Email:</strong> {authUser.email}
          </p>
          <p className="text-sm text-gray-600">
            <strong>City:</strong> {authUser.city.name}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Role:</strong> {authUser.role}
          </p>
        </div>

        <div className="p-6 border-t border-gray-200">
          {helper.isPassUpdate ? (
            <div>
              <UpdatePassword setHelper={setHelper} />
            </div>
          ) : (
            <div className="text-center">
              <ActionButton
                name="Update Password"
                onClick={() => setHelper({ ...helper, isPassUpdate: true })}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
