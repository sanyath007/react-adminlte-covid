import React from 'react';

const DonutChartCard = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <i className="fas fa-chart-pie mr-1"></i>
          Donut Chart
        </h3>
      </div>
      <div className="card-body">
          <div className="chart" id="sales-chart" style={{ position: 'relative', height: '300px' }}>
            <canvas id="sales-chart-canvas" height="300" style={{ height: '300px' }}></canvas>                         
          </div>
      </div>
    </div>
  );
};

export default DonutChartCard;
