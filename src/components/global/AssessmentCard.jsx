import React from "react"
import blueprint from "../../uitils/blueprint"
import ActionButton from "./ActionButton"

const AssessmentCard = ({ assessment = blueprint.assessment }) => {
  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-5">
        <h2 className="text-xl font-bold bg-gradient-to-r from-[#21bffd] to-[#217bfe] bg-clip-text text-transparent uppercase  truncate">
          {assessment.title}
        </h2>
        <p className="mt-1 text-sm text-gray-700 font-medium">
          {assessment.type} Assessment
        </p>
        <div className="mt-4 flex justify-between text-sm">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Time Limit:</span>{" "}
            {assessment.time_limit} mins
          </p>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Retakes:</span>{" "}
            {assessment.retakes_allowed}
          </p>
        </div>
        <div className="mt-5 flex justify-center">
          <ActionButton
            name="Attempt Now"
            route={`./attempt-assessment/${assessment.id}`}
            color="bg-gradient-to-r from-[#21bffd] to-[#217bfe]  text-white py-2 px-6 rounded-md shadow hover:shadow-md transition-all duration-300"
          />
        </div>
      </div>
    </div>
  )
}

export default AssessmentCard
