import React from 'react';
import MenuAppBar from '../../../components/AppBar/MenuAppBar';
import Footer from '../../../components/footer/Footer';
import './Home.css'; // Asegúrate de importar los estilos
import { DoctorProvider } from '../../../contexts/DoctorContext/DoctorContext';
import { AppointmentProvider } from '../../../contexts/AppointmentContext/AppointmentContext';
import { Route, Routes } from 'react-router-dom';
import { protectedRoutes } from '../ProtectedRoutes';

const Home: React.FC = () => {
  return (
    <AppointmentProvider>
    <DoctorProvider>
    <div className="wrapper">
      <header>
        <MenuAppBar />
      </header>
      <main>
        <Routes>
            {protectedRoutes.map(({ path, component: Component }) => (
               <Route key={path} path={path} element={<Component />} />
              ))}
        </Routes>
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