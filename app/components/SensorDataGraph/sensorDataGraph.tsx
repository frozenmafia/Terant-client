// import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  scales,
  TimeScale,
  ChartOptions
} from 'chart.js';
// import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
// import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,

);

import React, { useEffect, useState } from 'react';
import { Chart, Line } from 'react-chartjs-2';
interface SensorData {
    id: number;
    current: string;
    energy: string;
    frequency: string;
    pf: string;
    power: string;
    timestamp: string;
    voltage: string;
  }
  
  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };
  
  
  const SensorDataGraph: React.FC<{ data: number[]; timestamps: string[] , label:string}> = ({ data, timestamps, label }) => {
    // State to store chart data
    const [chartData, setChartData] = useState<any>(null);
  
    // Effect to update chart data when data prop changes
    useEffect(() => {
      // Configure chart data
      const chartDataConfig = {
        labels: timestamps,
        datasets: [
          {
            label:label,
            data: data,
            fill: false,
            borderColor: randomColor(),
          },
        ],
      };
  
      // Update chart data state
      setChartData(chartDataConfig);
    }, [data, timestamps]);
  
    // Chart options for time scale
    
    const chartConfig = {
      type: 'line' as const, // Specify chart type as 'line'
      data: chartData,
      options: {
        scales: {
          x: {
            type: 'time' as const,
            time: {
              parser: 'YYYY-MM-DDTHH:mm:ss.SSSSSSZ', // Adjust parser to match ISO 8601 format
              tooltipFormat: 'll HH:mm:ss', // Adjust tooltip format
            },
            title: {
              display: true,
              text: 'Timestamp',
            },
          },
          y: {
            title: {
              display: true,
              text: label,
            },
          },
        },
      },
    };
    // Render the line chart
    return (
      <div>
        {chartData && <Line  data={chartData} options={chartConfig.options} />}
        
      </div>
    );
  };
  
  export default SensorDataGraph;