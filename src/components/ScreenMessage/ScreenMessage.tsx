import React from 'react';
import './ScreenMessage.css';
import tick from '../../images/icons/tick.png';

type ScreenMessageProps = {
  message: string;
  status: number;
  onClose: () => void;
  onRedirect?: () => void; // Nueva prop para redirección
};

const ScreenMessage: React.FC<ScreenMessageProps> = ({ message, status, onClose, onRedirect }) => {
  const displayMessage = () => {
    if (status >= 200 && status <= 226) {
      return "¡Todo ha salido perfecto!";
    }
    if (status >= 400 && status <= 451) return "¡Un problema ha ocurrido!";
    return "¡Se ha producido un error!";
  };

  const displayIcon = () => {
    if (status >= 200 && status <= 226) return tick;
  };

  const handleButtonClick = () => {
    onClose();
    if (onRedirect) {
      onRedirect();
    }
  };

  return (
    <div className="screen-message">
      <div className="screen-message-content">
        <img src={displayIcon()} alt="Icono de respuesta" width={30} />
        <h3>{displayMessage()}</h3>
        <p>{message}</p>
        <button type="button" onClick={handleButtonClick}>Cerrar</button>
      </div>
    </div>
  );
};

export default ScreenMessage;
