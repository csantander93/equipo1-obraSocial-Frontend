import "./ReasonConsultPopUp.css";

interface ReasonConsultPopupProps {
  motivo: string;
  onClose: () => void;
}

const ReasonConsultPopup: React.FC<ReasonConsultPopupProps> = ({ motivo, onClose }) => (
  <div className="motivo-popup">
    <div className="motivo-content">
      <button className="close-button" onClick={onClose}>X</button>
    <div>
      <h3>Motivo de consulta</h3>
      <p>{motivo}</p>
    </div>
    </div>
  </div>
);

export default ReasonConsultPopup;
