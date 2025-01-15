import React, { useEffect, useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import blueprint from "../../uitils/blueprint"
import { isPass } from "../../layouts/result/AllResult"

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

const ExamGraph = ({ results = [blueprint.examSubmission] }) => {
  const [resultData, setResultData] = useState({ pass: 0, fail: 0, total: 0 });

  useEffect(() => {
    const total = results.length;
    const pass = results.filter(isPass).length;
    const fail = total - pass;

    setResultData({ pass, fail, total });
  }, [results]);

  const data = {
    labels: ["Pass", "Fail"],
    datasets: [
      {
        data: [resultData.pass, resultData.fail],
        backgroundColor: ["#32CD32", "#FF6347"],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    cutout: "70%",
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ${((context.raw / resultData.total) * 100).toFixed(1)}%`,
        },
      },
      legend: {
        display: false,
      },
    },
  }

  return (
    <div className="flex items-center justify-center flex-col p-4 rounded-lg shadow-md w-96">
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
          <p className="text-2xl font-bold text-gray-900">{resultData.total}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between w-full text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#32CD32] rounded-full mr-2"></div>
          <p>Pass: {resultData.pass}</p>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#FF6347] rounded-full mr-2"></div>
          <p>Fail: {resultData.fail}</p>
        </div>
      </div>
    </div>
  )
}

export default ExamGraph
