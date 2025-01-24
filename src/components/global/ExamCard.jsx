import React, { useEffect, useState } from "react"
import blueprint from "../../uitils/blueprint"
import ActionButton from "./ActionButton"
import { capEach, padZero } from "../../uitils/functions/global"
import { DateTime } from "luxon";

const ExamCard = ({ exam = blueprint.exam, isAttempted }) => {
  const [countDownTimer, setCountDownTimer] = useState(false)
  const [ends, setEnds] = useState(false)

  useEffect(() => {
    const startTime = DateTime.fromSQL(exam.starts_at);

    const intervalId = setInterval(() => {
      const currentTime = DateTime.now();
      const diff = startTime.diff(currentTime);

      if (diff.as('seconds') <= 0) {
        setCountDownTimer(false);
        clearInterval(intervalId);
      } else {
        const days = Math.floor(diff.as('days'));
        const hours = Math.floor(diff.as('hours')) % 24;
        const minutes = Math.floor(diff.as('minutes')) % 60;
        const seconds = Math.floor(diff.as('seconds')) % 60;

        setCountDownTimer(`Starts in [${days} days ${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}]`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [exam.starts_at]);

  useEffect(() => {
    if (!countDownTimer) {
      const startTime = DateTime.fromSQL(exam.starts_at).plus({ minutes: exam.time_allowed });

      const intervalId = setInterval(() => {
        const currentTime = DateTime.now();
        const diff = startTime.diff(currentTime);

        if (diff.as('seconds') <= 0) {
          setEnds(true);
          clearInterval(intervalId);
        } else {
          const hours = Math.floor(diff.as('hours')) % 24;
          const minutes = Math.floor(diff.as('minutes')) % 60;
          const seconds = Math.floor(diff.as('seconds')) % 60;

          setEnds(`${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [countDownTimer]);

  return (
    <div className="max-w-md w-80 mx-auto h-[20rem] bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl duration-300">
      <div className="h-full flex flex-col justify-between">
        <div className="p-6 flex-1">
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
        </div>
        <div className="p-6">
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
  )
}

export default ExamCard
