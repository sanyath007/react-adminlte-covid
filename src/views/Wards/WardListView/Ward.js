import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../api';

const Ward = ({ ward, handleDelete }) => {
  const [regises, setRegises] = useState(null);
  const [count, setCount] = useState(0);

  const fetchWardPatients = async () => {
    let res = await api.get(`/api/wards/${ward?.ward_id}/regises`);    
    let stays = res.data.regises.filter(reg => reg.dch_date === null)

    setRegises(res.data.regises);
    setCount(stays?.length);
  };

  const onDelete = async (e, id) => {
    e.preventDefault();

    if (window.confirm(`คุณต้องการจะลบข้อมูลวอร์ดรหัส ${id} ใช่หรือไม่ ?`)) {
      try {
        let res = await api.delete(`/api/wards/${id}`);
  
        toast.success('ลบข้อมูลวอร์ดเรียบร้อยแล้ว !!!', { autoClose: 1000, hideProgressBar: true });
        
        /** fetch new all wards of ward's building */
        handleDelete();
      } catch (error) {
        toast.error('พบข้อผิดพลาด ไม่สามารถลบข้อมูลได้ !!!', { autoClose: 1000, hideProgressBar: true });
      }
    }
  };

  useEffect(() => {
    fetchWardPatients();
  }, [ward]);

  return (
    <div className="info-box">
      <span className="info-box-icon bg-success"><i className="far fa-hospital"></i></span>

      <div className="info-box-content">
        <div className="row">
          <div className="col-md-8">
            <span className="info-box-text"><h5>{ward?.ward_name}</h5></span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span><i className="fas fa-bed text-primary mr-2"></i> {ward?.bed_max} ราย</span>
              <span><i className="fas fa-users text-danger mr-2"></i> {count} ราย</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="float-right" style={{ display: 'flex' }}>
              <Link to={`/wards/edit/${ward?.ward_id}`} className="text-warning">
                <i className="fas fa-edit"></i>
              </Link>
              <a href="#" className="text-danger mx-2" onClick={(e) => onDelete(e, ward?.ward_id)}>
                <i className="fas fa-trash-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ward;
