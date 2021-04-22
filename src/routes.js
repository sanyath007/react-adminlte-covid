import Dashboard from './views/Dashboard';
import Patients from './views/Patients';
import PatientList from './views/Patients/PatientList';
import NewPatient from './views/Patients/NewPatient';
import EditPatient from './views/Patients/EditPatient';
import Registrations from './views/Registrations';
import RegistrationList from './views/Registrations/RegistrationList';
import NewRegistration from './views/Registrations/NewRegistration';
import BedListView from './views/BedListView';
import Profile from './views/Profile';
import Charts from './views/Charts';
import ChartJS from './views/Charts/ChartJS';
import Flot from './views/Charts/Flot';
import Inline from './views/Charts/Inline';
import NotFound from './views/NotFound';

const routes = [
  { path: '/', exact: true, name: 'Dashboard', component: Dashboard },
  {
    path: '/patients',
    name: 'Patients',
    component: Patients,
    routes: [
      { path: '/', name: 'รายชื่อผู้ป่วย', component: PatientList },
      { path: '/new', name: 'เพิ่มผู้ป่วย', component: NewPatient },
      { path: '/edit/:id', name: 'แก้ไขผู้ป่วย', component: EditPatient },
    ]
  },
  {
    path: '/registrations',
    name: 'Registrations',
    component: Registrations,
    routes: [
      { path: '/', name: 'ทะเบียนผู้ป่วย', component: RegistrationList },
      { path: '/new', name: 'ลงทะเบียนผู้ป่วย', component: NewRegistration },
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
