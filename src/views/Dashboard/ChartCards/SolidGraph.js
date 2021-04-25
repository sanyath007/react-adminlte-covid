import React from 'react';

const SolidGraph = () => {
  return (
    <div className="card bg-gradient-info">
      <div className="card-header border-0">
        <h3 className="card-title">
          <i className="fas fa-th mr-1"></i>
          Sales Graph
        </h3>
        <div className="card-tools">
          <button type="button" className="btn bg-info btn-sm" data-card-widget="collapse">
            <i className="fas fa-minus"></i>
          </button>
          <button type="button" className="btn bg-info btn-sm" data-card-widget="remove">
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div className="card-body">
        <canvas
          className="chart"
          id="line-chart"
          style={{
            minHeight: '250px',
            height: '250px',
            maxHeight: '250px',
            maxWidth: '100%'
          }}
        ></canvas>
      </div>
      <div className="card-footer bg-transparent">
        <div className="row">
          <div className="col-4 text-center">
            <input
              type="text"
              className="knob"
              data-readonly="true"
              data-width="60"
              data-height="60"
              data-fgcolor="#39CCCC"
              value="20"
              onChange={(e) => console.log(e)}
            />

            <div className="text-white">Mail-Orders</div>
          </div>
          <div className="col-4 text-center">
            <input
              type="text"
              className="knob"
              data-readonly="true"
              data-width="60"
              data-height="60"
              data-fgcolor="#39CCCC"
              value="50"
              onChange={(e) => console.log(e)}
            />

            <div className="text-white">Online</div>
          </div>
          <div className="col-4 text-center">
            <input
              type="text"
              className="knob"
              data-readonly="true"
              data-width="60"
              data-height="60"
              data-fgcolor="#39CCCC"
              value="30"
              onChange={(e) => console.log(e)}
            />

            <div className="text-white">In-Store</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolidGraph;
