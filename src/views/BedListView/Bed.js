import React, { useEffect, useState } from 'react';
import api from '../../api';

const Bed = ({ bed, status }) => {
  // const [beds, setBeds] = useState([]);

  // const fetchBeds = async () => {
  //   let res = await api.get(`/beds/ward/${ward.ward_id}`);

  //   setBeds(res.data);
  // };

  // useEffect(() => {
  //   fetchBeds();
  // }, []);

  return (
    <div className="info-box">
      <span className="info-box-icon bg-success"><i className="far fa-user"></i></span>

      <div className="info-box-content">
        <span className="info-box-text">{bed?.bed_name}</span>
        <span className="info-box-number">{status}</span>
      </div>
    </div>
  );
};

export default Bed;
