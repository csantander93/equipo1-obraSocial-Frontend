import './Footer.css';

const FooterPag: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
        <ul className="footer-links">
          <li><a href="/about">Sobre nosotros</a></li>
          <li><a href="https:www.google.com">Contacto</a></li>
          <li><a href="/privacy">Política de privacidad</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterPag;