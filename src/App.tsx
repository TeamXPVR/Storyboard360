import { useState } from 'react';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import StoryboardPreview from './components/StoryboardPreview';
import ExportPanel from './components/ExportPanel';
import SettingsPanel from './components/SettingsPanel';
import { generateNanoBananaStoryboard } from './services/NanoBananaService';
import type { StoryboardCase, StoryboardSettings } from './types';
import './index.css';

function App() {
  const [cases, setCases] = useState<StoryboardCase[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeLayoutId, setActiveLayoutId] = useState<string>('classique');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleGenerate = async (settings: StoryboardSettings) => {
    setIsGenerating(true);
    setCases([]); // Vider la planche précédente
    setActiveLayoutId(settings.layoutId);
    
    try {
      // Appel au service NanoBanana pour la génération "Ligne Claire"
      const result = await generateNanoBananaStoryboard(settings);
      setCases(result);
    } catch (error) {
      console.error("Erreur de génération :", error);
      alert("Une erreur est survenue lors de la génération avec NanoBanana.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      <div className="color-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
      </div>
      
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />
      
      <main>
        <PromptForm onGenerate={handleGenerate} isLoading={isGenerating} />
        
        {/* On n'affiche la zone de prévisualisation et d'export que s'il y a une action ou des planches */}
        {(isGenerating || cases.length > 0) && (
          <>
            <StoryboardPreview cases={cases} isGenerating={isGenerating} layoutId={activeLayoutId} />
            <ExportPanel hasStoryboard={cases.length > 0 && !isGenerating} cases={cases} />
          </>
        )}
      </main>

      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

export default App;
