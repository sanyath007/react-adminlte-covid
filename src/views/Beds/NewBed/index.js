import React from 'react';
import { toast } from 'react-toastify';
import FormBed from '../Form';
import api from '../../../api';

const NewBed = () => {
  const handleSubmit = async (data) => {
    const { bed_status, ...bed } = data;

    let res = await api.post('/api/beds', { ...bed, bed_status: bed_status ? '0' : '1'});

    if (res.data.status === 1) {
      toast.success('บันทึกข้อมูลเตียงเรียบร้อยแล้ว !!!', { autoClose: 1000, hideProgressBar: true });
    } else {
      toast.error('พบข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้ !!!', { autoClose: 1000, hideProgressBar: true })
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">เพิ่มข้อมูลเตียง</h3>
      </div>
      <div className="card-body">

        <FormBed handleSubmit={handleSubmit} />

      </div>
    </div>
  );
};

export default NewBed;
