import blueprint from "../../uitils/blueprint"
import { capEach, formatDate, readFile } from "../../uitils/functions/global"
import ActionButton from "./ActionButton"

export default function InstructorCard({ instructor = blueprint.user }) {
    return (
        <div
            key={instructor.id}
            className="max-w-xs cursor-pointer rounded-lg overflow-hidden shadow-md border bg-white hover:shadow-2xl transition-shadow duration-300 transform "
        >
            <div className="relative ">
                <img
                    src={readFile(instructor.image)}
                    alt="profile"
                    className="w-full h-40 object-cover"
                />
            </div>
            <div className="p-4">
                <h1 className="text-md font-semibold text-gray-900 truncate">
                    {capEach(instructor.name)}
                </h1>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {instructor.email}
                </p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    Role: {capEach(instructor.role)}
                </p>
                <div>
                    <span className="text-xs text-gray-500 mt-3 flex gap-1 items-center">
                        <p>Joined</p>
                        {formatDate(instructor.created_at)}
                    </span>
                    <span className="text-xs text-gray-500 mt-3 flex gap-1 items-center">
                        <p>Last Seen</p>
                        {formatDate(instructor.updated_at)}
                    </span>
                </div>

                <ActionButton
                    name={'view profile'}
                    route={`/instructor/${instructor.id}`}
                    color="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded mt-3 shadow-md hover:shadow-lg"
                />
            </div>
        </div>
    )
}