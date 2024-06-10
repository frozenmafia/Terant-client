import React, { useEffect, useState } from 'react';
import 'chartjs-adapter-date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeUnit,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface Measurement {
  id: number;
  module_id: number;
  voltage: number;
  current: number;
  power: number;
  energy: number;
  frequency: number;
  power_factor: number;
  timestamp: string;
}

interface ChartData {
  labels: Date[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
  }[];
}

const MeasurementChart: React.FC<{ measurements: Measurement[] }> = ({ measurements }) => {
  const createEmptyChartData = (label: string, borderColor: string): ChartData => ({
    labels: [],
    datasets: [{ label, data: [], borderColor }]
  });

  const [chartData, setChartData] = useState<{
    voltage: ChartData;
    current: ChartData;
    power: ChartData;
    energy: ChartData;
    frequency: ChartData;
    power_factor: ChartData;
  }>({
    voltage: createEmptyChartData('Voltage', 'rgba(75, 192, 192, 1)'),
    current: createEmptyChartData('Current', 'rgba(192, 75, 75, 1)'),
    power: createEmptyChartData('Power', 'rgba(75, 75, 192, 1)'),
    energy: createEmptyChartData('Energy', 'rgba(192, 192, 75, 1)'),
    frequency: createEmptyChartData('Frequency', 'rgba(192, 75, 192, 1)'),
    power_factor: createEmptyChartData('Power Factor', 'rgba(75, 192, 75, 1)'),
  });

  useEffect(() => {
    if (!measurements || measurements.length === 0) {
      setChartData({
        voltage: createEmptyChartData('Voltage', 'rgba(75, 192, 192, 1)'),
        current: createEmptyChartData('Current', 'rgba(192, 75, 75, 1)'),
        power: createEmptyChartData('Power', 'rgba(75, 75, 192, 1)'),
        energy: createEmptyChartData('Energy', 'rgba(192, 192, 75, 1)'),
        frequency: createEmptyChartData('Frequency', 'rgba(192, 75, 192, 1)'),
        power_factor: createEmptyChartData('Power Factor', 'rgba(75, 192, 75, 1)'),
      });
      return;
    }

    const timestamps = measurements.map((measurement) => new Date(measurement.timestamp));
    const updateData = (field: keyof Measurement) => measurements.map((measurement) => measurement[field]);

    setChartData({
      voltage: { labels: timestamps, datasets: [{ label: 'Voltage', data: updateData('voltage') as number[], borderColor: 'rgba(75, 192, 192, 1)' }] },
      current: { labels: timestamps, datasets: [{ label: 'Current', data: updateData('current') as number[], borderColor: 'rgba(192, 75, 75, 1)' }] },
      power: { labels: timestamps, datasets: [{ label: 'Power', data: updateData('power') as number[], borderColor: 'rgba(75, 75, 192, 1)' }] },
      energy: { labels: timestamps, datasets: [{ label: 'Energy', data: updateData('energy') as number[], borderColor: 'rgba(192, 192, 75, 1)' }] },
      frequency: { labels: timestamps, datasets: [{ label: 'Frequency', data: updateData('frequency') as number[], borderColor: 'rgba(192, 75, 192, 1)' }] },
      power_factor: { labels: timestamps, datasets: [{ label: 'Power Factor', data: updateData('power_factor') as number[], borderColor: 'rgba(75, 192, 75, 1)' }] },
    });
  }, [measurements]);

  const chartConfig = (label: string) => ({
    type: 'line' as const,
    options: {
      maintainAspectRatio:false,
      scales: {
        x: {
          type: 'time' as const,
          time: {
            parser: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSSSSXXX',
            tooltipFormat: 'yyyy-MM-dd HH:mm:ss',
            unit: 'day' as TimeUnit,
            displayFormats: {
              day: 'yyyy-MM-dd HH:mm'
            }
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
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="bg-white shadow-md rounded-lg p-4 h-80"> {/* Set a fixed height */}
        <Line data={chartData.voltage} options={chartConfig('Voltage').options} />
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 h-80"> {/* Set a fixed height */}
        <Line data={chartData.current} options={chartConfig('Current').options} />
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 h-80"> {/* Set a fixed height */}
        <Line data={chartData.power} options={chartConfig('Power').options} />
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 h-80"> {/* Set a fixed height */}
        <Line data={chartData.energy} options={chartConfig('Energy').options} />
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 h-80"> {/* Set a fixed height */}
        <Line data={chartData.frequency} options={chartConfig('Frequency').options} />
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 h-80"> {/* Set a fixed height */}
        <Line data={chartData.power_factor} options={chartConfig('Power Factor').options} />
      </div>
    </div>
  );
  
  
};

export default MeasurementChart;
