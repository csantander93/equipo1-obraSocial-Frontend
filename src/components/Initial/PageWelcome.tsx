import React, { useState, useRef, useEffect } from 'react';
import './PageWelcome.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from '../../contexts/UserContext/UserContext';

const PageWelcome: React.FC = () => {
  const { user } = useAuth();
  
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const faqData = [
    {
      question: "¿CÓMO PUEDO SABER QUE MÉDICOS ME PUEDEN ATENDER SEGÚN MIS PREFERENCIAS?",
      answer: "Puedes buscar profesionales médicos a través de nuestra cartilla de especialistas, la encontrarás en el NavBar de la página, y filtrar los resultados según tus necesidades."
    },
    {
      question: "¿CÓMO PUEDO AGENDAR UNA CITA CON UN ESPECIALISTA?",
      answer: "¡Súper sencillo! Debes dirigirte a 'Turnos', lo encontrarás en el NavBar de la página. Allí verás un botón 'Solicitar Turno'. Al clickearlo, podrás seleccionar la especialidad con la que te quieres atender, un especialista según tus preferencias, el día que te quieres atender según que turnos tenga disponible el médico, así también como un horario dentro de la jornada laboral del médico, y un motivo de la consulta."
    },
    {
      question: "QUIERO CANCELAR UN TURNO",
      answer: "Para cancelar un turno, podrás observar en la lista de turnos una columna de Acciones. En la misma, tendrás la posibilidad de dar de baja un turno si así lo deseas, dando click en el ícono ROJO de basura. Importante: Revisar bien que sea el turno que quieres dar de baja."
    },
    { 
      question: "QUIERO EDITAR UN TURNO",
      answer: "Para editar un turno, podrás observar en la lista de turnos una columna de Acciones. En la misma, tendrás la posibilidad de editar un turno si así lo deseas, dando click en el ícono de edición AZUL. Allí podrás modificar la fecha, horario y motivo de la consulta."
    },
    { 
      question: "¿PUEDO VER / DESCARGAR LA RECETA MÉDICA?",
      answer: "Sí, claro. Luego de concretarse tu encuentro con el especialista médico, él se encargará de confeccionar tu receta. Una vez disponible, en la lista de tus turnos, en la columna de Recetas, podrás hacer click en el ícono de Documento. Allí podrás visualizar tu receta médica, junto a un botón de 'Descargar PDF'."
    },
    { 
      question: "TENGO UNA CONSULTA DIFERENTE",
      answer: "Podrás realizar tu consulta en cualquiera de nuestras clínicas AlMedin, o bien, puedes llamar a la línea 0800 333 2705."
    }

  ];

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
      <div className="presentation-container">
        <img src="/imgs/logoazul.png" alt="logo" className="logo-image" />
        <div className="company-info">
          <h2>Sobre AlMedin</h2>
          <p className="indent-text">
            AlMedin es considerada como una de las mejores obras sociales del país, comprometida con brindar un servicio de salud de calidad y accesible para todos. Nos encargamos de recibir a nuestros pacientes dándoles la mayor comodidad y cariño posible. Para ello, contamos con clínicas de alto nivel, situadas en diversos lugares de la nación, con el objetivo de llegar a todas partes de la misma. Nuestro objetivo es garantizar que cada afiliado reciba la atención médica que necesita, en el momento que lo necesita, con la mayor eficacia y profesionalismo posible. Contamos con una amplia red de profesionales y centros de salud que nos permite ofrecer una cobertura integral en todo el territorio nacional.
          </p>
        </div>
      </div>
      <div className="faq-section">
        <h2 className='faq-title'>Nuestros usuarios preguntan...</h2>
        <div className="faq-container">
          {faqData.map((item, index) => (
            <div key={index} className={`faq-item ${openFAQ === index ? 'open' : ''}`}>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                {item.question}
                <span className="faq-toggle">{openFAQ === index ? '-' : '+'}</span>
              </div>
              <div 
                className="faq-answer" 
                style={{
                  maxHeight: openFAQ === index ? '1000px' : '0px',
                  opacity: openFAQ === index ? 1 : 0,
                }}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageWelcome;
