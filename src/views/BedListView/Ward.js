import React from 'react';
import Bed from './Bed';

const Ward = ({ name }) => {
  return (
    <div class="card card-primary">
      <div class="card-header">
        <h3 class="card-title">{name}</h3>
      </div>
      <div class="card-body">
        <div className="row">
          <div class="col-md-3 col-sm-6 col-12">
            <Bed status="Covid Positive" />
          </div>
          <div class="col-md-3 col-sm-6 col-12">
            <Bed status="ว่าง" />
          </div>
          <div class="col-md-3 col-sm-6 col-12">
            <Bed status="Covid Neg" />
          </div>
          <div class="col-md-3 col-sm-6 col-12">
            <Bed status="Case อื่น" />
          </div>
        </div>
      </div>
      <div class="card-footer">
        {/* <button type="submit" class="btn btn-primary">Submit</button> */}
      </div>
    </div>
  );
};

export default Ward;
