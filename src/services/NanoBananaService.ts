import { GoogleGenAI } from '@google/genai';
import type { StoryboardCase, StoryboardSettings } from '../types';
import { LAYOUTS } from '../types';

/**
 * Service d'intégration 100% Client-Side pour Gemini API (BYOK)
 */
export const generateNanoBananaStoryboard = async (
  settings: StoryboardSettings
): Promise<StoryboardCase[]> => {
  
  const rawApiKey = localStorage.getItem('gemini_api_key');
  const apiKey = rawApiKey ? rawApiKey.trim() : null;
  const modelId = localStorage.getItem('gemini_model') || 'imagen-4.0-ultra-generate-001';
  
  const modelName = modelId === 'imagen-3.0-generate-001' 
    ? 'NanoBanana Standard (Imagen 3) - Plus Rapide' 
    : 'NanoBanana Pro (Imagen 4 Ultra) - Qualité Maximale';

  if (!apiKey) {
    alert("Veuillez configurer votre clé API NanoBanana (Google) dans les paramètres (icône ⚙️) avant de commencer !");
    throw new Error("Clé API manquante");
  }

  // Initialisation du SDK client avec la clé personnelle
  const ai = new GoogleGenAI({ apiKey: apiKey });

  const layout = LAYOUTS.find(l => l.id === settings.layoutId) || LAYOUTS[0];
  const totalCases = layout.cases.length;

  const styleDescriptions: Record<string, string> = {
    'ligne-claire': 'style bande dessinée "ligne claire" (ex: Hergé européen), contours noirs nets, couleurs en aplat sans dégradés complexes.',
    'photorealiste': '4k photorealistic photography, dramatic lighting, ultra-detailed, highly realistic.',
    'anime': 'high quality anime style, Studio Ghibli, vibrant colors, expressive characters.',
    '3d-render': '3D render, Unreal Engine 5 aesthetic, octane render, vivid lighting, volumetric.',
    'oil-painting': 'classic oil painting, visible brush strokes, rich texture, mastery.',
    'watercolor': 'beautiful watercolor painting, soft gradients, translucent colors, expressive bleeds.',
    'minimaliste': 'minimalist flat design, clean lines, simple shapes, limited color palette.'
  };

  const selectedStyleDescription = styleDescriptions[settings.style || 'ligne-claire'] || styleDescriptions['ligne-claire'];

  // Prépare un tableau de promesses pour générer toutes les cases en parallèle (Direct de navigateur à Google)
  const generatePromises = [];

  for (let i = 0; i < totalCases; i++) {
    const layoutDef = layout.cases[i];
    const caseDescription = `${settings.description} (Partie ${i + 1} de ${totalCases})`;
    
    // Le prompt intègre les consignes de style
    const prompt = `Générer une illustration pour un storyboard.
Description de la scène : ${caseDescription}
Style visuel strict : ${selectedStyleDescription}`;

    let aspectRatio = "16:9";
    if (layoutDef.format === '1:1') aspectRatio = "1:1";
    if (layoutDef.format === '9:16') aspectRatio = "9:16";
    
    generatePromises.push(
      ai.models.generateImages({
          model: modelId,
          prompt: prompt,
          config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: aspectRatio,
          }
      })
      .then(response => {
        // Sécurité TypeScript (TS18048 / TS2532)
        if (!response.generatedImages || response.generatedImages.length === 0 || !response.generatedImages[0].image) {
           throw new Error("L'API Google n'a renvoyé aucune image valide.");
        }
        
        // En mode Serverless, on traite tout en mémoire
        const base64Image = response.generatedImages[0].image.imageBytes;
        const dataUrl = `data:image/jpeg;base64,${base64Image}`;
        
        return {
          id: `case-${Date.now()}-${i}`,
          imageUrl: dataUrl,
          promptInterpretation: `Modèle : ${modelName}\nStyle appliqué : ${settings.style || 'ligne-claire'}`,
          format: layoutDef.format,
        };
      })
    );
  }

  try {
    const results = await Promise.all(generatePromises);
    return results;
  } catch (error: any) {
    console.error("Échec de la génération API Directe :", error);
    
    // Affichage détaillé de l'erreur pour comprendre le problème sur Vercel
    const errorMessage = error.message || "Erreur réseau ou CORS inconnue.";
    alert(`Erreur de connexion avec NanoBanana :\n${errorMessage}\n\nVérifiez que votre clé est correcte (sans espaces) et activée pour ce modèle.`);
    throw error;
  }
};
