import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data, options }) => {
  return (
    <div style={{ border: '1px solid black' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
