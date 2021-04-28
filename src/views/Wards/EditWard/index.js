import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useHistory } from 'react-router-dom';
import FormWard from '../Form';
import api from '../../../api';

const EditWard = () => {
  const { id } = useParams();
  const history = useHistory();
  const [ward, setWard] = useState(null);

  const fetchWardById = async (id) => {
    let res = await api.get(`/api/wards/${id}`);

    setWard(res.data);
  };

  const handleSubmit = async (data) => {
    console.log(data);
    let { ward_id:id, ...ward } = data;
    let res = await api.put(`/api/wards/${id}`, ward);

    if (res.data.status === 1) {
      toast.success('แก้ไขข้อมูลวอร์ดเรียบร้อยแล้ว !!!', { autoClose: 1000, hideProgressBar: true });
    } else {
      toast.error('พบข้อผิดพลาด ไม่สามารถแก้ไขข้อมูลได้ !!!', { autoClose: 1000, hideProgressBar: true })
    }

    history.push('/wards')
  };
    
  useEffect(() => {
    fetchWardById(id);
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">แก้ไขข้อมูลวอร์ด</h3>
      </div>
      <div className="card-body">

        <FormWard handleSubmit={handleSubmit} ward={ward} />

      </div>
    </div>
  );
};

export default EditWard;
