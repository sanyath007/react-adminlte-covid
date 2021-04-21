import React from 'react'
import AreaChartCard from './AreaChartCard'
import DonutChartCard from './DonutChartCard'
import MapCard from './MapCard'
import QuickStatsCard from './QuickStatsCard'

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* ยอดผู้ป่วย */}
        <div className="col-lg-3 col-6">
          <QuickStatsCard
            bg="bg-info"
            stat={<span>0<sup style={{ fontSize: '18px' }}>ราย</sup></span>}
            name="ผู้ป่วยรายใหม่"
            icon="ion-person-add"
            url="/"
          />
        </div>
        <div className="col-lg-3 col-6">
          <QuickStatsCard
            bg="bg-success"
            stat={['20', <sup style={{ fontSize: '18px' }}>ราย</sup>]}
            name="ผู้ป่วยสะสม"
            icon="ion-stats-bars"
            url="/"
          />
        </div>
        <div className="col-lg-3 col-6">
          <QuickStatsCard
            bg="bg-warning"
            stat={['44', <sup style={{ fontSize: '18px' }}>ราย</sup>]}
            name="จำหน่วยแล้ว"
            icon="ion-share"
            url="/"
          />
        </div>
        <div className="col-lg-3 col-6">
          <QuickStatsCard
            bg="bg-danger"
            stat={['0', <sup style={{ fontSize: '18px' }}>ราย</sup>]}
            name="เสียชีวิต"
            icon="ion-pie-graph"
            url="/"
          />        
        </div>

        {/* เตียง */}
        <div className="col-lg-4 col-6">
          <QuickStatsCard
            bg="bg-primary"
            stat={['30', <sup style={{ fontSize: '18px' }}>ราย</sup>]}
            name="เตียงทั้งหมด"
            icon="ion-archive"
            url="/"
          />
        </div>

        <div className="col-lg-4 col-6">
          <QuickStatsCard
            bg="bg-danger"
            stat={['20', <sup style={{ fontSize: '18px' }}>เตียง</sup>]}
            name="มีผู้ป่วย"
            icon="ion-person-stalker"
            url="/"
          />
        </div>

        <div className="col-lg-4 col-6">
          <QuickStatsCard
            bg="bg-default"
            stat={<span>10<sup style={{ fontSize: '18px' }}>เตียง</sup></span>}
            name="เตียงว่าง"
            icon="ion-battery-empty"
            url="/"
          />        
        </div>

      </div>{/* /.row */}

      {/* Main row */}
      <div className="row">
        <section className="col-lg-7 connectedSortable">
          {/* Area Chart */}
          <AreaChartCard />

        </section>
        {/* Left col */}

        {/* Right col (We are only adding the ID to make the widgets sortable) */}
        <section className="col-lg-5 connectedSortable">
          {/* Donut Chart */}
          <DonutChartCard />

        </section>

        <section className="col-lg-12 connectedSortable">
          {/* Map card */}
          <MapCard />

        </section>

        <section className="col-lg-7 connectedSortable">
          {/* Direct Chat */}

          {/* TO DO List */}

        </section>
        {/* Left col */}

        {/* Right col (We are only adding the ID to make the widgets sortable) */}
        <section className="col-lg-5 connectedSortable">
          {/* Solid Sales Graph */}

          {/* Calendar */}

        </section>

      </div>{/* /.row */}
    </div>
  );
};

export default Dashboard;
