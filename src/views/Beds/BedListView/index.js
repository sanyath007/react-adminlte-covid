import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form as BsForm } from 'react-bootstrap';
import Ward from './Ward';
import api from '../../../api';

const BedListView = () => {
  const [wards, setWards] = useState([]);

  const fetchWards = async (ward='') => {
    let res = await api.get('/api/wards');

    if (ward === '') { 
      setWards(res.data);
    } else {
      setWards(res.data.filter(w => w.ward_id === parseInt(ward)));
    }
  };

  useEffect(() => {
    fetchWards();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">

          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group col-md-8 mb-0 pl-0">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">วอร์ด</span>
                      </div>
                      <BsForm.Control
                        as="select"
                        name="ward"
                        onChange={(e) => fetchWards(e.target.value)}
                      >
                        <option value="">แสดงทั้งหมด</option>
                        <option value="1">วอร์ดชั้น 1</option>
                        <option value="2">วอร์ดชั้น 10</option>
                        <option value="3">วอร์ดชั้น ICU</option>
                      </BsForm.Control>
                    </div>
                  </div>{/* /.form-group */}
                </div>

                <div className="col-md-6">
                  <Link to="/beds/new" className="btn btn-md bg-primary float-right">เพิ่มเตียง</Link>
                </div>
              </div>
            </div>
            <div className="card-body">
              {wards.map(ward => <Ward key={ward.ward_id} ward={ward} />)}
            </div>
          </div>

        </div>{/* /.col */}

      </div>{/* /.row */}
    </div>
  );
};

export default BedListView;
