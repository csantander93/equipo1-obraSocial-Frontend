import AppointmentListPatient from "../../components/Appointments/Patient/AppointmentListPatient";
import DoctorList from "../../components/medicalRecord/DoctorList";
import NewAppointment from "../../components/Appointments/NewAppointment";
import PageWelcome from "../../components/Initial/PageWelcome";
import AppointmentListDoctor from "../../components/Appointments/Doctor/AppointmentListDoctor";

export const protectedRoutesPatient = [
  { path: "/AppointmentListPatient", component: AppointmentListPatient, name: "AppointmentListPatient" },
  { path: "/DoctorList", component: DoctorList, name: "DoctorList" },
  { path: "/NewAppointment", component: NewAppointment, name: "NewAppointment" },
  { path: "/PageWelcome", component: PageWelcome, name: "PageWelcome" },
];

export const protectedRoutesDoctor = [
  { path: "/AppointmentListDoctor", component: AppointmentListDoctor, name: "AppointmentListDoctor" },
];
