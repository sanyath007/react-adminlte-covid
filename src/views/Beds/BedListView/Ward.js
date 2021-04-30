import React, { useEffect, useState } from 'react';
import Bed from './Bed';
import api from '../../../api';

const Ward = ({ ward }) => {
  const [beds, setBeds] = useState([]);

  const fetchBedsByWard = async () => {
    let res = await api.get(`/api/wards/${ward.ward_id}/beds`);

    setBeds(res.data.beds);
  };

  useEffect(() => {
    fetchBedsByWard();
  }, []);

  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">{ward.ward_name}</h3>
      </div>
      <div className="card-body">
        <div className="row">

          {beds && beds.map(bed => {
            return (
              <div className="col-md-3 col-sm-6 col-12" key={bed.bed_id}>
                <Bed bed={bed} used={bed.regis} handleDelete={fetchBedsByWard} />
              </div>
            )
          })}

        </div>
      </div>
    </div>
  );
};

export default Ward;
