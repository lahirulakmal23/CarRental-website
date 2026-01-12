import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const RevenuePieChart = () => {
  const data = {
    labels: ["Car", "Van", "SUV", "Jeep"],
    datasets: [
      {
        label: "Monthly Revenue (LKR)",
        data: [250000, 180000, 320000, 150000], // example values
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",  // blue
          "rgba(34, 197, 94, 0.7)",   // green
          "rgba(234, 179, 8, 0.7)",   // yellow
          "rgba(239, 68, 68, 0.7)",   // red
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Monthly Revenue by Vehicle Type",
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: LKR ${context.raw.toLocaleString()}`,
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default RevenuePieChart;
