import React from 'react';
import MenuAppBar from '../AppBar/MenuAppBar';
import Footer from '../footer/Footer';
import './Home.css'; // Asegúrate de importar los estilos

const Home: React.FC = () => {
  return (
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
  );
}

export default Home;
