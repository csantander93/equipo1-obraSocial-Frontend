// EditAppointment.tsx

import React, { useContext, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import './EditAppointment.css';

const EditAppointment: React.FC = () => {
  const { id } = useParams(); // Para capturar el ID del turno a editar desde la URL

  const navigate = useNavigate();

  useEffect(() => {
    // Cargar datos del turno para editar usando el ID obtenido
    // Puedes llamar a un servicio que obtenga los detalles del turno por su ID.
    // Esto dependerá de cómo tengas configurado tu backend y tu contexto de aplicación.
  }, []);

  
  return (
    <div className="edit-appointment-container">
      <h1>Editar turno</h1>

    </div>
  );
};

export default EditAppointment;
