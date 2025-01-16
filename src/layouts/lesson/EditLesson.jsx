import { useEffect, useState } from "react"
import DashboardPageCompement from "../../components/global/DashboardPage"
import blueprint from "../../uitils/blueprint"
import Form from "../../components/form/Form"
import InputField from "../../components/form/InputField"
import { useParams } from "react-router-dom"
import { useHandler } from "../../contexts/Handler"
import SubmitButton from "../../components/form/SubmitButton"
import { useAuth } from "../../contexts/Authentication"
import {
  extractExcept,
  handleVideoPreview,
  isLoading,
  isNullOrEmpty,
} from "../../uitils/functions/global"
import lessonapi from "../../uitils/api/lesson"
import UpdateVideoPreview from "../../components/global/UpdatevideoPreview"

export default function EditLesson() {
  const [lesson, setLesson] = useState(blueprint.lesson)
  const {
    credentials: { token },
  } = useAuth()
  const { handler } = useHandler()
  const { lessonId } = useParams()

  function handleSubmit(data) {
    if (isNullOrEmpty(data.content.name)) {
      data = extractExcept(data, ["content"])
    }

    lessonapi.update(lessonId, data, token, handler)
  }

  useEffect(() => {
    lessonapi.show(lessonId, token, setLesson, handler)
  }, [])

  return (
    handler.componentLoaded && (
      <DashboardPageCompement title={"edit lesson"}>
        <div className="p-6 bg-gray-50  flex justify-center items-center">
          <div className="w-full bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Edit Lesson
            </h1>
            <Form {...{ handleSubmit }}>
              {/* Title Field */}
              <div className="mb-4">
                <InputField
                  type={"text"}
                  name={"title"}
                  value={lesson.title}
                  set={setLesson}
                />
              </div>

              {/* Content Field */}
              <div className="mb-4">
                <InputField
                  type={"file"}
                  name={"content"}
                  set={setLesson}
                  customeFunc={handleVideoPreview}
                  accept={".mp4,.3gp,mkv"}
                />
              </div>

              {/* Submit Button */}
              <SubmitButton
                name={isLoading(handler, "Save Lesson")}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out"
              />
            </Form>

            {/* Video Preview */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Video Preview
              </h2>
              <div className="w-80 border border-gray-300 rounded-lg bg-gray-100 p-4 shadow-sm">
                <UpdateVideoPreview currentVideo={lesson.content} />
              </div>
            </div>
          </div>
        </div>
      </DashboardPageCompement>
    )
  )
}
