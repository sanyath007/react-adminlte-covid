import React from 'react';
import FormBed from '../Form';

const NewBed = () => {
  const handleSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">เพิ่มข้อมูล</h3>
      </div>
      <div className="card-body">

        <FormBed handleSubmit={handleSubmit} />

      </div>
    </div>
  );
};

export default NewBed;
