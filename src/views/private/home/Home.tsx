import './Home.css'; // Asegúrate de importar los estilos
import ViewPatient from '../patientView/ViewPatient';
import ViewDoctor from '../doctorView/ViewDoctor';
import { useAuth } from '../../../contexts/UserContext/UserContext';

const Home: React.FC = () => {

  const { user } = useAuth();

  return (
    <div>
      {user?.rolUsuario === 'Paciente' ? <ViewPatient /> : <ViewDoctor />}
    </div>
  );
}

export default Home;