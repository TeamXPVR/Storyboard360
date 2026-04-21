import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { StoryboardCase } from '../types';

interface ExportPanelProps {
  hasStoryboard: boolean;
  cases?: StoryboardCase[];
}

const ExportPanel: React.FC<ExportPanelProps> = ({ hasStoryboard, cases = [] }) => {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingZIP, setIsExportingZIP] = useState(false);

  if (!hasStoryboard) return null;

  const handleExportZip = async () => {
    if (cases.length === 0) return;
    setIsExportingZIP(true);
    try {
      const zip = new JSZip();
      
      // Fetch chaque image et l'ajoute au zip sous forme de blob
      for (let i = 0; i < cases.length; i++) {
        const item = cases[i];
        const response = await fetch(item.imageUrl);
        const blob = await response.blob();
        zip.file(`storyboard-case-${i + 1}.jpg`, blob);
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, 'Storyboard_Images.zip');
    } catch (error) {
      console.error("Erreur lors de la génération du ZIP", error);
      alert("Impossible de générer le ZIP pour le moment.");
    } finally {
      setIsExportingZIP(false);
    }
  };

  const handleExportPDF = async () => {
    const storyboardElement = document.getElementById('storyboard-export-area');
    if (!storyboardElement) return;

    setIsExportingPDF(true);
    // On force l'arrêt des animations (qui causent le grisement sous html2canvas)
    storyboardElement.classList.add('export-mode');
    
    try {
      // Create a canvas from the storyboard area
      const canvas = await html2canvas(storyboardElement, {
        scale: 2, // Higher resolution
        useCORS: true,
        backgroundColor: '#0f1115' // dark theme background
      });

      storyboardElement.classList.remove('export-mode');

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // Calculate PDF dimensions (A4 Landscape or Portrait based on content aspect ratio)
      const isLandscape = canvas.width > canvas.height;
      const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
      pdf.save('Storyboard360_NanoBanana.pdf');
    } catch (error) {
      console.error("Erreur lors de l'export PDF:", error);
    } finally {
      setIsExportingPDF(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Exporter votre Storyboard</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Les exports sont générés en local pour garantir la confidentialité.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          className="btn btn-secondary"
          onClick={handleExportZip}
          disabled={isExportingPDF || isExportingZIP}
        >
          {isExportingZIP ? (
            <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px', borderColor: 'var(--text-secondary) transparent var(--text-secondary) transparent' }}></div>
          ) : (
            <Download size={18} />
          )}
          Images (ZIP)
        </button>
        
        <button 
          className="btn btn-primary"
          onClick={handleExportPDF}
          disabled={isExportingPDF}
        >
          {isExportingPDF ? (
            <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></div>
          ) : (
            <FileText size={18} />
          )}
          Télécharger PDF
        </button>
      </div>
    </div>
  );
};

export default ExportPanel;
