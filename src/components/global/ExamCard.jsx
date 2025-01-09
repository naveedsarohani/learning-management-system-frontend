import React, { useEffect, useState } from "react"
import blueprint from "../../uitils/blueprint"
import ActionButton from "./ActionButton"
import { capEach, getCountDown } from "../../uitils/functions/global"

const ExamCard = ({ exam = blueprint.exam, isAttempted }) => {
  const [countDownTimer, setCountDownTimer] = useState(false)
  const [ends, setEnds] = useState(false)

  useEffect(() => {
    getCountDown(
      exam.starts_at,
      ({ remainingTime, formattedTime: { days, hours, minutes, seconds } }) => {
        if (remainingTime)
          setCountDownTimer(
            `Starts [${days} days, ${hours}:${minutes}:${seconds}]`
          )
        else setCountDownTimer(false)
      }
    )

    getCountDown(
      exam.starts_at,
      ({ remainingTime, formattedTime: { hours, minutes, seconds } }) => {
        if (remainingTime) setEnds(`${hours}:${minutes}:${seconds}`)
        else setEnds(true)
      },
      exam.time_allowed
    )
  }, [])

  return (
    <div className="max-w-md w-80 mx-auto h-[16rem] bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl duration-300">
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
              <span className="font-bold">Exam Conductor:</span>{" "}
              {capEach(exam.instructor.name)}
            </p>

            {!countDownTimer && !isAttempted && ends !== true && (
              <p className="text-gray-600 text-sm">
                <span className="font-bold">Ends in:</span> {ends}
              </p>
            )}
          </div>
          <div className="mt-6">
            {isAttempted && (
              <ActionButton
                name="completed"
                color="w-full py-2 bg-gray-500 text-white font-semibold text-sm rounded shadow-md cursor-not-allowed"
              />
            )}

            {ends === true && !countDownTimer && !isAttempted && (
              <ActionButton
                name="Exam ended"
                noCap={true}
                color="w-full py-2 bg-gray-500 text-white font-semibold text-sm rounded shadow-md cursor-not-allowed"
              />
            )}

            {countDownTimer && ends !== true && !isAttempted && (
              <ActionButton
                name={countDownTimer}
                noCap={true}
                color="w-full py-2 bg-gradient-to-r from-[#ffcc00] to-[#f57f17] text-white font-semibold text-sm rounded shadow-md cursor-not-allowed"
              />
            )}

            {!countDownTimer && ends !== true && !isAttempted && (
              <ActionButton
                name="attemp now"
                route={`/me/exams/${exam.id}/attempt`}
                color="w-full py-2 bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white font-semibold text-sm rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamCard
