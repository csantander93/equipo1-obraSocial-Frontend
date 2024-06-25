import DoctorList from '../../components/medicalRecord/DoctorList';
import Turnos from '../../components/Turnos/TurnosComponent';
import Home from '../../components/home/Home';

export const protectedRoutes = [
  { path: "/home", component: Home, name: "Home" },
  { path: "/cartilla-medica", component: DoctorList, name: "CartillaMedica" },
  { path: "/turnos", component: Turnos, name: "Turnos" },
];
