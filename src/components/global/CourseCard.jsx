import blueprint from "../../uitils/blueprint"
import { capEach, formatDate, readFile } from "../../uitils/functions/global"
import ActionButton from "./ActionButton"

export default function CourseCard({ course = blueprint.course, routePrefix = '' }) {
  return (
    <div
      key={course.id}
      className="w-80 cursor-pointer rounded-lg overflow-hidden shadow-md border bg-white hover:shadow-2xl transition-shadow duration-300 transform "
    >
      <div className="relative p-2 ">
        <img
          src={readFile(course.image)}
          alt="poster"
          className="w-full h-40 object-cover border-[1px] border-blue-200 rounded "
        />
      </div>
      <div className="p-4">
        <h1 className="text-md font-semibold text-gray-900 truncate">
          {course.title}
        </h1>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {course.description}
        </p>
        <div>
          <span className="text-xs text-gray-500 mt-3 flex gap-1 items-center">
            <p>Last Update</p>
            {formatDate(course.updated_at)}
          </span>
          <span className="text-xs text-gray-500 mt-3 flex gap-1 items-center">
            <p>By</p>
            {capEach(course.user.name)}
          </span>
        </div>

        <ActionButton
          name={"see course"}
          route={`${routePrefix}/courses/${course.id}`}
          color="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded mt-3 shadow-md hover:shadow-lg"
        />
      </div>
    </div>
  )
}
