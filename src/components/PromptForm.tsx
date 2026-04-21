import React, { useState } from 'react';
import type { StoryboardSettings, ImageStyle } from '../types';
import { LAYOUTS } from '../types';
import { Wand2 } from 'lucide-react';

interface PromptFormProps {
  onGenerate: (settings: StoryboardSettings) => void;
  isLoading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ onGenerate, isLoading }) => {
  const [description, setDescription] = useState('');
  const [layoutId, setLayoutId] = useState<string>('classique');
  const [style, setStyle] = useState<ImageStyle>('ligne-claire');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    
    onGenerate({
      description,
      layoutId,
      style
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Paramètres de Génération</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
            Description du Storyboard (Idée ou scène détaillée)
          </label>
          <textarea
            id="description"
            className="input-base"
            placeholder="Ex: Un astronaute qui découvre une cité antique sur Mars, plan large, puis un gros plan sur son casque reflétant une lumière bleue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label htmlFor="layout" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
              Mise en page
            </label>
            <select 
              id="layout" 
              className="input-base"
              value={layoutId}
              onChange={(e) => setLayoutId(e.target.value)}
              disabled={isLoading}
            >
              {LAYOUTS.map(layout => (
                <option key={layout.id} value={layout.id}>
                  {layout.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="style" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
              Style Visuel
            </label>
            <select 
              id="style" 
              className="input-base"
              value={style}
              onChange={(e) => setStyle(e.target.value as ImageStyle)}
              disabled={isLoading}
            >
              <option value="ligne-claire">Ligne Claire (BD)</option>
              <option value="photorealiste">Photoréaliste 4K</option>
              <option value="anime">Anime (Ghibli)</option>
              <option value="3d-render">Rendu 3D (Unreal)</option>
              <option value="watercolor">Aquarelle</option>
              <option value="oil-painting">Peinture à l'huile</option>
              <option value="minimaliste">Minimaliste Flat</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isLoading || !description.trim()}
          >
            {isLoading ? (
              <>
                <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></div>
                <span>Génération par NanoBanana...</span>
              </>
            ) : (
              <>
                <Wand2 size={18} />
                <span>Générer le Storyboard</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PromptForm;
