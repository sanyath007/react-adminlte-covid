import React, { useEffect, useState } from 'react';
import Ward from './Ward';
import api from '../../../api';

const Building = ({ building }) => {
  const [wards, setWards] = useState([]);

  const fetchBuildingWards = async () => {
    let res = await api.get(`/api/buildings/${building.id}/wards`);

    setWards(res.data.wards);
  };

  useEffect(() => {
    fetchBuildingWards();
  }, []);

  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">{building?.building_name}</h3>
      </div>
      <div className="card-body">
        <div className="row">

          {wards && wards.map(ward => {
            return (
              <div className="col-md-6 col-sm-12" key={ward.ward_id}>
                <Ward ward={ward} handleDelete={fetchBuildingWards} />
              </div>
            )
          })}

        </div>
      </div>
      <div className="card-footer">
        {/* <button type="submit" className="btn btn-primary">Submit</button> */}
      </div>
    </div>
  );
};

export default Building;
