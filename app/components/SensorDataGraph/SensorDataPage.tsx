"use client"
import React, { useEffect, useState } from 'react';
import SensorDataGraph from '../SensorDataGraph/sensorDataGraph';

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

const SensorDataPage: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    // Fetch sensor data from the backend
    fetch('https://forgerrr.com/readings')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: SensorData[]) => {
        // If you want to use the data in your component, you can set it to state here
        console.log(data)
        setSensorData(data);
      })
      .catch((error) => {
        console.error('Error fetching sensor data:', error);
      });
  }, []);

  return (
    <>
    
    Sensor Data Visualization
  
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>

      {/* Pass processed timestamp and energy data to SensorDataGraph */}
      <SensorDataGraph data={sensorData.map((d) => parseFloat(d.energy))} timestamps={sensorData.map((d) => d.timestamp)} label='Energy kwh' />
      <SensorDataGraph data={sensorData.map((d) => parseFloat(d.power))} timestamps={sensorData.map((d) => d.timestamp)} label='Power W' />
      <SensorDataGraph data={sensorData.map((d) => parseFloat(d.current))} timestamps={sensorData.map((d) => d.timestamp)} label='Current A' />
      <SensorDataGraph data={sensorData.map((d) => parseFloat(d.frequency))} timestamps={sensorData.map((d) => d.timestamp)} label='Frequency Hz' />
      <SensorDataGraph data={sensorData.map((d) => d.id)} timestamps={sensorData.map((d) => d.timestamp)} label='ID' />
      <SensorDataGraph data={sensorData.map((d) => parseFloat(d.voltage))} timestamps={sensorData.map((d) => d.timestamp)} label='Voltage V' />
    </div>
    </>
  );
};

export default SensorDataPage;
