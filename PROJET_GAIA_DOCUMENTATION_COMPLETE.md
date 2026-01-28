# 📘 Documentation Complète du Projet Gaia

## 🌍 Vue d'Ensemble du Projet

**Projet Gaia** est une solution innovante de reforestation intelligente développée par des étudiants de Terminale SI (Sciences de l'Ingénieur) du Lycée Saint-Joseph à Dijon. Le projet consiste en un **drone électrique autonome et intelligent** conçu pour accélérer la reforestation mondiale et restaurer durablement les écosystèmes face à l'urgence climatique.

### Informations Générales

- **Établissement** : Lycée Saint-Joseph Dijon
- **Classe** : Terminale - Sciences de l'Ingénieur
- **Période d'exécution** : Juin 2025 - Juin 2026
- **Type** : Projet de reforestation par drone autonome électrique
- **Technologies** : IA, IoT, Surveillance par drones

---

## 🎯 Problématique

**Comment utiliser les technologies aériennes pour accélérer la reforestation et restaurer durablement les écosystèmes dégradés face à l'urgence climatique mondiale ?**

---

## 🌡️ Contexte et Défis Environnementaux

### Les Enjeux Majeurs

Le projet Gaia répond à quatre défis environnementaux critiques :

#### 1. **Déforestation Massive**
- Le Sahara avance de **5-10 km par an** dans les forêts tropicales
- Accélération de la désertification à l'échelle mondiale
- Perte massive de biodiversité

#### 2. **Montée des Eaux**
- Plus d'**1 milliard de personnes** devront migrer d'ici 2050 selon l'ONU
- Submersion des zones côtières
- Déplacement massif de populations

#### 3. **Dérèglement Climatique**
- Urgence d'agir face aux changements environnementaux globaux
- Bouleversement des écosystèmes
- Phénomènes météorologiques extrêmes

#### 4. **Solutions Actuelles Coûteuses**
- Méthodes traditionnelles (hélicoptères, avions) très onéreuses
- Fort impact environnemental (émissions CO₂)
- Risques pour les pilotes
- Coûts d'exploitation prohibitifs

---

## ✈️ La Solution : Gaia

### Description Technique

**Gaia** est un **avion 100% électrique intelligent** équipé d'une batterie haute capacité et muni d'une soute pour larguer des **Seedballs** (billes de graines). C'est une solution écologique, économique et sécurisée pour accélérer la reforestation mondiale.

### Caractéristiques Principales

#### 🌿 **100% Écologique**
- **Zéro émission** de gaz à effet de serre
- Motorisation 100% électrique
- Alimentation par batteries rechargeables
- Impact environnemental minimal

#### 🤖 **Autonome**
- Pas de risque humain
- Pilotage à distance
- Fonctionnement automatisé
- Navigation GPS intégrée
- Systèmes de sécurité avancés

#### 💰 **Économique**
- Alternative abordable aux hélicoptères et avions traditionnels
- Coûts d'exploitation réduits
- Maintenance simplifiée
- Production potentiellement à grande échelle

### Vision d'Avenir

Avec les progrès de l'aéronautique, Gaia pourra être produit à grande échelle tout en restant écologique, notamment grâce aux **futures technologies à hydrogène**. Une solution scalable pour un impact environnemental mondial.

---

## 🔧 Spécifications Techniques

### Performances de Vol

#### Vitesse
- **Vitesse théorique maximale** : 107 km/h (moteur KV 1400 avec hélice 8x6)
- **Vitesse réaliste de croisière** : 70-80 km/h
- **Vitesse maximale réaliste** : 100-110 km/h
- **Vitesse de décrochage** : 31 km/h
- **Ratio puissance/poids** : 230 W/kg (catégorie vol sportif)

#### Décollage
- **Temps de décollage** : 1,5 à 2 secondes
- **Distance de décollage** : 7 à 20 mètres
- **Type** : Décollage court adapté aux terrains variés

#### Autonomie
Configurations possibles :
- **Configuration Mixte (1400mAh)** : ~3 minutes de vol
- **Configuration Longue Durée (4000mAh)** : 8-10 minutes de vol
- Temps de vol optimisé selon la mission

### Aérodynamique

#### Profil d'Aile : NACA 5414
- **Surface alaire** : 0,55 m²
- **Envergure** : 1,7 mètre
- **Corde moyenne** : 30 cm
- **Profil** : Optimisé pour la portance et l'efficacité énergétique

### Motorisation

- **Type** : Moteur brushless électrique
- **KV** : 1400
- **Hélice** : 8x6 pouces
- **Contrôleur (ESC)** : Adapté à la puissance du moteur
- **Batteries** : LiPo haute capacité

### Charge Utile

- **Soute à Seedballs** : Capacité d'emport optimisée
- **Système de largage** : Mécanisme contrôlé à distance
- **Poids total** : Optimisé pour les performances de vol

---

## 🧮 Calculs Physiques Détaillés

### 1. Calcul de Vitesse Pitch (Vitesse Théorique Maximale)

**Formule** : 
```
Vitesse (km/h) = (KV × Voltage × Pitch × 60) / 1 000 000
```

**Application** :
- **KV** : 1400 tr/min/V
- **Voltage** : 11,1V (batterie 3S LiPo)
- **Pitch** : 6 pouces (15,24 cm)

**Résultat** : ~107 km/h (vitesse théorique)

**Vitesse réaliste** : 75-85 km/h (tenant compte des pertes)

---

### 2. Estimation Vitesses Cessna 172 (Analogie)

Pour référence avec un avion léger réel :

- **Vitesse de décrochage** : 31 km/h
- **Vitesse de croisière** : 70-80 km/h
- **Vitesse maximale** : 100-110 km/h

---

### 3. Performances au Décollage

#### Temps de Décollage
**Formule** :
```
t = Vd / a
où a = (Thrust - Drag) / masse
```

**Résultat** : 1,5 à 2 secondes

#### Distance de Décollage
**Formule** :
```
d = (Vd²) / (2 × a)
```

**Résultat** : 7 à 20 mètres

---

### 4. Ratio Puissance/Poids

**Calcul** :
```
P/W = Puissance moteur (W) / Poids total (kg)
```

**Résultat** : ~230 W/kg

**Classification** : Vol sportif (>200 W/kg = acrobaties possibles)

---

### 5. Autonomie de la Batterie

#### Configuration 1 : Batterie 1400mAh
- **Vol mixte** : ~3 minutes
- **Vol en croisière** : ~4 minutes

#### Configuration 2 : Batterie 4000mAh
- **Vol mixte** : 8-10 minutes
- **Vol en croisière** : 12-15 minutes

**Facteurs influençant l'autonomie** :
- Conditions météorologiques
- Poids de la charge utile
- Style de pilotage
- Température ambiante

---

### 6. Dimensionnement de l'Aile

#### Profil NACA 5414

**Spécifications** :
- **Surface** : 0,55 m²
- **Envergure** : 1,7 m
- **Corde** : 30 cm
- **Allongement** : 5,25 (ratio envergure/corde)

**Caractéristiques** :
- Cambrure de 5% (portance élevée)
- Position de cambrure maximale à 40% de la corde
- Épaisseur de 14% (bon compromis portance/traînée)

---

## 👥 L'Équipe du Projet

### Membres de l'Équipe

Le projet est porté par cinq étudiants passionnés de Terminale SI :

| Nom | Rôle | Responsabilités |
|-----|------|----------------|
| **Nathan LIENARD** | Développement Technique | Câblage et aide à la conception aéronautique |
| **Constant MOREAU** | Systèmes internes et externes | Conception et développement des systèmes techniques |
| **Hugues DUCHANOY** | Modélisation 3D | Architecture et intégration des composants |
| **Yanis EL-KFEL** | Physique et Communication | Bases de calculs physiques |
| **Aloys GROUET** | Optimisation 3D | Affinement et détails 3D |

### Encadrement

- **Établissement** : Lycée Saint-Joseph Dijon
- **Filière** : Terminale - Sciences de l'Ingénieur
- **Période** : Juin 2025 - Juin 2026

---

## 💼 Partenariat et Sponsoring

### Pack Sponsor

**Tarif** : À partir de **50€** par entreprise

#### Avantages du Pack Sponsor

##### 1. **Promotion sur les Réseaux Sociaux**
- Mise en avant sur Instagram via **SkyX International** (@skyx_intl)
- Visibilité auprès d'une large communauté
- Posts dédiés et mentions régulières

##### 2. **Logo sur l'Avion**
- Affichage du logo sponsor sur le drone
- Visibilité exceptionnelle lors des vols et événements
- Association directe avec l'innovation écologique

#### Pourquoi Devenir Sponsor ?

En soutenant le projet Gaia, vous :
- Contribuez à un **avenir plus vert**
- Donnez une **visibilité unique** à votre entreprise
- Valorisez votre **engagement environnemental**
- Êtes reconnu auprès de notre communauté
- Participez à une **innovation technologique** éducative

### Catégories de Partenaires

Les sponsors et partenaires sont organisés par catégories selon leur domaine d'activité et leur niveau d'engagement.

---

## 🗓️ Roadmap du Projet

Le développement de Gaia suit un planning structuré en plusieurs phases. Les étapes clés comprennent :

### Phases de Développement

1. **Conception et Recherche**
   - Études de faisabilité
   - Calculs aérodynamiques
   - Choix des composants

2. **Prototypage**
   - Modélisation 3D
   - Impression/fabrication des pièces
   - Tests de composants

3. **Assemblage**
   - Intégration des systèmes électroniques
   - Câblage et connexions
   - Installation du système de largage

4. **Tests et Validation**
   - Tests au sol
   - Vols d'essai
   - Ajustements et optimisations

5. **Démonstration Finale**
   - Présentation du projet
   - Vol de démonstration
   - Documentation complète

### Suivi en Temps Réel

La roadmap détaillée est disponible sur le site web avec :
- Statuts des tâches (Planifié, En cours, Terminé)
- Échéanciers précis
- Fichiers et ressources associés
- Contenus multimédias (photos, vidéos, documents techniques)

---

## 🖥️ Application Web - Fonctionnalités

### Site Web Public

Le site web **projet-gaia** présente le projet avec plusieurs pages :

#### Page d'Accueil (`/`)
Sections principales :
- **Hero** : Présentation cinématique du projet
- **Like** : Système de soutien communautaire
- **Projet** : Contexte et problématique
- **Solution** : Description de Gaia
- **Roadmap** : Aperçu des étapes
- **Sponsors** : Partenaires du projet
- **Équipe** : Membres du projet
- **Contact** : Formulaires de contact

#### Documentation (`/documentation`)
- Sections organisées (Vue d'ensemble, Fonctionnalités, Spécifications, etc.)
- Contenu enrichi (texte, tableaux, accordéons, listes)
- Support markdown avec rendu HTML
- Export PDF disponible
- Interface intuitive avec navigation latérale

#### Roadmap (`/roadmap`)
- Timeline visuelle des étapes du projet
- Cartes détaillées pour chaque phase
- Support de contenu markdown
- Fichiers attachés (images, documents, vidéos)
- Vidéos YouTube/Vimeo intégrées
- Formules mathématiques (LaTeX/KaTeX)
- Indicateurs de progression
- Onglet **Calculs Techniques** avec 6 modules de calcul

#### Partenaires (`/partenaires`)
- Liste des sponsors par catégorie
- Présentation de l'offre de partenariat
- Détails du Pack Sponsor (50€)
- Formulaire de contact pour devenir partenaire
- Cartes interactives avec logos et descriptions

#### Présentation (`/presentation`)
- Mode diaporama full-screen
- Navigation au clavier (flèches, Espace, Échap)
- Slides professionnelles avec animations
- Données dynamiques (roadmap, sponsors)
- Design cinématique et moderne

#### Galerie (`/galerie`)
- Galerie d'images du projet
- Affichage en grille responsive
- Modal de visualisation pleine taille
- Téléchargement de ressources
- Fichiers et documents techniques

### Interface d'Administration (`/admin`)

Tableau de bord complet pour gérer tout le contenu du site :

#### 1. **Dashboard**
- Statut d'authentification
- Vue d'ensemble du système
- Accès rapide aux modules

#### 2. **Gestion S3 (Fichiers)**
- Upload de fichiers vers Supabase Storage
- Modes : Réel / Démo
- Gestion des fichiers globaux
- Prévisualisation et suppression

#### 3. **Gestion Roadmap**
- Création/édition d'étapes
- Éditeur de texte enrichi (markdown)
- Upload de fichiers associés
- Gestion du statut (Planifié/En cours/Terminé)
- Ordre d'affichage personnalisable
- Publication/dépublication

#### 4. **Task Board**
- Gestion des tâches de l'équipe
- Assignation aux membres (Aloys, Yanis, Constant, Hugues, Nathan)
- Statuts : En attente, En cours, Terminé, Bloqué
- Dates d'échéance
- Description détaillée

#### 5. **Gestion Sponsors**
- Base de données des partenaires
- Informations : nom, description, catégorie
- Upload de logo et image
- URL du site web
- Ordre d'affichage

#### 6. **Gestion Documentation**
- Éditeur de sections documentaires
- Types de contenu multiples :
  - Texte simple
  - Texte enrichi (markdown)
  - Accordéons
  - Tableaux
  - Callouts (Info/Warning/Success)
  - Checklists
- Organisation par ordre
- Publication/dépublication

#### 7. **Calculatrice Physique**
- 6 modules de calcul intégrés
- Calculs en temps réel
- Formules physiques pré-configurées
- Interface interactive

### Fonctionnalités Transversales

#### Sauvegarde Automatique (Autosave)
- Enregistrement automatique toutes les 15 secondes
- Évite la perte de données
- Récupération des brouillons
- Applicable à : Roadmap, Documentation, Tasks, Sponsors

#### Authentification
- Connexion sécurisée via Supabase Auth
- Gestion des sessions
- Protection des routes admin
- Logout

#### Export PDF
- Export de la documentation complète
- Mise en page professionnelle
- Génération côté client

#### Chatbot Gaia AI
- Assistant virtuel intelligent
- Répond aux questions sur le projet
- Utilise l'API Groq (DeepSeek R1 Distill Llama 70B)
- Streaming en temps réel
- Accès à la documentation et roadmap
- Interface de chat moderne
- Support markdown dans les réponses

---

## 🛠️ Architecture Technique

### Stack Technologique

#### Frontend
- **Framework** : React 18
- **Language** : TypeScript
- **Build Tool** : Vite 5
- **Styling** : Tailwind CSS
- **UI Components** : shadcn/ui (Radix UI)
- **Routing** : React Router DOM
- **State Management** : React Query (@tanstack/react-query)
- **Forms** : React Hook Form + Zod validation
- **Icons** : Lucide React

#### Backend & Base de Données
- **BaaS** : Supabase
- **Database** : PostgreSQL
- **Storage** : Supabase S3 (AWS eu-west-3)
- **Auth** : Supabase Auth
- **Real-time** : Supabase Channels
- **Edge Functions** : Supabase Functions (pour Gaia AI)

#### Bibliothèques Spécialisées
- **Markdown** : React-markdown, remark-gfm
- **Math Rendering** : KaTeX
- **PDF Export** : jsPDF + jsPDF-autotable
- **Charts** : Recharts
- **Sanitization** : DOMPurify
- **Rich Text Editor** : TipTap / Custom implementation

#### Mobile
- **Framework** : Capacitor 6
- **Platform** : Android SDK
- **Support** : Android 6.0+ (API 23)
- **Target** : Android 15 (API 35)

### Base de Données - Schéma

#### Table `roadmap_entries`
Stocke les étapes de la roadmap du projet.

| Champ | Type | Description |
|-------|------|-------------|
| `id` | UUID | Identifiant unique |
| `title` | TEXT | Titre de l'étape |
| `description` | TEXT | Description courte |
| `content` | TEXT | Contenu détaillé (markdown) |
| `timeline` | TEXT | Échéancier |
| `attached_files` | TEXT[] | Liste des fichiers |
| `status` | TEXT | completed \| in-progress \| planned |
| `is_published` | BOOLEAN | Visible sur le site public |
| `display_order` | INTEGER | Ordre d'affichage |
| `created_at` | TIMESTAMPTZ | Date de création |
| `updated_at` | TIMESTAMPTZ | Dernière modification |

#### Table `documentation_sections`
Contient les sections de la documentation.

| Champ | Type | Description |
|-------|------|-------------|
| `id` | UUID | Identifiant unique |
| `section_id` | TEXT | ID de section |
| `title` | TEXT | Titre de la section |
| `content` | TEXT | Contenu principal |
| `type` | TEXT | text \| rich \| accordion \| table \| callout \| checklist |
| `data` | JSONB | Données structurées additionnelles |
| `order_index` | INTEGER | Ordre d'affichage |
| `is_published` | BOOLEAN | Visible sur le site public |
| `created_at` | TIMESTAMPTZ | Date de création |
| `updated_at` | TIMESTAMPTZ | Dernière modification |

#### Table `tasks`
Gestion des tâches de l'équipe.

| Champ | Type | Description |
|-------|------|-------------|
| `id` | UUID | Identifiant unique |
| `title` | TEXT | Titre de la tâche |
| `description` | TEXT | Description détaillée |
| `assignee` | TEXT | Membre assigné (Aloys, Yanis, Constant, Hugues, Nathan) |
| `status` | TEXT | en-attente \| en-cours \| termine \| bloque |
| `deadline` | TEXT | Date d'échéance |
| `created_at` | TIMESTAMPTZ | Date de création |
| `updated_at` | TIMESTAMPTZ | Dernière modification |

#### Table `sponsors`
Base de données des sponsors et partenaires.

| Champ | Type | Description |
|-------|------|-------------|
| `id` | UUID | Identifiant unique |
| `name` | TEXT | Nom du sponsor |
| `description` | TEXT | Description |
| `logo_url` | TEXT | URL du logo |
| `image_url` | TEXT | URL de l'image/bannière |
| `website_url` | TEXT | Site web |
| `category` | TEXT | Catégorie du sponsor |
| `display_order` | INTEGER | Ordre d'affichage |
| `created_at` | TIMESTAMPTZ | Date de création |
| `updated_at` | TIMESTAMPTZ | Dernière modification |

#### Table `project_likes`
Compteur de likes pour le projet.

| Champ | Type | Description |
|-------|------|-------------|
| `id` | UUID | Identifiant unique |
| `total_likes` | INTEGER | Nombre total de likes |
| `created_at` | TIMESTAMPTZ | Date de création |
| `updated_at` | TIMESTAMPTZ | Dernière modification |

#### Table `autosaves`
Sauvegardes automatiques des brouillons.

| Champ | Type | Description |
|-------|------|-------------|
| `id` | UUID | Identifiant unique |
| `entity_type` | TEXT | roadmap \| documentation \| task \| sponsor |
| `entity_id` | TEXT | ID de l'entité éditée (null pour nouveau) |
| `content` | TEXT | Contenu du brouillon |
| `user_id` | UUID | Utilisateur propriétaire |
| `created_at` | TIMESTAMPTZ | Date de création |
| `updated_at` | TIMESTAMPTZ | Dernière modification |

### Sécurité

- **Row Level Security (RLS)** activé sur toutes les tables
- **Authentification** requise pour l'administration
- **Sanitization** HTML avec DOMPurify
- **Validation** des entrées utilisateur avec Zod
- **HTTPS** obligatoire en production
- **Secrets** stockés dans Supabase (ex: GROQ_API_KEY)

---

## 📱 Application Mobile Android

### Caractéristiques

- **Technologie** : Capacitor 6
- **Support** : Android 6.0+ (API 23)
- **Target** : Android 15 (API 35)
- **Taille APK** : ~17 MB
- **Icône** : Générée depuis `/public/favicon.ico`

### Build Android

#### Configuration Rapide (GitHub Codespace)

```bash
# 1. Configuration automatique de l'environnement
npm run android:env

# 2. Construction de l'APK
npm run android:build
```

L'APK sera disponible dans : `android/app/build/outputs/apk/debug/app-debug.apk`

#### Commandes Disponibles

| Commande | Description |
|----------|-------------|
| `npm run android:env` | Configure l'environnement (Java 21, etc.) |
| `npm run android:build` | Construit l'APK Android |
| `npm run android:sync` | Synchronise le code web avec Android |
| `npm run android:setup` | Génère un keystore pour signer l'APK |
| `npm run android:open` | Ouvre le projet dans Android Studio |

### Documentation

Pour plus de détails : [ANDROID_BUILD_GUIDE.md](./ANDROID_BUILD_GUIDE.md)

---

## 🤖 Gaia AI - Chatbot Intelligent

### Présentation

**Gaia AI** est un assistant virtuel intelligent intégré au site web. Il utilise l'API Groq avec le modèle **DeepSeek R1 Distill Llama 70B** pour répondre aux questions sur le projet.

### Fonctionnalités

- 💬 **Interface de chat moderne** et intuitive
- ⚡ **Streaming en temps réel** des réponses
- 📚 **Accès complet** à la documentation et roadmap
- 🇫🇷 Réponses en **français**
- 🔒 **Sécurisé** via Supabase Edge Functions
- 🎨 Support du **markdown** dans les réponses

### Architecture

```
Utilisateur → Frontend (React)
     ↓
Edge Function (Supabase)
     ↓
Charge contexte (Doc + Roadmap)
     ↓
API Groq (Streaming)
     ↓
Réponse progressive au frontend
```

### Configuration

1. **Clé API Groq** : Obtenir sur [Groq Console](https://console.groq.com/)
2. **Déploiement** : Edge Function dans Supabase
3. **Secret** : `GROQ_API_KEY` configuré dans Supabase

Voir [GAIA_AI_SETUP.md](./GAIA_AI_SETUP.md) pour la configuration complète.

---

## 🎨 Design et Interface

### Identité Visuelle

- **Couleurs** : Dégradés verts/bleus (nature, technologie)
- **Typographie** : Police système avec variantes Display
- **Style** : Moderne, cinématique, épuré
- **Thème** : Clair (avec préparation pour mode sombre)

### Composants UI

- **shadcn/ui** : Composants accessibles et personnalisables
- **Radix UI** : Primitives UI headless
- **Tailwind CSS** : Utility-first CSS
- **Animations** : Transitions fluides, effets glassmorphism
- **Responsive** : Mobile-first, adaptatif

### Expérience Utilisateur

- Navigation intuitive
- Temps de chargement optimisés
- Feedback visuel (toasts, loaders)
- Accessibilité (ARIA labels, contraste)
- Interactions fluides

---

## 📂 Structure du Projet

```
projet-gaia/
├── src/
│   ├── components/          # Composants React réutilisables
│   │   ├── ui/             # Composants shadcn/ui
│   │   ├── Header.tsx      # En-tête navigation
│   │   ├── Footer.tsx      # Pied de page
│   │   ├── HeroSection.tsx # Section héro page d'accueil
│   │   ├── ProjectSection.tsx
│   │   ├── SolutionSection.tsx
│   │   ├── RoadmapSection.tsx
│   │   ├── SponsorsSection.tsx
│   │   ├── TeamSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── LikeSection.tsx
│   │   ├── FloatingChatbot.tsx # Gaia AI
│   │   ├── RoadmapManager.tsx
│   │   ├── DocumentationManager.tsx
│   │   ├── TaskBoard.tsx
│   │   ├── SponsorsManager.tsx
│   │   ├── S3Dashboard.tsx
│   │   ├── PhysicsCalculator.tsx
│   │   ├── CalculsSection.tsx
│   │   └── ...
│   ├── pages/              # Pages de l'application
│   │   ├── Index.tsx       # Page d'accueil
│   │   ├── Documentation.tsx
│   │   ├── Roadmap.tsx
│   │   ├── Partenaires.tsx
│   │   ├── Presentation.tsx
│   │   ├── GalleryResources.tsx
│   │   ├── Admin.tsx
│   │   └── NotFound.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAutosave.ts
│   │   ├── useDocumentation.ts
│   │   └── ...
│   ├── lib/                # Services et utilitaires
│   │   ├── supabase.ts     # Client Supabase
│   │   ├── supabase-roadmap.ts
│   │   ├── supabase-documentation.ts
│   │   ├── supabase-sponsors.ts
│   │   ├── supabase-tasks.ts
│   │   ├── supabase-likes.ts
│   │   ├── supabase-autosave.ts
│   │   ├── s3.ts           # Gestion fichiers S3
│   │   ├── groq-client.ts  # Client API Groq
│   │   ├── gaia-context.ts # Contexte Gaia AI
│   │   └── utils.ts
│   ├── utils/              # Fonctions utilitaires
│   │   └── pdfExport.ts
│   ├── App.tsx             # Composant racine
│   ├── main.tsx            # Point d'entrée
│   └── index.css           # Styles globaux
├── supabase/
│   ├── migrations/         # Migrations base de données
│   │   ├── create_autosaves_table.sql
│   │   └── add_display_order_to_roadmap.sql
│   └── functions/          # Edge Functions
│       └── gaia-chat/      # Fonction Gaia AI
├── android/                # Projet Android (Capacitor)
├── public/                 # Assets statiques
│   ├── gallery/            # Images galerie
│   ├── files/              # Fichiers téléchargeables
│   └── favicon.ico
├── .env                    # Variables d'environnement
├── .env.example            # Template variables
├── package.json            # Dépendances npm
├── vite.config.ts          # Configuration Vite
├── tailwind.config.ts      # Configuration Tailwind
├── tsconfig.json           # Configuration TypeScript
├── capacitor.config.ts     # Configuration Capacitor
└── README.md               # Documentation générale
```

---

## 🚀 Développement

### Prérequis

- **Node.js** 18+ et npm
- **Git**
- **Java 21** (pour builds Android)

### Installation

```bash
# Cloner le repository
git clone https://github.com/dayanisek457/projet-gaia.git
cd projet-gaia

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos valeurs
```

### Variables d'Environnement

```env
# Supabase
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_publique

# AWS S3 (optionnel, pour upload fichiers)
VITE_AWS_ACCESS_KEY_ID=votre_access_key
VITE_AWS_SECRET_ACCESS_KEY=votre_secret_key
VITE_AWS_REGION=eu-west-3
VITE_AWS_BUCKET_NAME=nom_du_bucket
```

### Scripts de Développement

#### Application Web

```bash
# Démarrer le serveur de développement
npm run dev
# → http://localhost:8080

# Build de production
npm run build

# Build de développement
npm run build:dev

# Vérification du code
npm run lint

# Prévisualisation du build
npm run preview
```

#### Application Android

```bash
# Setup environnement
npm run android:env

# Build APK
npm run android:build

# Synchronisation
npm run android:sync

# Générer keystore
npm run android:setup

# Ouvrir dans Android Studio
npm run android:open
```

---

## 📊 Fonctionnalités Avancées

### 1. Système de Likes

- Compteur de soutien communautaire
- Mise à jour en temps réel (Supabase Realtime)
- Limite 1 like par utilisateur (localStorage)
- Animation et feedback visuel

### 2. Gestion des Fichiers (S3)

- Upload vers Supabase Storage
- Support multi-fichiers
- Prévisualisation
- Suppression
- Mode Démo (simulation sans upload réel)

### 3. Éditeur Riche (Rich Text)

- Formatage markdown
- Support LaTeX (formules mathématiques)
- Intégration vidéos (YouTube, Vimeo)
- Images
- Tableaux
- Callouts (Info/Warning/Success)
- Accordéons
- Listes à puces et numérotées
- Code blocks
- Sanitization HTML

### 4. Export PDF

- Génération côté client
- Mise en page professionnelle
- Inclusion de tous les contenus
- Téléchargement direct

### 5. Autosave

- Sauvegarde automatique toutes les 15 secondes
- Stockage dans table dédiée
- Récupération au retour
- Suppression après publication
- Nettoyage des anciennes sauvegardes (>7 jours)

### 6. Real-time Updates

- Abonnements Supabase Channels
- Mise à jour automatique des données
- Synchronisation multi-utilisateurs
- Notifications de changements

---

## 🔐 Sécurité et Bonnes Pratiques

### Mesures de Sécurité

1. **Authentification** : Supabase Auth avec gestion de session
2. **RLS (Row Level Security)** : Politiques d'accès au niveau des lignes
3. **Sanitization** : DOMPurify pour nettoyer le HTML
4. **Validation** : Zod pour valider les entrées utilisateur
5. **HTTPS** : Obligatoire en production
6. **Secrets** : Variables d'environnement et Supabase Secrets
7. **CORS** : Configuration stricte des origines autorisées

### Bonnes Pratiques

- Code TypeScript strict
- Gestion d'erreurs complète
- Logs structurés
- Tests manuels systématiques
- Documentation inline
- Commentaires en français
- Conventions de nommage cohérentes

---

## 📚 Documentation Complémentaire

Le projet inclut plusieurs documents détaillés :

| Document | Description |
|----------|-------------|
| [README.md](./README.md) | Vue d'ensemble et démarrage rapide |
| [ANDROID_BUILD_GUIDE.md](./ANDROID_BUILD_GUIDE.md) | Guide complet du build Android |
| [AUTOSAVE_DOCUMENTATION.md](./AUTOSAVE_DOCUMENTATION.md) | Fonctionnalité de sauvegarde automatique |
| [GALLERY_SETUP.md](./GALLERY_SETUP.md) | Configuration de la galerie |
| [SPONSORS_SETUP.md](./SPONSORS_SETUP.md) | Gestion des sponsors |
| [ROADMAP_ORDERING_GUIDE.md](./ROADMAP_ORDERING_GUIDE.md) | Ordre de la roadmap |
| [GAIA_AI_SETUP.md](./GAIA_AI_SETUP.md) | Configuration du chatbot Gaia AI |
| [VISUAL_GUIDE.md](./VISUAL_GUIDE.md) | Guide visuel du projet |
| [TESTING_GUIDE.md](./TESTING_GUIDE.md) | Guide de tests manuels |
| [PHYSICS_CALCULATOR_GUIDE.md](./PHYSICS_CALCULATOR_GUIDE.md) | Calculatrice physique |

---

## 🌐 Déploiement

### Hébergement Web

Le site est hébergé sur **Vercel** avec déploiement automatique depuis GitHub.

#### Configuration Vercel

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

### Base de Données

**Supabase** héberge :
- Base de données PostgreSQL
- Storage S3 (fichiers)
- Authentification
- Edge Functions

---

## 📞 Contact et Support

### Contacter l'Équipe

Pour toute question ou collaboration :

- **Email** : Via formulaires de contact sur le site
- **Réseaux sociaux** : Instagram (@skyx_intl via partenaire SkyX International)
- **GitHub** : [dayanisek457/projet-gaia](https://github.com/dayanisek457/projet-gaia)

### Devenir Partenaire

Intéressé par le Pack Sponsor ou un partenariat ?
→ Utilisez le formulaire de contact sur [/partenaires](/partenaires)

---

## 📝 Licence

Voir le fichier [LICENSE](./LICENSE) pour les détails.

---

## 🎯 Conclusion

**Projet Gaia** représente une initiative étudiante ambitieuse combinant **innovation technologique** et **engagement environnemental**. En développant un drone électrique autonome pour la reforestation, l'équipe du Lycée Saint-Joseph Dijon démontre qu'il est possible d'allier **performance technique**, **respect de l'environnement** et **accessibilité économique**.

### Impacts Attendus

- **Environnemental** : Accélération de la reforestation mondiale
- **Technologique** : Innovation en aéronautique électrique
- **Éducatif** : Formation pratique en ingénierie
- **Social** : Sensibilisation à l'urgence climatique
- **Économique** : Solution abordable et scalable

### Vision à Long Terme

Gaia s'inscrit dans une vision d'avenir où :
- La technologie sert la protection de l'environnement
- Les solutions sont accessibles et durables
- L'innovation est au service du bien commun
- Les jeunes générations agissent concrètement

---

**Suivez notre aventure et soutenez le projet Gaia !** 🌱✈️

---

*Document généré le 27 janvier 2026*
*Projet Gaia - Lycée Saint-Joseph Dijon - Terminale SI (2025-2026)*