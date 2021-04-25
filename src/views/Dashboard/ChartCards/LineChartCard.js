import React, { useEffect, useState } from 'react';
import LineChart from '../../Charts/LineChart';
import api from '../../../api';
import { createDataSeries } from '../../../utils';

const initData = {
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
  const [chartData, setChartData] = useState(initData);

  const fetchData = async () => {
    let res = await api.get(`/stats/2021-04/collect-day`);
    
    let categories = res.data.map(d => d.d);
    let dataSeries = res.data.map(d => d.collect);

    let { data, ...rest } = chartData.datasets[0];
    let newDataSets = [{ data: dataSeries, ...rest }];

    setChartData({ 
      labels: categories,
      datasets: newDataSets
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

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

          <LineChart data={chartData} options={options} />
        
        </div>
      </div>
    </div>
  );
};

export default LineChartCard;
