export type TAppointment = {

  idTurno: number;
  idReceta: number;
  idPaciente: number;
  nombrePaciente: string;
  nombreMedico: string;
  especialidadMedico: string;
  lugarAtencion: string;
  fechaHora: Date;
  motivoConsulta: string;
  
}