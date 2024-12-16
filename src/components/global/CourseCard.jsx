import blueprint from "../../uitils/blueprint"
import { formatDate, readFile } from "../../uitils/functions/global"

export default function CourseCard({ course = blueprint.course }) {
  return (
    <div
      key={course.id}
      className="max-w-xs cursor-pointer rounded-lg overflow-hidden shadow-md border bg-white hover:shadow-2xl transition-shadow duration-300 transform "
    >
      <div className="relative ">
        <img
          src={readFile(course.image)}
          alt="poster"
          className="w-full h-40 object-cover"
        />
      </div>
      <div className="p-4">
        <h1 className="text-md font-semibold text-gray-900 truncate">
          {course.title}
        </h1>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {course.description}
        </p>
        <span className="text-xs text-gray-500 mt-3 flex gap-1 items-center">
          <p>Last Update</p>
          {formatDate(course.updated_at)}
        </span>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded mt-3 shadow-md hover:shadow-lg">
          Go to Course
        </button>
      </div>
    </div>
  )
}
