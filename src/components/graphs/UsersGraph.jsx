import React from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const UsersGraph = () => {
  const data = {
    labels: ["Students", "Instructors"],
    datasets: [
      {
        data: [75, 25], // 75% Students, 25% Instructors
        backgroundColor: ["#217bfe", "#32CD32"],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    cutout: "70%", // Empty center
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`, // Show percentages
        },
      },
    },
  }

  return (
    <div className="flex items-center justify-center flex-col bg-gray-100 p-4 rounded-lg shadow-md w-96">
      <div className="relative">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-lg font-semibold text-gray-700">Total Users</p>
          <p className="text-2xl font-bold text-gray-900">100</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between w-full text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#32CD32] rounded-full mr-2"></div>
          <p>Students</p>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#217bfe] rounded-full mr-2"></div>
          <p>Instructors</p>
        </div>
      </div>
    </div>
  )
}

export default UsersGraph
