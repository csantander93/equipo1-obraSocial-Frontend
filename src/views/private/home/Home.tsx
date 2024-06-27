import React from 'react';
import MenuAppBar from '../../../components/AppBar/MenuAppBar';
import Footer from '../../../components/footer/Footer';
import './Home.css'; // Asegúrate de importar los estilos
import { DoctorProvider } from '../../../contexts/DoctorContext/DoctorContext';
import { AppointmentProvider } from '../../../contexts/AppointmentContext/AppointmentContext';

const Home: React.FC = () => {
  return (
    <AppointmentProvider>
    <DoctorProvider>
    <div className="wrapper">
      <header>
        <MenuAppBar />
      </header>
      <main>

      </main>
      <footer>
        <Footer />
      </footer>
    </div>
    </DoctorProvider>
    </AppointmentProvider>
  );
}

export default Home;