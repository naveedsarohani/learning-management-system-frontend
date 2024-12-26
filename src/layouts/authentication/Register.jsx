import { useHandler } from "../../contexts/Handler"
import { useAuth } from "../../contexts/Authentication"
import auth from "../../uitils/api/auth"
import Form from "../../components/form/Form"
import InputField from "../../components/form/InputField"
import SubmitButton from "../../components/form/SubmitButton"
import SelectField from "../../components/form/SelectField"
import { role } from "../../uitils/functions/constants"
import { isLoading } from "../../uitils/functions/global"
import sideImage from "../../assets/curved-6.jpg"
import { useState } from "react"

export default function Register() {
  const { handler } = useHandler()
  const { user } = useAuth()

  function handleSubmit(creds) {
    auth.register(creds, handler, user)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:block md:w-1/2 relative ">
        <div className="absolute inset-0 rotate-180">
          <div
            className="w-full h-full bg-cover bg-center clip-slash"
            style={{
              backgroundImage: `url('${sideImage}')`,
            }}
          ></div>
        </div>
      </div>
      <div className="flex flex-col justify-center  items-center md:w-1/2 px-6 py-8 bg-white">
        <div className=" max-w-[20rem] w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-[#21bffd] to-[#217bfe] bg-clip-text text-transparent">
            Register
          </h2>
          <p className="text-sm text-gray-600 mb-1">
            Fill out the details to register yourself
          </p>

          <Form {...{ handleSubmit }} className="space-y-4">
            <div className="mb-1">
              <InputField
                name={"name"}
                placeholder={"enter your name"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 mt-4"
              />
            </div>
            <div className="mb-1">
              <InputField
                name={"email"}
                placeholder={"enter your email address"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 mt-4"
              />
            </div>
            <div className="mb-1">
              <SelectField
                name={"role"}
                data={[role.INSTRUCTOR, role.STUDENT]}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 mt-4"
              />
            </div>
            <div className="mb-1">
              <InputField
                type={"password"}
                name={"password"}
                placeholder={"enter your password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 mt-4"
              />
            </div>
            <div className="mb-1">
              <InputField
                type={"password"}
                name={"password_confirmation"}
                placeholder={"confirma your password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 mt-4"
              />
            </div>
            <div className="mb-1">
              <InputField
                type={"file"}
                name={"image"}
                accept={".jpg,jpeg,.png"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 mt-4"
              />
            </div>


            <SubmitButton
              color="font-bold mt-3 w-full bg-gradient-to-r from-[#21bffd] to-[#217bfe]  text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
              name={isLoading(handler, "Finish Registration")}
            />
          </Form>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?
            <a
              href="/auth/login"
              className="bg-gradient-to-r from-[#21bffd] to-[#217bfe] bg-clip-text text-transparent hover:underline font-medium"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
