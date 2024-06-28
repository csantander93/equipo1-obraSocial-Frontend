import AppointmentList from "../../components/Appointments/AppointmentsList";
import DoctorList from "../../components/medicalRecord/DoctorList";
import NewAppointment from "../../components/Appointments/NewAppointment";

export const protectedRoutes = [
  { path: "/AppointmentList", component: AppointmentList, name: "AppointmentList" },
  { path: "/DoctorList", component: DoctorList, name: "DoctorList" },
  { path: "/NewAppointment", component: NewAppointment, name: "NewAppointment" }
];
