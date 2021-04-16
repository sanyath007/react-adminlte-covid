import React from 'react';
import Ward from './Ward';

const BedListView = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div class="col-md-12">

          <Ward name="วอร์ดชั้น 1 (พิเศษ)" />

          <Ward name="วอร์ดชั้น 10" />

          <Ward name="วอร์ด ICU" />

        </div>{/* /.col */}

      </div>{/* /.row */}
    </div>
  );
};

export default BedListView;
