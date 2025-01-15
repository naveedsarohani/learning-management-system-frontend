import React, { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import blueprint from "../../uitils/blueprint"
import { capEach } from "../../uitils/functions/global"
import { isPass } from "../../layouts/result/AllResult"

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const CityPassRatioGraph = ({ results = [blueprint.examSubmission] }) => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const cityResults = results.reduce((acc, result) => {
      const city = capEach(result.student.city.name);
      acc[city] = acc[city] || { total: 0, passed: 0 };
      acc[city].total++;
      if (isPass(result)) {
        acc[city].passed++;
      }
      return acc;
    }, {});

    const sortedResults = Object.entries(cityResults)
      .sort((a, b) => b[1].passed / b[1].total - a[1].passed / a[1].total)
      .slice(0, 5)
      .map(([city, result]) => ({
        city,
        passPercentage: (result.passed / result.total) * 100,
      }));

    setGraphData(sortedResults);
  }, [results]);

  // Prepare sorted labels and data
  const labels = graphData.map((item) => item.city)
  const dataValues = graphData.map((item) => item.passPercentage)

  // Calculate bar thickness based on ratio
  const maxRatio = Math.max(...dataValues);
  const barThickness = dataValues.map((ratio) => 50 * (ratio / maxRatio));

  const data = {
    labels,
    datasets: [
      {
        label: "Pass Percentage (%)",
        data: dataValues,
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        barThickness: barThickness, // Set dynamic bar thickness
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "City-wise Pass Percentage (Sorted)",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#333",
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: "#333",
        },
      },
    },
  }

  return (
    <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 text-gray-700">
        Pass Percentage (City-wise)
      </h2>
      <Bar data={data} options={options} />
    </div>
  )
}

export default CityPassRatioGraph