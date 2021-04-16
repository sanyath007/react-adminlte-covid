import Dashboard from './views/Dashboard';
import Profile from './views/Profile';
import Patients from './views/Patients';
import Charts from './views/Charts';
import ChartJS from './views/Charts/ChartJS';
import Flot from './views/Charts/Flot';
import Inline from './views/Charts/Inline';
import NotFound from './views/NotFound';

const routes = [
  { path: '/', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/profile', exact: true, name: 'Profile', component: Profile },
  { path: '/patients', name: 'Patients', component: Patients },
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
