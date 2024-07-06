import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MenuAppBarDoctor from '../../../components/AppBar/MenuAppBarDoctor';
import Footer from '../../../components/footer/Footer';
import { protectedRoutesDoctor } from '../ProtectedRoutes';
import { AppointmentProvider } from '../../../contexts/AppointmentContext/AppointmentContext';

const ViewDoctor: React.FC = () => {
  return (
    <AppointmentProvider>
    <div className="wrapper">
      <header>
        <MenuAppBarDoctor />
      </header>
      <main>
        <Routes>
          {protectedRoutesDoctor.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
    </AppointmentProvider>
<<<<<<< HEAD
    
=======
>>>>>>> rama_cris
  );
};

export default ViewDoctor;
