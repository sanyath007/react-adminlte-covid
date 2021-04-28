import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormPatient from '../Form';
import api from '../../../api';

const NewPatient = () => {
  const history = useHistory();

  const handleSubmit = async (data) => {
    try {
      let res = await api.post('/api/patients', data);

      toast.success('บันทึกข้อมูลผู้ป่วยเรียบร้อยแล้ว !!!', { autoClose: 1000, hideProgressBar: true });
      
      history.push('/patients');
    } catch (error) {
      toast.error('พบข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้ !!!', { autoClose: 1000, hideProgressBar: true })
    }
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
