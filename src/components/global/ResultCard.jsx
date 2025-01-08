import React from "react"
import blueprint from "../../uitils/blueprint"

export default function ResultCard({result = blueprint.examSubmission}) {
    const userName = "Burhanul Islam" // Name of the attemptee
    const courseName = "Programming Basics Quiz" // Name of the course/quiz
    const score = 8 // Example score
    const totalQuestions = 10 // Total number of questions
    const completionTime = "15:23:45" // Completion time
    const attemptDate = "December 31, 2024" // Date of attempt

    return (
        <div className="flex justify-center items-center  bg-gradient-to-r from-[#21bffd] to-[#217bfe]">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg ">
                {/* Header */}
                <h1 className="text-3xl font-bold text-[#217bfe] text-center mb-6">
                    🎉 Quiz Result 🎉
                </h1>

                {/* User Info */}
                <div className="flex flex-col items-center mb-2">
                    <img
                        src="https://via.placeholder.com/100"
                        alt="User Avatar"
                        className="w-20 h-20 rounded-full mb-2"
                    />
                    <h2 className="text-xl font-bold text-gray-800">{userName}</h2>
                    <p className="text-sm text-gray-500">{courseName}</p>
                </div>

                {/* Score Display */}
                <div className="flex flex-col items-center mb-2">
                    <div className="w-32 h-32 flex items-center justify-center bg-green-100 rounded-full border-8 border-[#217bfe] text-[#217bfe] text-3xl font-bold">
                        {score}/{totalQuestions}
                    </div>
                    <p className="text-lg text-gray-700 mt-2">
                        You answered <span className="font-bold">{score}</span> questions
                        correctly out of <span className="font-bold">{totalQuestions}</span>
                        .
                    </p>
                </div>

                {/* Additional Info */}
                <div className="bg-gray-100 rounded-lg p-4 space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                        <span className="font-semibold">Completion Time:</span>
                        <span>{completionTime}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Attempt Date:</span>
                        <span>{attemptDate}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                        Thank you for taking the quiz!
                    </p>
                </div>
            </div>
        </div>
    )
}