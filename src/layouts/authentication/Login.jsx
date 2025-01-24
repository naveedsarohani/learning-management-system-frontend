import { useHandler } from "../../contexts/Handler"
import { useAuth } from "../../contexts/Authentication"
import auth from "../../uitils/api/auth"
import { isLoading } from "../../uitils/functions/global"
import Form from "../../components/form/Form"
import InputField from "../../components/form/InputField"
import SubmitButton from "../../components/form/SubmitButton"
import sideImage from "../../assets/curved-6.jpg"

export default function Login() {
  const { handler } = useHandler()
  const { user, credentials } = useAuth()

  function handleSubmit(creds) {
    auth.login(creds, handler, user)
  }

  return (
    !credentials.user.name && (
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="flex flex-col justify-center  items-center md:w-1/2 px-6 py-12 bg-white">
          <div className=" max-w-[20rem] w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-[#21bffd] to-[#217bfe] bg-clip-text text-transparent">
              Welcome back
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              Enter your email and password to sign in
            </p>

            <Form {...{ handleSubmit }} className="space-y-4  ">
              <div className="mb-2">
                <InputField
                  showLabel={false}
                  name={"email"}
                  placeholder={"enter your email address"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 mt-4"
                />
              </div>
              <div className="mb-8">
                <InputField
                  showLabel={false}
                  type={"password"}
                  name={"password"}
                  placeholder={"enter your password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 mt-4"
                />
              </div>
              <SubmitButton
                color="font-bold w-full bg-gradient-to-r from-[#21bffd] to-[#217bfe]  text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                name={isLoading(handler, "SIGN IN")}
              />
            </Form>
            {/* Footer Message */}
            <p className="text-sm text-gray-600 mt-6 text-center">
              Don't have an account?{" "}
              <a
                href="/auth/register"
                className="bg-gradient-to-r from-[#21bffd] to-[#217bfe] bg-clip-text text-transparent hover:underline font-medium"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
        <div className="hidden md:block md:w-1/2 relative">
          <div className="absolute inset-0">
            <div
              className="w-full h-full bg-cover bg-center clip-slash"
              style={{
                backgroundImage: `url('${sideImage}')`,
              }}
            ></div>
          </div>
        </div>
      </div>
    )
  )
}
