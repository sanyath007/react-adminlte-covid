import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useHistory } from 'react-router-dom';
import FormBed from '../Form';
import api from '../../../api';

const EditBed = () => {
  const { id } = useParams();
  const history = useHistory();
  const [bed, setBed] = useState(null);

  const fetchBedById = async (id) => {
    let res = await api.get(`/api/beds/${id}`);

    setBed(res.data);
  };

  const handleSubmit = async (data) => {
    const { bed_status, ...bed } = data;

    let res = await api.put(`/api/beds/${data.bed_id}`, { ...bed, bed_status: bed_status ? '0' : '1'});

    if (res.data.status === 1) {
      toast.success('แก้ไขข้อมูลเตียงเรียบร้อยแล้ว !!!', { autoClose: 1000, hideProgressBar: true });

      history.push('/beds')
    } else {
      toast.error('พบข้อผิดพลาด ไม่สามารถแก้ไขข้อมูลได้ !!!', { autoClose: 1000, hideProgressBar: true })
    }
  };
  
  useEffect(() => {
    fetchBedById(id);
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">แก้ไขข้อมูลเตียง</h3>
      </div>
      <div className="card-body">

        <FormBed handleSubmit={handleSubmit} bed={bed} />

      </div>
    </div>
  );
};

export default EditBed;
