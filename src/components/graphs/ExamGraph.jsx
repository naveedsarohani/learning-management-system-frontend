import React from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

// Custom plugin to render percentages inside the chart
const percentagePlugin = {
  id: "percentagePlugin",
  afterDatasetDraw(chart) {
    const { ctx, data } = chart
    const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0)

    chart.getDatasetMeta(0).data.forEach((arc, index) => {
      const value = data.datasets[0].data[index]
      const percentage = ((value / total) * 100).toFixed(1) + "%"

      const { x, y } = arc.tooltipPosition() // Get the center position of the arc
      ctx.save()
      ctx.fillStyle = "#ffffff" // White text
      ctx.font = "bold 12px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(percentage, x, y)
      ctx.restore()
    })
  },
}

const ExamGraph = () => {
  const pass = 60 // Number of students who passed
  const fail = 40 // Number of students who failed
  const total = pass + fail

  const data = {
    labels: ["Pass", "Fail"],
    datasets: [
      {
        data: [pass, fail],
        backgroundColor: ["#32CD32", "#FF6347"], // Green for Pass, Red for Fail
        borderWidth: 0,
      },
    ],
  }

  const options = {
    cutout: "70%", // Empty center
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ${((context.raw / total) * 100).toFixed(1)}%`, // Show percentage
        },
      },
      legend: {
        display: false, // Hide legend for cleaner UI
      },
    },
  }

  return (
    <div className="flex items-center justify-center flex-col bg-gray-100 p-4 rounded-lg shadow-md w-96">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Exam Results</h2>{" "}
      {/* Heading */}
      <div className="relative">
        {/* Doughnut Chart */}
        <Doughnut
          id="doughnut-chart"
          data={data}
          options={options}
          plugins={[percentagePlugin]}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-lg font-semibold text-gray-700">Total Students</p>
          <p className="text-2xl font-bold text-gray-900">{total}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between w-full text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#32CD32] rounded-full mr-2"></div>
          <p>Pass: {pass}</p>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#FF6347] rounded-full mr-2"></div>
          <p>Fail: {fail}</p>
        </div>
      </div>
    </div>
  )
}

export default ExamGraph
