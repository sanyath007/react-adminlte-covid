import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FormPatient from '../Form';
import api from '../../../api';

const EditPatient = () => {
  const history = useHistory();
  const { id } = useParams();

  const [patient, setPatient] = useState(null);

  const handleSubmit = async (data) => {
    console.log(data);

    // let res = await api.post('/patients', data);
    // console.log(res);

    // history.push('/patients');
  };

  const fetchRegistration = async (_id) => {
    let res = await api.get(`/registrations/${_id}`);

    setPatient(res.data);
  };

  useEffect(() => {
    fetchRegistration(id);
  }, [id])

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">แก้ไขข้อมูล</h3>
      </div>
      <div className="card-body">

        <FormPatient handleSubmit={handleSubmit} patient={patient} />

      </div>
    </div>
  );
};

export default EditPatient;
