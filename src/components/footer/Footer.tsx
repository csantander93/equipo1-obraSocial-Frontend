import './Footer.css';

const FooterPag: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} AlMedin. Todos los derechos reservados.</p>
        <p>Hecho con amor ❤️ por</p>
        <ul className="footer-links">
          <li><a href="https://www.linkedin.com/in/cristian-santander-03807b17b/" target="_blank" rel="noopener noreferrer">Cristian Santander</a></li>
          <li>y</li>
          <li><a href="https://www.linkedin.com/in/juli%C3%A1n-colman-7a32b6267/" target="_blank" rel="noopener noreferrer">Julián Colman</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterPag;
