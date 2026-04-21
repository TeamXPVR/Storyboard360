import React, { useState } from 'react';
import type { StoryboardCase } from '../types';
import { LAYOUTS } from '../types';

interface StoryboardPreviewProps {
  cases: StoryboardCase[];
  isGenerating: boolean;
  layoutId?: string;
  activeStyle?: string;
}

const styleNames: Record<string, string> = {
  'ligne-claire': 'Ligne Claire (BD)',
  'photorealiste': 'Photoréaliste 4K',
  'anime': 'Anime (Ghibli)',
  '3d-render': 'Rendu 3D (Unreal)',
  'watercolor': 'Aquarelle',
  'oil-painting': 'Peinture à l\'huile',
  'minimaliste': 'Minimaliste Flat'
};

const StoryboardPreview: React.FC<StoryboardPreviewProps> = ({ cases, isGenerating, layoutId = 'classique', activeStyle = 'ligne-claire' }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isGenerating) {
    const styleName = styleNames[activeStyle] || 'Ligne Claire';
    return (
      <div className="glass-panel" style={{ padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <div className="spinner" style={{ width: '48px', height: '48px', marginBottom: '1.5rem', borderColor: 'rgba(59, 130, 246, 0.2)', borderTopColor: 'var(--accent-color)' }}></div>
        <h3 className="text-gradient">Génération du Storyboard en cours...</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', textAlign: 'center' }}>
          NanoBanana analyse votre prompt et génère les illustrations style "{styleName}".
        </p>
      </div>
    );
  }

  if (!cases || cases.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', opacity: 0.5 }}>
        <p style={{ color: 'var(--text-secondary)' }}>
          Entrez une description et cliquez sur "Générer" pour commencer.
        </p>
      </div>
    );
  }

  // Calculate grid layout based on layout parameter
  const layout = LAYOUTS.find(l => l.id === layoutId) || LAYOUTS[0];
  const gridClass = layout.gridClass;

  return (
    <div id="storyboard-export-area" className={`storyboard-grid ${gridClass}`} style={{ marginBottom: '2rem' }}>
      {cases.map((c, index) => (
        <div key={c.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="ligne-claire-frame" style={{ 
            aspectRatio: c.format === '16:9' ? '16/9' : c.format === '9:16' ? '9/16' : '1/1',
            marginBottom: '1rem',
            cursor: 'zoom-in'
          }}
          onClick={() => setSelectedImage(c.imageUrl)}>
            <img src={c.imageUrl} alt={`Case ${index + 1}`} className="ligne-claire-image" crossOrigin="anonymous" />
          </div>
          
          <div className="glass-panel" style={{ padding: '1rem', borderLeft: '3px solid var(--accent-color)', borderRadius: '0 var(--border-radius-sm) var(--border-radius-sm) 0' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Interprétation Case {index + 1}
            </h4>
            <p style={{ fontSize: '0.9rem', whiteSpace: 'pre-line' }}>{c.promptInterpretation}</p>
          </div>
        </div>
      ))}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            cursor: 'zoom-out'
          }}
        >
          <img 
            src={selectedImage} 
            alt="Enlarged view" 
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              boxShadow: '0 0 40px rgba(59, 130, 246, 0.4)',
              borderRadius: '8px'
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default StoryboardPreview;
