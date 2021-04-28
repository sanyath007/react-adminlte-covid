import React from 'react';
import FormWard from '../Form';

const NewBed = () => {
  const handleSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">เพิ่มข้อมูลวอร์ด</h3>
      </div>
      <div className="card-body">

        <FormWard handleSubmit={handleSubmit} />

      </div>
    </div>
  );
};

export default NewBed
