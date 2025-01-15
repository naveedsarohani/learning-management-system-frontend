import React, { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"
import blueprint from "../../uitils/blueprint"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const CoursesGraph = ({ courses = [blueprint.course] }) => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const courseCounts = courses.reduce((acc, course) => {
      acc[course.title] = (acc[course.title] || 0) + 1;
      return acc;
    }, {});

    const sortedCourses = Object.entries(courseCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([title, count]) => ({ title, count }));

    setGraphData(sortedCourses);
  }, [courses]);

  // Prepare data
  const labels = graphData.map(course => course.title) // Course titles
  const dataValues = graphData.map(course => course.count) // Heights of bars

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
        display: true, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} Enrolled Students`,
        },
      },
    },
  }

  return (
    <div className="p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-gray-700 mb-4">Top 5 Courses</h2>
      <div className="h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default CoursesGraph
