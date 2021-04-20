import React from 'react';
import { useHistory } from 'react-router-dom';
import FormPatient from '../Form';
import api from '../../../api';

const NewPatient = () => {
  const history = useHistory();

  const handleSubmit = async (data) => {
    console.log(data);

    let res = await api.post('/patients', data);
    console.log(res);

    history.push('/patients');
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
