# Documentation et Historique du Projet Storyboard360

Cette documentation sert de référence globale pour comprendre la structure, les technologies et toutes les étapes clefs qui ont mené de la conception à la finalisation de l'application **Storyboard360**.

---

## 🏗️ 1. Synthèse de l'application & Technologies employées

**Concept Principal :** 
Storyboard360 est une **Single Page Application (SPA)** sophistiquée fonctionnant intégralement dans le navigateur (architecture 100% Stand-alone / Serverless). Elle permet la genèse de planches de storyboard ou d'illustrations indépendantes via des prompts textuels envoyés à l'Intelligence Artificielle de Google (le système "NanoBanana").

**Stack Technologique :**
*   **Mode de Rendu :** React 19 (Architecture fonctionnelle ultra-moderne basée sur les Hooks).
*   **Moteur de Compilation :** Vite.js (Environnement ultra-rapide de développement et bundling).
*   **Langage :** TypeScript (Garantit une sécurité maximale d'exécution en développement en vérifiant strictement le format des données).
*   **Stylisation Visuelle :** CSS Pur (Pas de framework de bridage temporel). Construit sur mesure intégralement à partir des principes esthétiques du *Glassmorphism* (effets translucides en verre dépoli) et de compositions `CSS Grid`.
*   **Hébergement & Sécurité :** L'approche est "BYOK" (Bring Your Own Key). Aucune base de données nécessaire, la clé API de l'utilisateur repose en toute sécurité dans la mémoire pure locale de son navigateur (`localStorage`). L'application est nativement compatible pour le déploiement gratuit Vercel / GitHub Pages.

**Bibliothèques Tierces :**
*   `@google/genai` : Pour orchestrer les requêtes REST au cerveau de l'intelligence artificielle (Imagen 3 & Imagen 4 Ultra).
*   `lucide-react` : Librairie d'icônes SVG pour une interface claire et élégante.
*   `html2canvas` & `jspdf` : Des moteurs JavaScript capables de "photographier" virtuellement les compositions et de les compiler en un document PDF A4 prêt à l'impression.
*   `jszip` & `file-saver` : Permettent, localement, de créer une archive zip regroupant l'ensemble des originaux des images.

---

## 🧠 2. Architecture des Composants et Utilités

La robustesse de l'application repose sur la segmentation précise de ses modules :

### `App.tsx` (Le Chef d'Orchestre)
C'est le fichier racine. Il est le conteneur principal qui stocke dans sa mémoire (`useState`) l'état des illustrations générées. C'est également ce composant qui orchestre le splendide fond d'écran coloré (les animations CSS *color-blobs*) qui illumine votre interface.

### `Header.tsx` (L'En-tête)
Il décore l'application et présente le sous-titre officiel : *"Générateur de Storyboarding propulsé par NanoBanana"*. C'est lui qui abrite l'icône de la roue dentée (Settings) pour accéder à l'interface de connexion.

### `SettingsPanel.tsx` (Le Centre Névralgique Locaux)
Ce panneau latéral coulissant, récemment développé, est la clef de votre architecture sécurité "Serverless". Il permet à l'utilisateur d'enregistrer sa clé API de manière furtive et de basculer la puissance LLM entre "Imagen 4 Ultra" et "Imagen 3". Ces paramètres subsistent d'une visite à l'autre sans serveur SQL.

### `PromptForm.tsx` (Le Poste de Pilotage Créatif)
Ce formulaire intelligent regroupe les consignes créatives : 
*   L'idée de scène de l'utilisateur.
*   Le sélecteur de **"Mise en Page"** (Grid carré, Classique, Manga asymétrique, Unique...). L'outil dicte à ce stade les formats proportionnels requis.
*   Le sélecteur de **"Styles"** (Aquarelle, Photoréaliste, 3D Render...).

### `StoryboardPreview.tsx` (L'Afficheur Dynamique)
Ce composant réceptionne vos images d'intelligence artificielle. Il se charge de les agencer à l'écran via différentes classes CSS (ex: `.layout-manga`, `.layout-single`) selon le gabarit de mise en page initial choisi. Il abrite secrètement le module **"Lightbox"**, qui surgit lorsqu'on clique sur une image pour l'admirer en plein écran.

### `ExportPanel.tsx` (L'Usine à Exports)
Si le client veut sauvegarder, ce composant s'active. Il propose le bouton magique "PDF" et le bouton "ZIP" exécutant des algorithmes qui récupèrent les données Base64 cachées des images pour générer les fichiers locaux physiques.

### `NanoBananaService.ts` (Le Routeur Cérébral IA)
Il assure la véritable liaison technique avec Google (NanoBanana). Il transforme les souhaits (layout + style) en commandes informatiques formatées (`prompt`) compréhensibles, appelle en parallèle l'API pour chaque image composant une planche en respectant leurs ratios précis (16:9, 1:1, etc.).

### `index.css` (L'Âme du Design)
Ce fichier est gigantesque et a été minutieusement poli. Il contient :
*   Les composants textuels basés sur la divine typographie Google **"Inter"**.
*   Les ombres et fonds semi-opaques (`glass-panel`, `glass-input`).
*   L'illusion temporelle d'arrière plan (les `@keyframes`) qui gère les balancements de halos colorimétriques fluides par le spectre `hue-rotate` sur l'ensemble de l'écran.

---

## 📖 3. Chronologie de Création : Les 6 Étapes du Projet

### Phase 1 : Les Fondations du Concept "Ligne Claire"
L'objectif initial était rudimentaire mais fondamental : prouver que l'IA (Gemini) pouvait se conformer spécifiquement à une doctrine artistique précise ("Ligne Claire" à la Hergé). La première version reposait lourdement sur un backend Node.js (`server/index.js`) qui cachait de façon classique la clé secrète Google et qui téléchargeait vulgairement l'image finale sur le disque dur.

### Phase 2 : Rénovation Esthétique (Le Premium)
Demande express : "L'application doit faire Wow à l'utilisateur". Un chamboulement de design a vu le jour. Retrait des couleurs "basiques", introduction du Glassmorphism, animations douces (boutons rayonnants), barres de dégradés (Gradients). Ajout des premiers balbutiements d'export via `jspdf`.

### Phase 3 : L'Extrême Flexibilité
La limitation du format standard devenant un problème. L'architecture a été revue pour accepter une géométrie d'images variable (16:9, 1:1, 9:16). Le module de téléchargement ZIP individuel local avec `jszip` a été inventé cette semaine-là, accompagné de débogages liés à la transparence (`html2canvas` produisant des casiers "grisés" lors des fusions d'effets visuels CSS).

### Phase 4 : Révolution des Styles et Layouts "Pro"
La décision stratégique de faire éclore un "Vrai studio". 
Apparition massive de nombreux nouveaux courants artistiques (Photoréalisme, Minimalisme). Mais surtout, intégration de **Modèles de Mises en Page** ("Layouts"). Il s'agissait du premier grand prodige de code : le service IA gère enfin simultanément différentes tailles de cases asymétriques issues du même prompt et du même thème pour générer de sublimes planches dynamiques, à l'inverse d'un générateur web classique.

### Phase 5 : Magnification UI et Effets Atmosphériques
La page ne se suffisait pas à elle-même, un besoin d'ambiance respirante s'est fait sentir.
C'est la naissance de la solution du **Néon Fluctuant CSS**. La première solution crénelée par `Color Dodge` (saturations indésirables) a été recalibrée sous le joug d'un puissant filtre de défilement RGB total (rotation chromatique à 360° du filtre spatial sur 18 secondes). Un raffinement complet clôturant la sur-couche avec la fameuse "Lightbox" (plein écran) à l'aperçu des cases.

### Phase 6 : La Coupure du Cordon Ombilical (Migration Serverless BYOK)
L'étape finale et apothéose logicielle menée le 21 Avril 2026. L'application, alourdie par le vieux serveur local backend de la Phase 1 n'était pas distribuable convenablement.
Refonte globale, intégration directe du composant SDK Google GenAI dans le navigateur. Conception du Panneau des "Paramètres Locaux" confiant la responsabilité de la clé API à l'hébergement chiffré du navigateur au travers de la technologie BYOK (Bring Your Own Key). La boucle des données traitées est dorénavant 100% "Serverless", rapide (image textuelle Base64), totalement indépendante et finaliste pour Vercel/GitHub Pages. Ajout final d'un raccourci UX direct vers Google AI Studio au sein des paramètres pour permettre aux novices de générer sans friction leur clé gratuite.

### Phase 7 : Sécurisation et Débogage Post-Déploiement
*   **Correction TypeScript Strict** : L'environnement Vercel a bloqué la première compilation en raison d'un manque de typage conditionnel strict sur le retour de l'API (`TS18048`). Un garde-fou a été programmé.
*   **Auto-nettoyage des Clés (Trim)** : Le copier-coller des clés API engendrait parfois des erreurs à cause d'espaces fantômes. Ajout de la fonction `.trim()` dans les paramètres.
*   **Gestion des Fuites (Secret Scanning)** : L'envoi accidentel de l'ancien dossier `server` contenant un fichier `.env` sur Github a provoqué une alerte de sécurité. Le dossier a été détruit et l'historique Git purgé totalement (`git checkout --orphan`, `git push --force`).

---

## 🛠️ 4. Synthèse des Erreurs Rencontrées et Leçons Tirées

Ce projet a permis de surmonter plusieurs défis techniques majeurs tout au long de sa conception :

1.  **L'Écran Gris du PDF (`html2canvas`)** :
    *   *Symptôme* : Lors de l'export PDF, les cases d'images ressortaient grisées.
    *   *Cause* : Conflit de rendu du DOM entre les effets CSS avancés (Glassmorphism, animations) et le moteur de capture Javascript.
    *   *Solution* : Forçage du chargement complet des images Data-URI et désactivation temporaire des effets visuels parasites lors du clic d'export.
2.  **CORS & Proxying** :
    *   *Symptôme* : Impossibilité d'appeler l'API Gemini directement depuis le frontend (au début du projet).
    *   *Cause* : Sécurité inhérente aux requêtes API (Cross-Origin Resource Sharing).
    *   *Solution Initiale* : Création d'un serveur relais en Node.js/Express (`/api/generate`).
    *   *Solution Finale* : Remplacement complet par le nouveau SDK `@google/genai` en Serverless avec clé utilisateur locale, qui intègre nativement la gestion Edge des requêtes.
3.  **L'Enfer du Crénelage (Color Banding)** :
    *   *Symptôme* : Le fond coloré affichait des bandes disgracieuses (artefacts visuels) lors des fusions de couleurs.
    *   *Cause* : Limite du mode de fusion `color-dodge` combiné à de très fortes opacités CSS.
    *   *Solution* : Refonte par un fond basé sur des halos colorés purs tournants (animation `hue-rotate` sur 360°) noyés sous un filtre `blur()`, éliminant tout effet d'escalier.
4.  **Erreurs de Build Strict (Vercel)** :
    *   *Symptôme* : Code fonctionnel localement, mais échec sur le cloud.
    *   *Cause* : TypeScript strict refusait la lecture de l'image si la propriété pouvait théoriquement être indéfinie (`undefined`).
    *   *Solution* : Blindage algorithmique conditionnant l'accès aux variables de l'API.

---
**STATUT ACTUEL DU PROJET : ACHEVÉ - OPÉRATIONNEL - DEPLOYABLE**
