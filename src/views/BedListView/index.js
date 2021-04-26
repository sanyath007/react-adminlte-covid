import React, { useEffect, useState } from 'react';
import Ward from './Ward';
import api from '../../api';

const BedListView = () => {
  const [wards, setWards] = useState([]);

  const fetchWards = async () => {
    let res = await api.get('/api/wards');

    setWards(res.data);
  };

  useEffect(() => {
    fetchWards();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">

          {wards.map(ward => <Ward key={ward.ward_id} ward={ward} />)}

        </div>{/* /.col */}

      </div>{/* /.row */}
    </div>
  );
};

export default BedListView;
