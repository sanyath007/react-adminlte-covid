import React from 'react';

const Bed = ({ bed, status }) => {
  return (
    <div className="info-box">
      {bed?.bed_status === '1' 
        ? <span className="info-box-icon bg-danger"><i className="far fa-user"></i></span>
        : <span className="info-box-icon bg-success"><i className="far fa-user"></i></span>
      }

      <div className="info-box-content">
        <span className="info-box-text">{bed?.bed_name}</span>
        <span className="info-box-number">{status}</span>
      </div>
    </div>
  );
};

export default Bed;
