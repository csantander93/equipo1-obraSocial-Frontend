import React, { useState, useEffect, useRef } from 'react';
import RecipeService from '../../services/RecipeService';
import { TRecipe } from '../../models/types/entities/TRecipe';
import { FaFileDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Recipe.css';

const RecipeComponent: React.FC<{ idRecipe: number; onClose: () => void }> = ({ idRecipe, onClose }) => {
  const [recipe, setRecipe] = useState<TRecipe | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const fetchRecipe = async () => {
    try {
      const recipeData = await RecipeService.getRecipe(idRecipe);
      setRecipe(recipeData);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  const handleDownloadPDF = async () => {
    if (recipe) {
      const content = document.getElementById('recipe-content')!;
      content.classList.add('pdf-view');
      const canvas = await html2canvas(content, { scale: 2 });
      content.classList.remove('pdf-view');
      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imageData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Receta_${recipe.idReceta}.pdf`);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    fetchRecipe();

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="popup-container">
      <div className="popup-content" ref={popupRef}>
        <span className="popup-close" onClick={onClose}>
          &times;
        </span>
        <h1>Detalles de la Receta</h1>
        <div id="recipe-content">
          <p><strong>ID Receta:</strong> {recipe.idReceta}</p>
          <p><strong>Nombre Clínica:</strong> {recipe.nombreClinica}</p>
          <p><strong>Dirección Clínica:</strong> {recipe.direccionClinica}</p>
          <p><strong>Especialidad Médico:</strong> {recipe.especialidadMedico}</p>
          <p><strong>Fecha:</strong> {recipe.fecha}</p>
          <p><strong>Diagnóstico:</strong> {recipe.diagnostico}</p>
          <p><strong>Tratamiento:</strong> {recipe.tratamiento}</p>
          <p><strong>Nombre Completo Médico:</strong> {recipe.nombreCompletoMedico}</p>
        </div>
        <button className="popup-button" onClick={handleDownloadPDF}><FaFileDownload /> Descargar PDF</button>
      </div>
    </div>
  );
};

export default RecipeComponent;
