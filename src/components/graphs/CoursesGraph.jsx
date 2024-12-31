import React from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const CoursesGraph = () => {
  // Dummy data for courses
  const courses = [
    { title: "JavaScript Basics", count: 85 },
    { title: "React Mastery", count: 90 },
    { title: "CSS Animations", count: 70 },
    { title: "Node.js Essentials", count: 65 },
    { title: "MongoDB Deep Dive", count: 50 },
  ]

  // Prepare data
  const labels = courses.map((course) => course.title) // Course titles
  const dataValues = courses.map((course) => course.count) // Heights of bars

  // Chart configuration
  const data = {
    labels,
    datasets: [
      {
        label: "Top Courses",
        data: dataValues,
        backgroundColor: "#217bfe", // Lighter green color
        borderColor: "#217bfe", // Add border color for better visual effect
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // Set max height for lines
        ticks: {
          stepSize: 20,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} users`, // Add units to tooltip
        },
      },
    },
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-gray-700 mb-4">Top 5 Courses</h2>
      <div className="h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default CoursesGraph
