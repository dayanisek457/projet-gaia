# Visual Guide to New Presentation Slides

This document provides a text-based preview of the four new slides added to the presentation.

## 🎯 Slide 4: Clarification Stratégique (Strategic Vision)

```
┌─────────────────────────────────────────────────────────────┐
│                   🎯 Notre Vision Stratégique                │
│           Un produit fini pour démontrer le concept          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Notre Approche:                                       │  │
│  │  Petit avion radiocommandé = produit fini +           │  │
│  │  démonstration de concept                             │  │
│  │  → Validation à petite échelle avant déploiement      │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │  1️⃣  PHASE ACTUELLE  │  │  2️⃣  VISION FUTURE   │          │
│  │  ✓ Petit avion RC   │  │  ✨ Gros avions      │          │
│  │  ✓ Tests réels      │  │  ✨ Industrialisat° │          │
│  │  ✓ Démonstration    │  │  ✨ Déploiement     │          │
│  └─────────────────────┘  └─────────────────────┘          │
│                                                              │
│  💡 Commencer petit → Prouver le concept → Passer à l'échelle│
└─────────────────────────────────────────────────────────────┘
```

## ✈️ Slide 5: Avion RC vs Drone (Technology Comparison)

```
┌─────────────────────────────────────────────────────────────┐
│          ✈️  Pourquoi un Avion RC plutôt qu'un Drone ?      │
│        Un choix stratégique basé sur coût et simplicité     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │  ✈️  AVION RC ✅      │  │  🚁 DRONE ⚠️          │        │
│  ├──────────────────────┤  ├──────────────────────┤        │
│  │  ✓ Coût: 300-800€    │  │  ✗ Coût: 1500-5000€+ │        │
│  │  ✓ Simple (moins     │  │  ✗ Complexe (4+      │        │
│  │    de moteurs)       │  │    moteurs)          │        │
│  │  ✓ Autonomie élevée  │  │  ✗ Autonomie 15-30min│        │
│  │    (vol plané)       │  │    (énergivore)      │        │
│  │  ✓ Maintenance       │  │  ✗ Maintenance       │        │
│  │    simple            │  │    complexe          │        │
│  │  ✓ Vitesse/portée    │  │  ⚠️  Sensible au vent │        │
│  └──────────────────────┘  └──────────────────────┘        │
│                                                              │
│  ✅ DÉCISION: L'avion RC offre le meilleur rapport          │
│     coût/efficacité pour la reforestation à grande échelle  │
└─────────────────────────────────────────────────────────────┘
```

## ⚙️ Slide 6: Tutoriel Palonniers (Rudder Controls)

```
┌─────────────────────────────────────────────────────────────┐
│            ⚙️  Fonctionnement des Palonniers                │
│         Les commandes de vol qui contrôlent l'avion         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Les palonniers transforment le mouvement linéaire des      │
│  servos en mouvement rotatif des surfaces de contrôle       │
│                                                              │
│  ┌──────────┐      ┌──────────┐      ┌──────────┐          │
│  │    1     │  →   │    2     │  →   │    3     │          │
│  │  📡 Signal│      │ ⚙️  Servo │      │ ✈️  Surface│          │
│  │   Radio  │      │  Moteur  │      │  Contrôle│          │
│  └──────────┘      └──────────┘      └──────────┘          │
│                                                              │
│  Les 3 Axes de Contrôle:                                    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ ROULIS       │ │ TANGAGE      │ │ LACET        │        │
│  │ (Roll)       │ │ (Pitch)      │ │ (Yaw)        │        │
│  │ Ailerons     │ │ Gouverne de  │ │ Gouverne de  │        │
│  │ → Inclinaison│ │ profondeur   │ │ direction    │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                              │
│  💡 Chaque surface a son propre palonnier pour un contrôle  │
│     précis et indépendant des 3 axes de vol                 │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Slide 7: Architecture Technique 3D (Technical Diagrams)

```
┌─────────────────────────────────────────────────────────────┐
│            📦 Architecture Technique 3D                     │
│         Carte d'histoire : de la conception au vol          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         [IMAGE 3D: type_aile2.png]                     │ │
│  │                                                        │ │
│  │    Composants annotés:                                │ │
│  │    1️⃣  Aile principale - Portance optimale           │ │
│  │    2️⃣  Fuselage - Structure centrale                 │ │
│  │    3️⃣  Soute à graines - Largage automatisé          │ │
│  │    4️⃣  Empennage - Stabilisateurs et gouvernes       │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  🗺️  Parcours du Vol de Plantation:                        │
│  ┌──────┐     ┌──────────┐     ┌────────┐     ┌────────┐  │
│  │  1   │  →  │    2     │  →  │   3    │  ←  │   4    │  │
│  │Décol-│     │Navigation│     │Largage │     │ Retour │  │
│  │lage  │     │GPS auto  │     │Zone    │     │ Base   │  │
│  └──────┘     └──────────┘     └────────┘     └────────┘  │
│                                                              │
│  Composants Clés:                                           │
│  ⚡ Batterie LiPo 2200-5000mAh  | 🌬️  Moteur 800-1000W   │
│  ⚙️  5 Servos contrôles vol     | 🌱 Soute 2-5kg (500+ seeds)│
└─────────────────────────────────────────────────────────────┘
```

## Navigation Flow

The complete presentation now flows as follows:

```
1. Cover/Hero                    → Introduction to Gaia
2. Problématique                 → Environmental challenges
3. Notre Solution                → Overview of Gaia
4. 🆕 Clarification Stratégique  → Product vision & strategy
5. 🆕 Avion RC vs Drone          → Technology justification
6. 🆕 Tutoriel Palonniers        → Control systems explained
7. 🆕 Architecture 3D            → Technical diagrams & workflow
8. Roadmap                       → Development timeline
9. Notre Équipe                  → Team introduction
10. Partenaires                  → Sponsors & partnerships
11. Documentation                → Technical resources
12. Contact & Conclusion         → Call to action
```

## Design Principles Applied

### Color Coding
- 🟢 **Green**: Advantages, benefits, positive features
- 🟠 **Orange**: Limitations, warnings, challenges
- 🔵 **Blue**: Processes, technical information
- 🟣 **Purple**: Innovation, future vision

### Visual Hierarchy
- Large titles (text-5xl) for slide headers
- Medium text (text-2xl) for subtitles
- Standard text (text-lg) for body content
- Small text (text-sm) for details and notes

### Icons Usage
- ✈️ Plane: Aircraft/aviation related
- ⚙️ Settings: Technical/mechanical
- 🎯 Target: Goals/strategy
- 📦 Package: Components/systems
- ➡️ Arrow: Process flow
- ✅ Check: Advantages/completed
- ❌ X: Disadvantages/limitations

## Interactive Features

### Keyboard Navigation
- **Arrow Right / Space**: Next slide
- **Arrow Left**: Previous slide
- **Escape**: Exit presentation mode
- **Click dots**: Jump to specific slide

### Visual Feedback
- Progress dots at bottom show current position
- Slide counter displays "X / 12"
- Smooth carousel transitions
- Hover effects on interactive elements

## Responsive Design

All slides are responsive and work on:
- 📱 Mobile devices (320px+)
- 💻 Tablets (768px+)
- 🖥️ Desktops (1024px+)
- 📺 Large screens (1920px+)

Content automatically adjusts:
- Grid layouts stack on mobile
- Font sizes scale appropriately
- Images resize proportionally
- Spacing adapts to screen size

## Accessibility Features

- ✅ High contrast text (white on dark, dark on white)
- ✅ Large, readable fonts
- ✅ Descriptive icons with labels
- ✅ Clear visual hierarchy
- ✅ Keyboard navigation support
- ✅ Semantic HTML structure

---

**Created:** January 10, 2026
**Format:** Text-based visual guide
**Purpose:** Quick reference for presentation structure
