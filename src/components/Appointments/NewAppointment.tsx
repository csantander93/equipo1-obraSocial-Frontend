import React, { useContext, useState } from 'react';
import { SpecialityContext } from '../../contexts/SpecialityContext/SpecialityContext';
import './NewAppointment.css'; // Import CSS if you have any

const NewAppointment: React.FC = () => {
  const { specialities, loading, error } = useContext(SpecialityContext);
  const [selectedSpeciality, setSelectedSpeciality] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedSpeciality) {
      // Handle the selected speciality (e.g., send it to a backend service)
      console.log('Selected Speciality ID:', selectedSpeciality);
      // Additional logic to process the selected specialty
    } else {
      console.log('Please select a speciality.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="new-appointment-container">
      <h1>Solicitar turno</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div>
          <label htmlFor="speciality">Seleccione una especialidad:</label>
          <select
            id="speciality"
            value={selectedSpeciality || ''}
            onChange={(e) => setSelectedSpeciality(Number(e.target.value))}
          >
            <option value="">Seleccione especialidad</option>
            {specialities.map((speciality) => (
              <option key={speciality.idEspecialidad} value={speciality.idEspecialidad}>
                {speciality.nombreEspecialidad}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Confirmar</button>
      </form>
    </div>
  );
};

export default NewAppointment;
