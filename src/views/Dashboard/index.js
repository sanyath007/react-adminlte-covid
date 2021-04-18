import React from 'react'
import AreaChartCard from './AreaChartCard'
import DonutChartCard from './DonutChartCard'
import MapCard from './MapCard'
import QuickStatsCard from './QuickStatsCard'

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-lg-3 col-6">
          <QuickStatsCard
            bg="bg-info"
            stat={<span>150<sup style={{ fontSize: '16px' }}>m$</sup></span>}
            name="New Orders"
            icon="ion-bag"
            url="/"
          />
        </div>
        <div className="col-lg-3 col-6">
          <QuickStatsCard bg="bg-success" stat={['53', <sup style={{ fontSize: '20px' }}>%</sup>]} name="Bounce Rate" icon="ion-stats-bars" url="/" />
        </div>
        <div className="col-lg-3 col-6">
          <QuickStatsCard bg="bg-warning" stat="44" name="User Registrations" icon="ion-person-add" url="/" />
        </div>
        <div className="col-lg-3 col-6">
          <QuickStatsCard bg="bg-danger" stat="65" name="Unique Visitors" icon="ion-pie-graph" url="/" />        
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
