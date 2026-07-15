import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const RevenueDonutChart = () => {
  const data = {
    labels: ["Car", "Van", "SUV", "Jeep"],
    datasets: [
      {
        label: "Revenue (LKR)",
        data: [250000, 180000, 320000, 150000], // example data
        backgroundColor: [
          "rgba(59, 130, 246, 0.75)",  // blue
          "rgba(34, 197, 94, 0.75)",   // green
          "rgba(234, 179, 8, 0.75)",   // yellow
          "rgba(239, 68, 68, 0.75)",   // red
        ],
        borderWidth: 1,
        cutout: "70%", // donut thickness
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
        text: "Revenue Distribution by Vehicle Type",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce(
              (a, b) => a + b,
              0
            );
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: LKR ${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default RevenueDonutChart;
