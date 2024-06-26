import React from 'react';
import MenuAppBar from '../AppBar/MenuAppBar';
import Footer from '../footer/Footer';
import './Home.css'; // Asegúrate de importar los estilos
import { DoctorProvider } from '../../contexts/DoctorContext/DoctorContext';

const Home: React.FC = () => {
  return (

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

  );
}

export default Home;
