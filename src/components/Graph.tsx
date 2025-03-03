"use client";

import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

type GraphData = {
  day: string;
  date: string;
  totalAmount: number;
};

interface GraphProps {
  data: GraphData[];
}

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function Graph({ data }: GraphProps) {
  const labels = data.map((label) => label.day);
  const amounts = data.map((amount) => amount.totalAmount);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Sales",
        data: amounts,
        backgroundColor: "rgb(75,192,192,0.6)",
        borderColor: "rgb(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: "category" as const,
      },
    },
  };

  console.log(data);
  return <Bar data={chartData} options={options}></Bar>;
}
