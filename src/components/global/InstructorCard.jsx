import blueprint from "../../uitils/blueprint"
import { capEach, formatDate, readFile } from "../../uitils/functions/global"
import ActionButton from "./ActionButton"

export default function InstructorCard({ instructor = blueprint.user }) {
  return  <div
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

          <ActionButton
              name={'view profile'}
              route={`/instructor/${instructor.id}`}
              color="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded mt-3 shadow-md hover:shadow-lg"
          />
      </div>
      
      </div>
      </div>
}
