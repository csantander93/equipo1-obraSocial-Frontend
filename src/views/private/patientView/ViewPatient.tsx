import React from 'react';
import MenuAppBar from '../../../components/AppBar/MenuAppBar';
import Footer from '../../../components/footer/Footer';
import { DoctorProvider } from '../../../contexts/DoctorContext/DoctorContext';
import { AppointmentProvider } from '../../../contexts/AppointmentContext/AppointmentContext';
import { Route, Routes } from 'react-router-dom';
import { protectedRoutesPatient } from '../ProtectedRoutes';
import { SpecialityProvider } from '../../../contexts/SpecialityContext/SpecialityContext';

const ViewPatient: React.FC = () => {
  return (
    <AppointmentProvider>
    <DoctorProvider>
    <SpecialityProvider>
    <div className="wrapper">
      <header>
        <MenuAppBar />
      </header>
      <main>
        <Routes>
            {protectedRoutesPatient.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
              ))}
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
    </SpecialityProvider>
    </DoctorProvider>
    </AppointmentProvider>
  );
}

export default ViewPatient;