import React, { useEffect, useState } from 'react';
import api from '../../../api';
import QuickStatsCard from '../../../components/QuickStatsCard'

const BedStats = () => {
  const [stats, setStats] = useState(null);
  const fetchStats = async () => {
    let res = await api.get(`/stats/04/beds`);

    setStats(res.data)
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="row">
      <div className="col-lg-4 col-12">
        <QuickStatsCard
          key="all"
          bg="bg-primary"
          stat={<span>{stats?.all_beds}<sup style={{ fontSize: '18px' }}>เตียง</sup></span>}
          name="เตียงทั้งหมด"
          icon="ion-archive"
          url="/"
        />
      </div>

      <div className="col-lg-4 col-12">
        <QuickStatsCard
          key="used"
          bg="bg-danger"
          stat={<span>{stats?.used_beds}<sup style={{ fontSize: '18px' }}>เตียง</sup></span>}
          name="มีผู้ป่วย"
          icon="ion-person-stalker"
          url="/"
        />
      </div>

      <div className="col-lg-4 col-12">
        <QuickStatsCard
          key="empty"
          bg="bg-default"
          stat={<span>{stats?.empty_beds}<sup style={{ fontSize: '18px' }}>เตียง</sup></span>}
          name="เตียงว่าง"
          icon="ion-battery-empty"
          url="/"
        />        
      </div>
    </div>
  );
};

export default BedStats;
