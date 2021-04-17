import React, { useEffect, useState } from 'react';
import api from '../../api';

const regStates = [
  { id: 0, name: 'รอผล' },
  { id: 1, name: 'Covid Pos' },
  { id: 2, name: 'Covid Neg' },
  { id: 3, name: 'PUI' },
  { id: 4, name: 'สงสัย' },
];

const Bed = ({ bed }) => {
  const [status, setStatus] = useState(null);
  const [used, setUsed] = useState(null);

  const fetchBedUsed = async () => {
    let res = await api.get(`/beds/${bed?.bed_id}/used`);
    
    setUsed(res.data.used)
    setStatus(regStates.find(state => state.id.toString() === res.data.used?.reg_state));
  };

  const onDischarge = async (e) => {
    e.preventDefault();
    // TODO: to discharge patient from bed when D/C btn is clicked
  };

  const onAdmit = async (e) => {
    e.preventDefault();
    // TODO: to admit patient without register from bed when admit btn is clicked
  };

  useEffect(() => {
    fetchBedUsed();
  }, [bed]);

  return (
    <div className="info-box">
      {bed?.bed_status === '1' 
        ? <span className="info-box-icon bg-danger"><i className="far fa-user"></i></span>
        : <span className="info-box-icon bg-success"><i className="far fa-user"></i></span>
      }

      <div className="info-box-content">
        <span className="info-box-text">{bed?.bed_name}</span>
        <span className="info-box-number">
          {bed?.bed_status === '1' 
            ? (
              <a href="#" className="text-info">
                {status?.name} <i class="fas fa-comment-medical"></i>
              </a>
            ) : 'ว่าง'
          }
        </span>
        <div style={{ flex: '1', justifyContent: 'space-between', marginTop: '5px' }}>
          {bed?.bed_status === '0' && (
            <a
              href="#"
              className="btn btn-sm text-primary float-right"
              onClick={(e) => onAdmit(e)}
            >
              <i class="fas fa-hospital-user"></i>
              Admit
            </a>
          )}
          
          {bed?.bed_status === '1' && (
            <a
              href="#"
              className="btn btn-sm text-danger float-right"
              onClick={(e) => onDischarge(e)}
            >
              D/C
              <i class="fas fa-sign-out-alt ml-1"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bed;
