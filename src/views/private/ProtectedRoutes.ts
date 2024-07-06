import AppointmentListPatient from "../../components/Appointments/Patient/AppointmentListPatient";
import DoctorList from "../../components/medicalRecord/DoctorList";
import NewAppointment from "../../components/Appointments/Patient/NewAppointment/NewAppointment";
import PageWelcome from "../../components/Initial/PageWelcome";
import AppointmentListDoctor from "../../components/Appointments/Doctor/AppointmentListDoctor";
import CreateAppointment from "../../components/Appointments/Doctor/CreateAppointment/CreateAppointment";
import EditAppointment from "../../components/Appointments/Patient/EditAppointment/EditAppointment";
import CreateAssignedAppointments from '../../components/Appointments/Doctor/CreateAssignedAppointment/CreateAssignedAppointments';



export const protectedRoutesPatient = [
  { path: "/AppointmentListPatient", component: AppointmentListPatient, name: "AppointmentListPatient" },
  { path: "/DoctorList", component: DoctorList, name: "DoctorList" },
  { path: "/NewAppointment", component: NewAppointment, name: "NewAppointment" },
  { path: "/PageWelcome", component: PageWelcome, name: "PageWelcome" },
  { path: "/EditAppointment", component: EditAppointment, name: "EditAppointment" }
];

export const protectedRoutesDoctor = [
  { path: "/AppointmentListDoctor", component: AppointmentListDoctor, name: "AppointmentListDoctor" },
  { path: "/CreateAppointment", component: CreateAppointment, name: "CreateAppointment" },
  { path: "/CreateAssignedAppointment", component: CreateAssignedAppointments, name: "CreateAssignedAppointment" }
];
