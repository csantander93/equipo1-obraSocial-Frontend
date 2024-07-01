import React, { useContext, useState, useEffect } from 'react';
import { DoctorContext } from '../../contexts/DoctorContext/DoctorContext';
import { SpecialityContext } from '../../contexts/SpecialityContext/SpecialityContext';
import { TDoctor } from '../../models/types/entities/TDoctor';
import './DoctorList.css'; // Asegúrate de importar el CSS

const DoctorList: React.FC = () => {
  const { doctors, loading: doctorsLoading, error: doctorsError, fetchDoctors } = useContext(DoctorContext);
  const { specialities, loading: specialitiesLoading, error: specialitiesError } = useContext(SpecialityContext);

  const [selectedSpeciality, setSelectedSpeciality] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  if (specialitiesLoading || doctorsLoading) {
    return <div>Loading...</div>;
  }

  if (specialitiesError) {
    return <div>Error: {specialitiesError}</div>;
  }

  if (doctorsError) {
    return <div>Error: {doctorsError}</div>;
  }

  if (doctors.length === 0) {
    return <div>No doctors available</div>;
  }

  const handleSpecialityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpeciality(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value);
  };

  const filteredDoctors = doctors.filter((doctor: TDoctor) => {
    return (
      (selectedSpeciality === '' || doctor.nombreEspecialidad === selectedSpeciality) &&
      (selectedLocation === '' || doctor.ubicacionConsulta === selectedLocation)
    );
  });

  const locations = Array.from(new Set(doctors.map((doctor: TDoctor) => doctor.ubicacionConsulta)));

  return (
    <div className="doctor-list-container">
      <h1>Cartilla de Especialistas</h1>
      <div className="filters">
        <div className="filter">
          <label htmlFor="speciality-select">Filtrar por especialidad:</label>
          <select id="speciality-select" value={selectedSpeciality} onChange={handleSpecialityChange}>
            <option value="">Todas</option>
            {specialities.map((speciality) => (
              <option key={speciality.idEspecialidad} value={speciality.nombreEspecialidad}>
                {speciality.nombreEspecialidad}
              </option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="location-select">Filtrar por lugar de atención:</label>
          <select id="location-select" value={selectedLocation} onChange={handleLocationChange}>
            <option value="">Todos</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul className="doctor-list">
        {filteredDoctors.map((doctor: TDoctor, index) => (
          <li key={index} className="doctor-item">
            <p className="doctor-name"><strong>Nombre:</strong> {doctor.nombreMedico}</p>
            <p className="doctor-specialization"><strong>Especialidad:</strong> {doctor.nombreEspecialidad}</p>
            <p className="doctor-info"><strong>Horario de atención:</strong> {doctor.atencionDesde} - {doctor.atencionHasta}</p>
            <p className="doctor-info"><strong>Lugar de atención:</strong> {doctor.ubicacionConsulta}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
