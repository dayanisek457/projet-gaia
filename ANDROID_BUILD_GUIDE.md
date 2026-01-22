# 📱 Guide de Build APK Android pour Gaia

Ce guide explique comment construire l'application Android Gaia depuis le projet web React.

## 🚀 Démarrage Rapide

### Prérequis

1. **Node.js et npm** (déjà installés si vous avez cloné le projet)
2. **Java JDK 21** (pour compiler l'APK Android)

### Installation Rapide sur GitHub Codespace

```bash
# 1. Installer Java JDK 21
sudo apt-get update
sudo apt-get install -y openjdk-21-jdk

# 2. Configurer Java 21
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# 3. Vérifier l'installation
java -version

# 4. Installer les dépendances npm (si pas déjà fait)
npm install
```

## 📦 Construction de l'APK

### Méthode Simple (Recommandée)

Utilisez le script automatisé qui fait tout pour vous:

```bash
npm run android:build
```

Ce script va:
1. ✅ Construire l'application web (build Vite)
2. ✅ Synchroniser avec Capacitor
3. ✅ Vérifier la configuration de signature
4. ✅ Construire l'APK Android

L'APK sera créé dans:
- **Release (signé)**: `android/app/build/outputs/apk/release/app-release.apk`
- **Debug (non signé)**: `android/app/build/outputs/apk/debug/app-debug.apk`

### Méthode Manuelle

Si vous préférez exécuter les étapes une par une:

```bash
# 1. Build de l'application web
npm run build

# 2. Synchroniser avec Capacitor
npx cap sync android

# 3. Construire l'APK
cd android
./gradlew assembleRelease  # Pour un APK signé
# OU
./gradlew assembleDebug     # Pour un APK de test non signé
cd ..
```

## 🔑 Configuration de la Signature (APK Release)

Pour créer un APK signé prêt pour la distribution:

### Étape 1: Générer un Keystore

```bash
npm run android:setup
```

Ou manuellement:
```bash
./scripts/generate-keystore.sh
```

Vous devrez entrer un mot de passe. **Gardez ce mot de passe en sécurité!**

### Étape 2: Configurer les Propriétés

Créez le fichier `android/keystore.properties`:

```properties
storeFile=keystore/gaia-release.keystore
storePassword=VOTRE_MOT_DE_PASSE
keyAlias=gaia
keyPassword=VOTRE_MOT_DE_PASSE
```

**⚠️ IMPORTANT**: Ne commitez JAMAIS ce fichier dans Git! Il est déjà dans `.gitignore`.

### Alternative: Variables d'Environnement

Pour GitHub Codespace ou CI/CD, utilisez des variables d'environnement:

```bash
export ANDROID_KEYSTORE_PASSWORD="votre_mot_de_passe"
npm run android:build
```

## 🛠️ Commandes Disponibles

| Commande | Description |
|----------|-------------|
| `npm run android:build` | Construit l'APK (méthode simple) |
| `npm run android:sync` | Synchronise le code web avec Android |
| `npm run android:open` | Ouvre le projet dans Android Studio |
| `npm run android:setup` | Génère un keystore pour la signature |

## 📋 Spécifications Techniques

- **ID de l'application**: `com.saintjoseph.gaia`
- **Nom de l'app**: Gaia
- **Support Android**: Android 6.0 (API 23) et supérieur
- **Target Android**: Android 15 (API 35)
- **Icône**: Générée depuis `/public/favicon.ico`
- **Framework**: Capacitor 6.x

## 🔍 Dépannage

### Erreur: `JAVA_HOME` non défini ou mauvaise version de Java

Le projet requiert Java 21. Configurez-le ainsi:

```bash
# Installer Java 21 si nécessaire
sudo apt-get install -y openjdk-21-jdk

# Configurer Java 21
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# Vérifier la version
java -version  # Devrait afficher "21.0.x"
```

### Erreur: Permission denied sur les scripts

```bash
chmod +x scripts/*.sh
```

### Erreur: Keystore non trouvé

Si vous voulez un APK signé, vous devez d'abord générer un keystore:
```bash
npm run android:setup
```

Si vous voulez juste tester, utilisez le build debug:
```bash
cd android
./gradlew assembleDebug
```

### L'APK ne s'installe pas sur mon téléphone

1. Activez "Sources inconnues" dans les paramètres Android
2. Pour Android 8+: Autorisez l'installation depuis l'application que vous utilisez pour installer l'APK

## 📱 Installation sur un Appareil

1. **Téléchargez l'APK** depuis le dossier `android/app/build/outputs/apk/`
2. **Transférez-le** sur votre appareil Android (USB, email, cloud, etc.)
3. **Ouvrez l'APK** sur votre téléphone
4. **Autorisez** l'installation depuis des sources inconnues si demandé
5. **Installez** l'application

## 🔄 Mise à Jour de l'Application

Pour mettre à jour l'application après des modifications:

```bash
npm run android:build
```

Puis réinstallez l'APK sur votre appareil.

**Note**: Pour une mise à jour via le Google Play Store, vous devrez:
1. Incrémenter `versionCode` dans `android/app/build.gradle`
2. Mettre à jour `versionName` si nécessaire
3. Signer l'APK avec le même keystore

## 📚 Ressources

- [Documentation Capacitor](https://capacitorjs.com/docs)
- [Guide Android Studio](https://developer.android.com/studio)
- [Distribution Android Apps](https://developer.android.com/studio/publish)

## 🆘 Support

Si vous rencontrez des problèmes:
1. Vérifiez que Java JDK 17 est installé: `java -version`
2. Vérifiez que les dépendances sont installées: `npm install`
3. Essayez de nettoyer et reconstruire: `cd android && ./gradlew clean && cd ..`
4. Consultez les logs dans `android/app/build/outputs/logs/`

---

**Bon build! 🚀**
