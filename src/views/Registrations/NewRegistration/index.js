import React from 'react';
import FormPatient from '../Form';

const NewRegistration = () => {
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">ลงทะเบียนผู้ป่วย</h3>
      </div>
      <div className="card-body">

        <FormPatient handleSubmit={handleSubmit} />

      </div>
    </div>
  );
};

export default NewRegistration;
