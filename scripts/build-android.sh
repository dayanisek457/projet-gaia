#!/bin/bash
# Script simplifié pour construire l'APK Android Gaia

set -e

echo "🚀 Construction de l'APK Android Gaia"
echo "======================================"
echo ""

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier si nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erreur: Ce script doit être exécuté depuis la racine du projet${NC}"
    exit 1
fi

# Vérifier Java 21
echo "🔍 Vérification de Java..."
if ! command -v java &> /dev/null; then
    echo -e "${RED}❌ Java n'est pas installé${NC}"
    echo "   Installez Java 21 avec: sudo apt-get install -y openjdk-21-jdk"
    exit 1
fi

# Extraction robuste de la version Java (supporte 21, 21.0.1, etc.)
JAVA_VERSION=$(java -version 2>&1 | head -n 1 | sed -n 's/.*version "\?\([0-9]*\).*/\1/p')
if [ "$JAVA_VERSION" != "21" ]; then
    echo -e "${YELLOW}⚠️  Java $JAVA_VERSION détecté, mais Java 21 est requis${NC}"
    
    # Essayer de trouver et configurer Java 21 (multi-architecture)
    JAVA_21_PATH=$(find /usr/lib/jvm -maxdepth 1 -name "java-21-openjdk*" 2>/dev/null | head -n 1)
    if [ -n "$JAVA_21_PATH" ] && [ -d "$JAVA_21_PATH" ]; then
        echo "   Configuration de Java 21 depuis $JAVA_21_PATH..."
        export JAVA_HOME="$JAVA_21_PATH"
        export PATH=$JAVA_HOME/bin:$PATH
        echo -e "${GREEN}✅ Java 21 configuré${NC}"
    else
        echo -e "${RED}❌ Java 21 n'est pas installé${NC}"
        echo "   Installez-le avec: sudo apt-get install -y openjdk-21-jdk"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Java 21 détecté${NC}"
fi
echo ""

# Étape 1: Build de l'application web
echo "📦 Étape 1/4: Construction de l'application web..."
if ! npm run build; then
    echo -e "${RED}❌ Erreur lors du build web${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build web terminé${NC}"
echo ""

# Étape 2: Synchronisation avec Capacitor
echo "🔄 Étape 2/4: Synchronisation avec Capacitor..."
if ! npx cap sync android; then
    echo -e "${RED}❌ Erreur lors de la synchronisation${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Synchronisation terminée${NC}"
echo ""

# Étape 3: Vérification du keystore
echo "🔑 Étape 3/4: Vérification de la configuration de signature..."
KEYSTORE_FILE="android/keystore/gaia-release.keystore"
KEYSTORE_PROPS="android/keystore.properties"

if [ ! -f "$KEYSTORE_FILE" ] && [ -z "$ANDROID_KEYSTORE_PASSWORD" ]; then
    echo -e "${YELLOW}⚠️  Aucun keystore trouvé. L'APK ne sera pas signé.${NC}"
    echo -e "${YELLOW}   Pour générer un keystore, exécutez: ./scripts/generate-keystore.sh${NC}"
    BUILD_TYPE="Debug"
    GRADLE_TASK="assembleDebug"
else
    echo -e "${GREEN}✅ Configuration de signature trouvée${NC}"
    BUILD_TYPE="Release"
    GRADLE_TASK="assembleRelease"
fi
echo ""

# Étape 4: Construction de l'APK
echo "🔨 Étape 4/4: Construction de l'APK Android ($BUILD_TYPE)..."
cd android
if ! ./gradlew clean $GRADLE_TASK; then
    echo -e "${RED}❌ Erreur lors de la construction de l'APK${NC}"
    exit 1
fi
cd ..
echo -e "${GREEN}✅ APK construit avec succès!${NC}"
echo ""

# Localiser l'APK
if [ "$BUILD_TYPE" == "Release" ]; then
    APK_PATH="android/app/build/outputs/apk/release/app-release.apk"
else
    APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
fi

# Afficher les informations
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ APK Android Gaia créé avec succès!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📍 Emplacement: $APK_PATH"
echo "📊 Type de build: $BUILD_TYPE"

if [ -f "$APK_PATH" ]; then
    APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
    echo "💾 Taille: $APK_SIZE"
fi

echo ""
echo "📱 Prochaines étapes:"
echo "   1. Téléchargez l'APK"
echo "   2. Transférez-le sur votre appareil Android"
echo "   3. Installez-le (vous devrez peut-être autoriser les installations depuis des sources inconnues)"
echo ""

if [ "$BUILD_TYPE" == "Debug" ]; then
    echo -e "${YELLOW}ℹ️  Note: Cet APK est en mode Debug (non signé)${NC}"
    echo -e "${YELLOW}   Pour un APK signé pour la production, générez d'abord un keystore.${NC}"
    echo ""
fi
