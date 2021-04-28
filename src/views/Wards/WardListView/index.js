import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form as BsForm } from 'react-bootstrap';
import Building from './Building';
import api from '../../../api';

const WardListView = () => {
  const [buildings, setBuildings] = useState([]);

  const fetchBuildings = async () => {
    let res = await api.get('/api/buildings');

    setBuildings(res.data);
  };

  useEffect(() => {
    fetchBuildings();
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
                        onChange={(e) => console.log(e.target.value)}
                      >
                        <option value="">แสดงทั้งหมด</option>
                        <option value="06">วอร์ดชั้น 1</option>
                        <option value="00">วอร์ดชั้น 10</option>
                        <option value="05">วอร์ดชั้น ICU</option>
                      </BsForm.Control>
                    </div>
                  </div>{/* /.form-group */}
                </div>

                <div className="col-md-6">
                  <Link to="/wards/new" className="btn btn-md bg-primary float-right">เพิ่มวอร์ด</Link>
                </div>
              </div>
            </div>
            <div className="card-body">
              {buildings.map(building => <Building key={building.id} building={building} />)}
            </div>
          </div>

        </div>{/* /.col */}

      </div>{/* /.row */}
    </div>
  );
};

export default WardListView;
