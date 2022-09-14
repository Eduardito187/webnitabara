import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Ingresos Anual',
    },
  },
};

const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
export const data = {
  labels,
  datasets: [
    {
      label: 'Consultas',
      data: [11,44,22,33,66,68,14,75,93,85,15,123],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Cirugias',
      data: [71,10,25,38,55,63,89,99,26,24,56,358],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Laboratorios',
      data: [61,40,35,32,56,43,89,299,326,424,656,258],
      borderColor: 'rgb(43, 222, 235)',
      backgroundColor: 'rgba(43, 222, 235, 0.5)',
    }
  ],
};

const LineChart = () => (
    <Line options={options} data={data} />
);
  
export default LineChart;