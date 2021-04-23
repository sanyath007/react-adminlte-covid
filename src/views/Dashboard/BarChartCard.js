import React from 'react';
import BarChart from '../Charts/BarChart';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'ยอดผู้ป่วย',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgba(0, 140, 255, 1)',
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

const BarChartCard = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <i className="fas fa-chart-pie mr-1"></i>
          ยอดผู้ป่วยรายวัน
        </h3>
      </div>
      <div className="card-body">
        <div className="chart" id="revenue-chart" style={{ position: 'relative', height: '65vh'  }}>

          <BarChart data={data} options={options} />
        
        </div>
      </div>
    </div>
  );
};

export default BarChartCard;
