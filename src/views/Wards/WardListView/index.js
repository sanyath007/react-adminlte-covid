import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form as BsForm } from 'react-bootstrap';
import Building from './Building';
import api from '../../../api';

const WardListView = () => {
  const [buildings, setBuildings] = useState([]);
  const [buildingLists, setBuildingLists] = useState([]);

  const fetchBuildings = async (building='') => {
    let res = await api.get('/api/buildings');

    setBuildingLists(res.data);
    
    if (building === '') {
      setBuildings(res.data);
    } else {
      setBuildings(res.data.filter(b => b.id === parseInt(building)));
    }
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
                        <span className="input-group-text">อาคาร</span>
                      </div>
                      <BsForm.Control
                        as="select"
                        name="building"
                        onChange={(e) => fetchBuildings(e.target.value)}
                      >
                        <option value="">แสดงทั้งหมด</option>
                        {buildingLists && buildingLists.map(b => (
                          <option key={b.id} value={b.id}>{b.building_name}</option>
                        ))}
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
