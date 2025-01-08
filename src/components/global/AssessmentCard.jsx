import React from "react"
import blueprint from "../../uitils/blueprint"
import ActionButton from "./ActionButton"

const AssessmentCard = ({ assessment = blueprint.assessment }) => {
  return (
    <div className="max-w-md sm:w-96 mx-auto bg-white rounded-md border border-gray-300 shadow-md overflow-hidden">
      <div className="p-6">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {assessment.title}
        </div>
        <p className="mt-2 text-gray-600">{assessment.type} Assessment</p>
        <p className="mt-2 text-gray-600">
          <span className="font-bold">Time Limit:</span> {assessment.time_limit}{" "}
          minutes
        </p>
        <p className="mt-2 text-gray-600">
          <span className="font-bold">Retakes Allowed:</span>{" "}
          {assessment.retakes_allowed}
        </p>
        <p className="mt-2 text-gray-600">
          <span className="font-bold">Course:</span> {assessment.course.title}
        </p>
        <div className="mt-4 flex justify-center">
          <ActionButton
            // color?: string | undefined;
            name='attempt now'
            route={`./attempt-assessment/${assessment.id}`}
          />
        </div>
      </div>
    </div>
  )
}

export default AssessmentCard
