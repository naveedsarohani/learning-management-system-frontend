import { Link } from "react-router-dom"
import blueprint from "../../uitils/blueprint"
import { capEach, capitalize, formatDate, readFile } from "../../uitils/functions/global"
import ActionButton from "./ActionButton"

export default function CourseCard({
  course = blueprint.course,
  routePrefix = "",
}) {
  return (
    <div
      key={course.id}
      className="w-full sm:w-[22rem] flex flex-col cursor-pointer rounded-lg overflow-hidden shadow-md border bg-white hover:shadow-2xl transition-shadow duration-300 transform"
    >
      <div className="relative">
        <img
          src={readFile(course.image)}
          alt="poster"
          className="w-full h-44 object-cover border-b-[1px] border-blue-200"
        />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h1 className="text-md font-semibold text-gray-900 truncate">
          {capitalize(course.title)}
        </h1>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {capitalize(course.description)}
        </p>
        <div className="mt-auto">
          <span className="text-xs text-gray-500 flex gap-1 items-center">
            <p>Last Update:</p>
            {formatDate(course.updated_at)}
          </span>
          <span className="text-xs text-gray-500 flex gap-1 items-center mt-1">
            <p>By:</p>
            <Link to={`/instructor/${course.user.id}`}>{capEach(course.user.name)}</Link>
          </span>
          <ActionButton
            name={"See Course"}
            route={`${routePrefix}/courses/${course.id}`}
            color="w-full bg-gradient-to-r from-[#21bffd] to-[#217bfe] hover:bg-blue-600 text-white text-sm font-medium py-2 rounded mt-3 shadow-md hover:shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}
