import blueprint from "../../uitils/blueprint"
import { capEach, formatDate, readFile } from "../../uitils/functions/global"
import ActionButton from "./ActionButton"

export default function InstructorCard({ instructor = blueprint.user }) {
  return (
    <div
      key={instructor.id}
      className="max-w-xs cursor-pointer rounded-lg overflow-hidden shadow-lg border bg-white hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
    >
      <div className="relative">
        <img
          src={readFile(instructor.image)}
          alt="Instructor Profile"
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute bottom-0 bg-black bg-opacity-50 w-full py-2 text-center">
          <h2 className="text-white font-semibold text-lg">
            {capEach(instructor.name)}
          </h2>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-600 font-medium mb-2">
          <span className="font-semibold text-gray-800">Role:</span>{" "}
          {capEach(instructor.role)}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-semibold text-gray-800">Email:</span>{" "}
          {instructor.email}
        </p>
        {/* <div className="flex justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <span>Joined:</span>
            <span className="font-medium">
              {formatDate(instructor.created_at)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span>Last Seen:</span>
            <span className="font-medium">
              {formatDate(instructor.updated_at)}
            </span>
          </div>
        </div> */}
        <ActionButton
          name="View Profile"
          route={`/instructor/${instructor.id}`}
          color="w-full bg-gradient-to-r from-[#21bffd] to-[#217bfe]  text-white text-sm font-semibold py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
        />
      </div>
    </div>
  )
}
