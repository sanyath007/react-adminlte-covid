import React, { useEffect, useState } from 'react';
import api from '../../../api';
import QuickStatsCard from '../../../components/QuickStatsCard'

const PatientStats = () => {
  const [stats, setStats] = useState(null);
  const fetchStats = async () => {
    let res = await api.get(`/api/stats/04/patients`);

    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="row">
      <div className="col-lg-3 col-6">
        <QuickStatsCard
          key="new_case"
          bg="bg-info"
          stat={<span>{stats?.new_case}<sup style={{ fontSize: '18px' }}>ราย</sup></span>}
          name="รายใหม่"
          icon="ion-person-add"
          url="/"
        />
      </div>
      <div className="col-lg-3 col-6">
        <QuickStatsCard
          key="stil_case"
          bg="bg-success"
          stat={<span>{stats?.stil_case}<sup style={{ fontSize: '18px' }}>ราย</sup></span>}
          name="ยังรักษาอยู่"
          icon="ion-stats-bars"
          url="/"
        />
      </div>
      <div className="col-lg-3 col-6">
        <QuickStatsCard
          key="dch_case"
          bg="bg-warning"
          stat={<span>{stats?.dch_case}<sup style={{ fontSize: '18px' }}>ราย</sup></span>}
          name="จำหน่วยแล้ว"
          icon="ion-share"
          url="/"
        />
      </div>
      <div className="col-lg-3 col-6">
        <QuickStatsCard
          key="dead_case"
          bg="bg-danger"
          stat={<span>{stats?.dead_case}<sup style={{ fontSize: '18px' }}>ราย</sup></span>}
          name="เสียชีวิต"
          icon="ion-pie-graph"
          url="/"
        />        
      </div>
    </div>      
  );
};

export default PatientStats
