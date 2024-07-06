export type TAppointment = {

  idTurno: number;
  idReceta: number;
  idPaciente: number;
  idMedico: number;
  nombrePaciente: string;
  nombreMedico: string;
  especialidadMedico: string;
  lugarAtencion: string;
  fechaHora: Date;
  motivoConsulta: string;
  
}