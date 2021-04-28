import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api';
import RegisDetailModal from '../../Modals/RegisDetailModal';

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
  const [openModal, setOpenModal] = useState(false);

  const fetchBedUsed = async () => {
    let res = await api.get(`/api/beds/${bed?.bed_id}/used`);
    
    setUsed(res.data.used)
    setStatus(regStates.find(state => state.id.toString() === res.data.used?.reg_state));
  };

  const onDelete = async (e) => {
    e.preventDefault();
    // TODO: to delete bed
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
              <a href="#" className="text-info" onClick={() => setOpenModal(true)}>
                {status?.name} <i className="fas fa-comment-medical"></i>
              </a>
            ) : 'ว่าง'
          }
        </span>
        
        <div style={{ flex: '1', marginTop: '5px', textAlign: 'right' }}>
          <Link to={`/beds/edit/${bed?.bed_id}`} className="text-warning">
            <i className="fas fa-edit"></i>
          </Link>

          {bed?.bed_status === '0' && (
            <a href="#" className="text-danger mx-2" onClick={(e) => onDelete(e)}>
              <i className="fas fa-trash-alt"></i>
            </a>
          )}

        </div>
      </div>

      <RegisDetailModal
        isOpen={openModal}
        hideModal={() => setOpenModal(false)}
        regisData={used}
      />
    </div>
  );
};

export default Bed;
