import React from 'react';

const Bed = ({ status }) => {
  return (
    <div class="info-box">
      <span class="info-box-icon bg-success"><i class="far fa-user"></i></span>

      <div class="info-box-content">
        <span class="info-box-text">{status}</span>
        <span class="info-box-number">1,410</span>
      </div>
    </div>
  );
};

export default Bed;
