import AppointmentList from "../../components/Appointments/AppointmentsList";
import DoctorList from "../../components/medicalRecord/DoctorList";

export const protectedRoutes = [
  { path: "/AppointmentList", component: AppointmentList, name: "AppointmentList" },
  { path: "/cartillaMedica", component: DoctorList, name: "cartillaMedica" }
];
