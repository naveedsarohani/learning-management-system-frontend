import React from "react"
import blueprint from "../../uitils/blueprint"

const ProgressBar = ({ progress = blueprint.progress }) => {
  return (
    <div>
      <h1 className="text-center mb-4 text-xl font-bold">Your progress</h1>
      <div className="w-full h-4 bg-gray-300 rounded">
        <div
          className="relative h-full bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white rounded"
          style={{ width: `${progress.completion_percentage}%` }}
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-white">
            {progress.completion_percentage}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
