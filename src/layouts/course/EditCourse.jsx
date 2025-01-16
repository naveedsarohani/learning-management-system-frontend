import { useEffect, useState } from "react"
import DashboardPageCompement from "../../components/global/DashboardPage"
import blueprint from "../../uitils/blueprint"
import courseapi from "../../uitils/api/course"
import Form from "../../components/form/Form"
import InputField from "../../components/form/InputField"
import { useParams } from "react-router-dom"
import { useHandler } from "../../contexts/Handler"
import SubmitButton from "../../components/form/SubmitButton"
import { useAuth } from "../../contexts/Authentication"
import {
  extractExcept,
  handleImagePreview,
  isLoading,
  isNullOrEmpty,
} from "../../uitils/functions/global"
import TextArea from "../../components/form/TextArea"
import UpdateImagePreview from "../../components/global/UpdateImagePreview"

export default function EditCourse() {
  const [course, setCourse] = useState(blueprint.course)
  const {
    credentials: { token, user },
  } = useAuth()
  const { handler } = useHandler()
  const { courseId } = useParams()

  function handleSubmit(data) {
    if (isNullOrEmpty(data.image.name)) {
      data = extractExcept(data, ["image"])
    }

    courseapi.update(courseId, data, token, handler)
  }

  useEffect(() => {
    courseapi.show(courseId, token, setCourse, handler)
  }, [])

  return (
    handler.componentLoaded && (
      <DashboardPageCompement title={"edit course"}>
        <div className="p-6 bg-gray-50  flex justify-center items-center">
          <div className=" w-full bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-center text-xl font-semibold"> Edit Course</h1>

            <Form {...{ handleSubmit }}>
              <div className="flex justify-between items-center pr-5">
                <div>
                  <InputField
                    name={"title"}
                    value={course.title}
                    set={setCourse}
                    placeholder={"Course title"}
                  />

                  <InputField
                    type={"file"}
                    name={"image"}
                    customeFunc={handleImagePreview}
                    accept={".jpg,.jpeg,.png"}
                  />
                </div>
                <div className="w-48 border border-gray-300 rounded-lg bg-gray-100 pt-4 px-4 pb-2 shadow-sm">
                  <UpdateImagePreview currentImage={course.image} />
                  <h2 className="text-sm text-gray-800 text-center">
                    Poster Preview
                  </h2>
                </div>
              </div>
              <TextArea
                name={"description"}
                value={course.description}
                set={setCourse}
                placeholder={"Course description..."}
              />

              <InputField type={"hidden"} name={"user_id"} value={user.id} />

              <div className="text-center">
                <SubmitButton name={isLoading(handler, "Save Course")} />
              </div>
            </Form>

            {/* Iamge preview */}
          </div>
        </div>
      </DashboardPageCompement>
    )
  )
}
