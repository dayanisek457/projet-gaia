# 🚀 Quick Start - Build Android APK

Guide ultra-rapide pour construire l'APK Android Gaia sur GitHub Codespace.

## En 2 Commandes 🎯

```bash
# 1. Configuration de l'environnement (une seule fois)
npm run android:env

# 2. Construction de l'APK
npm run android:build
```

**C'est tout!** 🎉

L'APK sera disponible dans: `android/app/build/outputs/apk/debug/app-debug.apk`

## Installation sur Téléphone

1. Téléchargez l'APK depuis le dossier ci-dessus
2. Transférez-le sur votre téléphone Android
3. Ouvrez l'APK sur votre téléphone
4. Autorisez l'installation depuis des sources inconnues si demandé
5. Installez l'application

## Pour un APK Signé (Production)

Si vous voulez créer un APK signé pour la distribution:

```bash
# 1. Générer un keystore (une seule fois)
npm run android:setup

# 2. Construire l'APK signé
npm run android:build
```

## Besoin d'Aide?

Consultez le guide complet: [ANDROID_BUILD_GUIDE.md](./ANDROID_BUILD_GUIDE.md)

## Commandes Utiles

- `npm run android:build` - Construire l'APK
- `npm run android:sync` - Synchroniser après des modifications
- `npm run android:open` - Ouvrir dans Android Studio
- `npm run android:setup` - Générer un keystore de signature

## Prérequis

- GitHub Codespace (tout est configuré automatiquement avec `npm run android:env`)
- OU localement: Node.js + Java 21

---

**Note**: Le build prend environ 30-60 secondes la première fois, puis 5-10 secondes les fois suivantes.
