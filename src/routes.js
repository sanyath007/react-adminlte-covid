import Dashboard from './views/Dashboard';
import Profile from './views/Profile';
import ChartJS from './views/Charts/ChartJS';
import Flot from './views/Charts/Flot';
import Inline from './views/Charts/Inline';
import NotFound from './views/NotFound';

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/profile', exact: true, name: 'Profile', component: Profile },
  { path: '/charts/chartjs', name: 'Charts', component: ChartJS },
  { path: '/charts/flot', exact: true, name: 'Flot', component: Flot },
  { path: '/charts/inline', exact: true, name: 'Inline', component: Inline },
  { path: '/404', exact: true, name: 'NotFound', component: NotFound },
];

export default routes;
