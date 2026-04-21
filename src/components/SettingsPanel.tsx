import React, { useState, useEffect } from 'react';
import { X, Save, RefreshCw, Key } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const MODÈLES_NANO = [
  { id: 'imagen-4.0-ultra-generate-001', name: 'NanoBanana Pro (Imagen 4 Ultra) - Qualité Maximale' },
  { id: 'imagen-3.0-generate-001', name: 'NanoBanana Standard (Imagen 3) - Plus Rapide' },
];

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState(MODÈLES_NANO[0].id);

  // Charger depuis le localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    const savedModel = localStorage.getItem('gemini_model');
    if (savedKey) setApiKey(savedKey);
    if (savedModel) setModel(savedModel);
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('gemini_api_key', apiKey.trim());
    localStorage.setItem('gemini_model', model);
    onClose();
  };

  const handleReset = () => {
    localStorage.removeItem('gemini_api_key');
    localStorage.removeItem('gemini_model');
    setApiKey('');
    setModel(MODÈLES_NANO[0].id);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '100%',
      height: '100%',
      zIndex: 10000,
      pointerEvents: 'none'
    }}>
      {/* Overlay sombre */}
      <div 
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', pointerEvents: 'auto'
        }}
        onClick={onClose}
      />

      {/* Panneau latéral */}
      <div className="glass-panel" style={{
        position: 'absolute', top: 0, right: 0, width: '400px', maxWidth: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', pointerEvents: 'auto',
        borderRight: 'none', borderTop: 'none', borderBottom: 'none', borderRadius: 'var(--border-radius-lg) 0 0 var(--border-radius-lg)',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.3)',
        animation: 'slideInRight 0.3s ease-out forwards'
      }}>
        <div style={{ padding: '2.5rem 2rem 2rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="text-gradient" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
            <Key size={24} /> Paramètres locaux
          </h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={28} />
          </button>
        </div>

        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>
              Clé API NanoBanana (Google AI)
            </label>
            <input 
              type="password"
              placeholder="Saisissez votre clé API..."
              className="glass-input"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{ width: '100%', padding: '0.8rem 1rem' }}
            />
            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              Stockée en toute sécurité dans votre navigateur (`localStorage`). Ne transite par aucun serveur tiers.
            </p>
            <p style={{ marginTop: '0.8rem', fontSize: '0.85rem' }}>
              👉 <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 500 }}>
                Obtenir une clé API gratuite sur Google AI Studio
              </a>
            </p>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>
              Modèle NanoBanana
            </label>
            <select 
              className="glass-input"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              style={{ width: '100%', padding: '0.8rem 1rem' }}
            >
              {MODÈLES_NANO.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          <button onClick={handleSave} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '1rem' }}>
            <Save size={20} /> Sauvegarder
          </button>
          <button onClick={handleReset} className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', border: '1px solid rgba(255, 100, 100, 0.3)', color: '#ff6b6b', padding: '1rem', cursor: 'pointer', background: 'transparent' }}>
            <RefreshCw size={20} /> Réinitialiser
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default SettingsPanel;
