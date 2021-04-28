import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormPatient from '../Form';
import api from '../../../api';

const EditPatient = () => {
  const history = useHistory();
  const { id } = useParams();

  const [patient, setPatient] = useState(null);

  const handleSubmit = async (data) => {
    console.log(data);

    try {
      let res = await api.put(`/patients/${data.id}`, data);

      toast.success('แก้ไขข้อมูลผู้ป่วยเรียบร้อยแล้ว !!!', { autoClose: 1000, hideProgressBar: true });

      history.push('/patients');
    } catch (error) {
      toast.error('พบข้อผิดพลาด ไม่สามารถแก้ไขข้อมูลได้ !!!', { autoClose: 1000, hideProgressBar: true });
    }

  };

  const fetchRegistration = async (_id) => {
    let res = await api.get(`/api/registrations/${_id}`);

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
