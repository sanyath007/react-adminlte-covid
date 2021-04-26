import React from 'react';
import { useHistory } from 'react-router-dom';
import FormPatient from '../Form';
import api from '../../../api';

const NewPatient = () => {
  const history = useHistory();

  const handleSubmit = async (data) => {
    let res = await api.post('/api/patients', data);

    history.push('/patients');
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">เพิ่มข้อมูล</h3>
      </div>
      <div className="card-body">

        <FormPatient handleSubmit={handleSubmit} />

      </div>
    </div>
  );
};

export default NewPatient;
