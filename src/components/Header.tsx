import React from 'react';
import { Film, Settings } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  return (
    <header className="glass-panel" style={{ padding: '1rem 2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: '0 0 var(--border-radius-lg) var(--border-radius-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Film size={32} color="var(--accent-color)" />
        <div>
          <h1 className="text-gradient" style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>Storyboard360</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Générateur de Storyboarding propulsé par NanoBanana</p>
        </div>
      </div>
      
      <button 
        onClick={onOpenSettings}
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.8rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.05)',
          cursor: 'pointer',
          borderRadius: '50%'
        }}
        title="Paramètres API"
      >
        <Settings size={22} color="var(--text-primary)" />
      </button>
    </header>
  );
};

export default Header;
