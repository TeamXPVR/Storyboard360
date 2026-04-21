export type FormatType = '16:9' | '1:1' | '9:16';
export type CasesType = 1 | 2 | 3 | 4 | 5 | 6;
export type ImageStyle = 'ligne-claire' | 'photorealiste' | 'anime' | '3d-render' | 'oil-painting' | 'watercolor' | 'minimaliste';

export interface StoryboardCase {
  id: string;
  imageUrl: string;
  promptInterpretation: string;
  format: FormatType;
}

export interface StoryboardSettings {
  description: string;
  layoutId: string;
  style: ImageStyle;
}

export interface LayoutCaseDef {
  format: FormatType;
}

export interface LayoutTemplate {
  id: string;
  name: string;
  cases: LayoutCaseDef[];
  gridClass: string;
}

export const LAYOUTS: LayoutTemplate[] = [
  {
    id: 'single-16-9',
    name: 'Image Unique (Paysage 16:9)',
    cases: [{ format: '16:9' }],
    gridClass: 'layout-single'
  },
  {
    id: 'single-1-1',
    name: 'Image Unique (Carré 1:1)',
    cases: [{ format: '1:1' }],
    gridClass: 'layout-single'
  },
  {
    id: 'single-9-16',
    name: 'Image Unique (Portrait 9:16)',
    cases: [{ format: '9:16' }],
    gridClass: 'layout-single'
  },
  {
    id: 'classique',
    name: 'Classique (3 Cases Horizon)',
    cases: [{ format: '16:9' }, { format: '16:9' }, { format: '16:9' }],
    gridClass: 'layout-classique'
  },
  {
    id: 'manga-dynamique',
    name: 'Manga Dynamique',
    cases: [{ format: '16:9' }, { format: '1:1' }, { format: '1:1' }, { format: '9:16' }],
    gridClass: 'layout-manga'
  },
  {
    id: 'hero-details',
    name: 'Hero & Détails',
    cases: [{ format: '16:9' }, { format: '1:1' }, { format: '1:1' }, { format: '1:1' }],
    gridClass: 'layout-hero-details'
  },
  {
    id: 'grille-carree',
    name: 'Carré Instagram (2x2)',
    cases: [{ format: '1:1' }, { format: '1:1' }, { format: '1:1' }, { format: '1:1' }],
    gridClass: 'layout-grid-2x2'
  },
  {
    id: 'vertical',
    name: 'Vertical TikTok (3 Cases)',
    cases: [{ format: '9:16' }, { format: '9:16' }, { format: '9:16' }],
    gridClass: 'layout-vertical'
  }
];
