import React from "react"
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

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const CityPassRatioGraph = () => {
  // Dummy data (unsorted)
  const cityData = [
    { city: "Karachi", ratio: 85 },
    { city: "Lahore", ratio: 90 },
    { city: "Islamabad", ratio: 78 },
    { city: "Peshawar", ratio: 65 },
    { city: "Quetta", ratio: 70 },
  ]

  // Sort data by pass ratio in descending order
  const sortedData = cityData.sort((a, b) => b.ratio - a.ratio)

  // Prepare sorted labels and data
  const labels = sortedData.map((item) => item.city)
  const dataValues = sortedData.map((item) => item.ratio)

  const data = {
    labels,
    datasets: [
      {
        label: "Pass Ratio (%)",
        data: dataValues,
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        barThickness: 50, // Set bar thickness
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
        text: "City-wise Pass Ratio (Sorted)",
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
        Pass Ratio (City-wise)
      </h2>
      <Bar data={data} options={options} />
    </div>
  )
}

export default CityPassRatioGraph
