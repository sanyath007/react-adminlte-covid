import React from 'react';
import FormPatient from '../Form';

const NewPatient = () => {
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">เพิ่มข้อมูลผู้ป่วย</h3>
      </div>
      <div className="card-body">

        <FormPatient handleSubmit={handleSubmit} />

      </div>
    </div>
  );
};

export default NewPatient;
