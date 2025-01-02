import React from "react"
import blueprint from "../../uitils/blueprint"

const ExamCard = ({ exam = blueprint.exam }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl duration-300">
      <div className="md:flex">
        <div className="p-6">
          <h2 className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
            {exam.title}
          </h2>
          <p className="mt-3 text-gray-700 text-sm line-clamp-3">
            {exam.description}
          </p>
          <div className="mt-4">
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Passing Percentage:</span>{" "}
              {exam.passing_percentage}%
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Time Allowed:</span>{" "}
              {exam.time_allowed} minutes
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Total Retakes:</span>{" "}
              {exam.total_retakes}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Instructor:</span>{" "}
              {exam.instructor.name}
            </p>
          </div>
          <div className="mt-6">
            <button
              className="w-full py-2 bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white font-semibold text-sm rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              // onClick={handleAttempt}
            >
              Attempt Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamCard
