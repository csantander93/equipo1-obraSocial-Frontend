import './PageWelcome.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const PageWelcome: React.FC = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="landing-page">
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <img src="/imgs/carrousel/medicina1.jpg" alt="medicina1" className="slider-image" />
          </div>
          <div>
            <img src="/imgs/carrousel/medicina2.jpg" alt="medicina2" className="slider-image" />
          </div>
          <div>
            <img src="/imgs/carrousel/medicina3.jpg" alt="medicina3" className="slider-image" />
          </div>
        </Slider>
      </div>
      <div className="info-section">
        <h2>Información de la Página</h2>
        <p>Almedin es una de las mejores obras sociales del país, comprometida con brindar un servicio de salud de calidad y accesible para todos. Nuestro objetivo es garantizar que cada afiliado reciba la atención médica que necesita, en el momento que lo necesita, con la mayor eficacia y profesionalismo. Contamos con una amplia red de profesionales y centros de salud que nos permite ofrecer una cobertura integral en todo el territorio nacional.</p>
      </div>
      <div className="contact-section">
        <h2>Contacto</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje:</label>
            <textarea id="message" name="message" maxLength={500} required></textarea>
          </div>
          <button type="submit" className="submit-button">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default PageWelcome;
