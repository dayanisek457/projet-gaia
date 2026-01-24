# Projet Gaia - Lycée Saint Joseph Dijon

Application web de reforestation intelligente avec support Android.

## 🌐 Application Web

Application web React + TypeScript + Vite avec interface d'administration complète.

### Démarrage rapide

```bash
npm install
npm run dev
```

L'application sera disponible sur http://localhost:8080

## 📱 Application Android

Le projet peut être construit en APK Android pour une distribution mobile.

### 🚀 Build Android - Démarrage Rapide

#### Sur GitHub Codespace

```bash
# 1. Configuration automatique de l'environnement
npm run android:env

# 2. Construction de l'APK
npm run android:build
```

L'APK sera disponible dans: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Commandes Android Disponibles

| Commande | Description |
|----------|-------------|
| `npm run android:env` | Configure l'environnement (Java 21, etc.) |
| `npm run android:build` | Construit l'APK Android |
| `npm run android:sync` | Synchronise le code web avec Android |
| `npm run android:setup` | Génère un keystore pour signer l'APK |
| `npm run android:open` | Ouvre le projet dans Android Studio |

### 📋 Spécifications Android

- **Support**: Android 6.0+ (API 23)
- **Target**: Android 15 (API 35)
- **Taille APK**: ~17 MB
- **Icône**: Générée depuis `/public/favicon.ico`

### 📚 Documentation Complète

Pour plus de détails sur le build Android, consultez [ANDROID_BUILD_GUIDE.md](./ANDROID_BUILD_GUIDE.md)

## 🛠️ Scripts de Développement

### Application Web

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Build de production
- `npm run build:dev` - Build de développement
- `npm run lint` - Vérification du code
- `npm run preview` - Prévisualisation du build

### Android

- `npm run android:env` - Setup de l'environnement
- `npm run android:build` - Build de l'APK
- `npm run android:sync` - Synchronisation
- `npm run android:setup` - Génération du keystore
- `npm run android:open` - Ouvrir dans Android Studio

## 📦 Technologies

### Frontend
- React 18
- TypeScript
- Vite 5
- Tailwind CSS
- shadcn/ui

### Backend
- Supabase
- PostgreSQL
- Row Level Security

### Mobile
- Capacitor 6
- Android SDK

## 🔒 Configuration

1. Copiez `.env.example` vers `.env`
2. Configurez vos variables d'environnement
3. Pour le build Android, suivez [ANDROID_BUILD_GUIDE.md](./ANDROID_BUILD_GUIDE.md)

## 📖 Documentation

- [ANDROID_BUILD_GUIDE.md](./ANDROID_BUILD_GUIDE.md) - Guide complet du build Android
- [AUTOSAVE_DOCUMENTATION.md](./AUTOSAVE_DOCUMENTATION.md) - Fonctionnalité de sauvegarde automatique
- [GALLERY_SETUP.md](./GALLERY_SETUP.md) - Configuration de la galerie
- [SPONSORS_SETUP.md](./SPONSORS_SETUP.md) - Gestion des sponsors
- [ROADMAP_ORDERING_GUIDE.md](./ROADMAP_ORDERING_GUIDE.md) - Ordre de la roadmap
- [GAIA_AI_SETUP.md](./GAIA_AI_SETUP.md) - Configuration du chatbot Gaia AI

## 🤖 Gaia AI Chatbot

Le projet inclut **Gaia AI**, un chatbot intelligent qui répond aux questions sur le projet en utilisant l'API Groq avec streaming en temps réel.

### Fonctionnalités
- 💬 Interface de chat moderne et intuitive
- ⚡ Streaming en temps réel des réponses
- 📚 Accès à toute la documentation et la roadmap
- 🇫🇷 Réponses en français
- 🔒 Sécurisé via Supabase Edge Functions

### Accès
Le chatbot est accessible à `/gaia-ai` une fois l'application démarrée.

### Configuration
Consultez [GAIA_AI_SETUP.md](./GAIA_AI_SETUP.md) pour les instructions complètes de configuration.

## 🤝 Contribution

Ce projet utilise:
- Node.js et npm
- Java 21 (pour Android)
- Git

## 📄 Licence

Voir [LICENSE](./LICENSE)

