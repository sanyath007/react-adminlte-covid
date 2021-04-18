import React from 'react';

const AreaChartCard = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <i className="fas fa-chart-pie mr-1"></i>
          Area Chart
        </h3>
      </div>
      <div className="card-body">
        <div className="chart" id="revenue-chart" style={{ position: 'relative', height: '300px' }}>
          <canvas id="sales-chart-canvas" height="300" style={{ height: '300px' }}></canvas> 
        </div>
      </div>
    </div>
  );
};

export default AreaChartCard;
