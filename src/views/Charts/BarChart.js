import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data, options }) => {
  return (
    <div style={{ border: '1px solid black' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
