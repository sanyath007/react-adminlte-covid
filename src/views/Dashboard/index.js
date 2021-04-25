import React from 'react'
import BarChartCard from './BarChartCard'
import LineChartCard from './LineChartCard'
import MapCard from './MapCard'
import BedStats from './StatsCardList/BedStats'
import PatientStats from './StatsCardList/PatientStats'

const Dashboard = () => {
  return (
    <div className="container-fluid">
      {/* ยอดผู้ป่วย */}
      <PatientStats />

      {/* เตียง */}
      <BedStats />

      {/* Main row */}
      <div className="row">
        <section className="col-lg-6 connectedSortable">
          {/* Bar Chart */}
          <BarChartCard />

        </section>
        {/* Left col */}

        {/* Right col (We are only adding the ID to make the widgets sortable) */}
        <section className="col-lg-6 connectedSortable">
          {/* Line Chart */}
          <LineChartCard />

        </section>

        <section className="col-lg-12 connectedSortable">
          {/* Map card */}
          <MapCard name="Map" />

        </section>

        {/* <section className="col-lg-7 connectedSortable"> */}
          {/* Direct Chat */}

          {/* TO DO List */}

        {/* </section> */}
        {/* Left col */}

        {/* Right col (We are only adding the ID to make the widgets sortable) */}
        {/* <section className="col-lg-5 connectedSortable"> */}
          {/* Solid Sales Graph */}

          {/* Calendar */}

        {/* </section> */}

      </div>{/* /.row */}
    </div>
  );
};

export default Dashboard;
