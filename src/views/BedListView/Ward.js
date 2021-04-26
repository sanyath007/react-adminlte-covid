import React, { useEffect, useState } from 'react';
import Bed from './Bed';
import api from '../../api';

const Ward = ({ ward }) => {
  const [beds, setBeds] = useState([]);

  const fetchBedsByWard = async () => {
    let res = await api.get(`/api/beds/ward/${ward.ward_id}/0`);

    setBeds(res.data);
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

          {beds.map(bed => {
            return (
              <div className="col-md-3 col-sm-6 col-12" key={bed.bed_id}>
                <Bed bed={bed} status="Covid Positive" />
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

export default Ward;
