import Dashboard from './views/Dashboard';
import Profile from './views/Profile';
import Patients from './views/Patients';
import BedListView from './views/BedListView';
import Charts from './views/Charts';
import ChartJS from './views/Charts/ChartJS';
import Flot from './views/Charts/Flot';
import Inline from './views/Charts/Inline';
import NotFound from './views/NotFound';
import NewPatient from './views/Patients/NewPatient';
import PatientList from './views/Patients/PatientList';

const routes = [
  { path: '/', exact: true, name: 'Dashboard', component: Dashboard },
  {
    path: '/patients',
    name: 'Patients',
    component: Patients,
    routes: [
      { path: '/', name: 'Patient List', component: PatientList },
      { path: '/new', name: 'New Patient', component: NewPatient },
    ]
  },
  { path: '/beds', name: 'Beds', component: BedListView },
  { path: '/profile', exact: true, name: 'Profile', component: Profile },
  {
    path: '/charts', 
    name: 'Charts', 
    component: Charts, 
    routes: [
      { path: '/charts/chartjs', name: 'Chart ChartJS', component: ChartJS },
      { path: '/charts/flot', exact: true, name: 'Chart Flot', component: Flot },
      { path: '/charts/inline', exact: true, name: 'Chart Inline', component: Inline },
    ]
  },
  { path: '/404', exact: true, name: 'NotFound', component: NotFound },
];

export default routes;
