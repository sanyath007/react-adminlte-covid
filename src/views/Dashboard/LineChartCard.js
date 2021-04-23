import React from 'react';
import LineChart from '../Charts/LineChart';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'ยอดสะสม',
      data: [3, 5, 8, 10, 11, 15],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    }
  ]
};

const options = {
  title: {
    display: true,
    text: 'Average Rainfall per month',
    fontSize: 20
  },
  legend: {
    display: true,
    position:'right'
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const LineChartCard = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <i className="fas fa-chart-pie mr-1"></i>
          ยอดผู้ป่วยสะสม
        </h3>
      </div>
      <div className="card-body">
        <div className="chart" id="revenue-chart" style={{ position: 'relative' }}>

          <LineChart data={data} options={options} />
        
        </div>
      </div>
    </div>
  );
};

export default LineChartCard;
