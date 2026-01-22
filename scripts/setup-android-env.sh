#!/bin/bash
# Script de configuration rapide pour GitHub Codespace
# Configure l'environnement pour builder l'APK Android

set -e

echo "🚀 Configuration de l'environnement Android pour GitHub Codespace"
echo "================================================================="
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Installation de Java 21
echo "📦 Étape 1/5: Installation de Java 21..."
if ! command -v java &> /dev/null || ! java -version 2>&1 | grep -q "21\."; then
    sudo apt-get update -qq
    sudo apt-get install -y openjdk-21-jdk
    echo -e "${GREEN}✅ Java 21 installé${NC}"
else
    echo -e "${GREEN}✅ Java 21 déjà installé${NC}"
fi

# 2. Configuration de JAVA_HOME
echo ""
echo "🔧 Étape 2/5: Configuration de JAVA_HOME..."

# Trouver le chemin Java 21 de manière portable (multi-architecture)
JAVA_21_PATH=$(find /usr/lib/jvm -maxdepth 1 -name "java-21-openjdk*" 2>/dev/null | head -n 1)

if [ -z "$JAVA_21_PATH" ]; then
    echo -e "${RED}❌ Impossible de trouver Java 21. Vérifiez l'installation.${NC}"
    exit 1
fi

export JAVA_HOME="$JAVA_21_PATH"
export PATH=$JAVA_HOME/bin:$PATH

# Ajouter au .bashrc pour persistance (avec recherche dynamique)
if ! grep -q "# Java 21 pour Android build" ~/.bashrc; then
    echo "" >> ~/.bashrc
    echo "# Java 21 pour Android build" >> ~/.bashrc
    echo "export JAVA_HOME=\"\$(find /usr/lib/jvm -maxdepth 1 -name 'java-21-openjdk*' 2>/dev/null | head -n 1)\"" >> ~/.bashrc
    echo "export PATH=\$JAVA_HOME/bin:\$PATH" >> ~/.bashrc
    echo -e "${GREEN}✅ JAVA_HOME configuré dans .bashrc${NC}"
else
    echo -e "${GREEN}✅ JAVA_HOME déjà configuré${NC}"
fi

# 3. Installation du Android SDK
echo ""
echo "📱 Étape 3/5: Installation du Android SDK..."

# Définir le répertoire du SDK Android
ANDROID_SDK_ROOT="$HOME/android-sdk"
export ANDROID_HOME="$ANDROID_SDK_ROOT"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"

if [ ! -d "$ANDROID_SDK_ROOT" ]; then
    echo "   Téléchargement des outils Android SDK..."
    mkdir -p "$ANDROID_SDK_ROOT/cmdline-tools"
    
    # Télécharger les command-line tools (version Linux)
    cd /tmp
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O cmdline-tools.zip
    
    # Extraire dans le bon dossier
    unzip -q cmdline-tools.zip
    mv cmdline-tools "$ANDROID_SDK_ROOT/cmdline-tools/latest"
    rm cmdline-tools.zip
    
    echo -e "${GREEN}✅ Android SDK command-line tools installés${NC}"
else
    echo -e "${GREEN}✅ Android SDK déjà installé${NC}"
fi

# 4. Installation des composants Android requis
echo ""
echo "📦 Étape 4/5: Installation des composants Android SDK..."

# Accepter les licences automatiquement
yes | "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" --licenses > /dev/null 2>&1 || true

# Installer les composants nécessaires
echo "   Installation de platform-tools, build-tools et platform SDK..."
"$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" \
    "platform-tools" \
    "platforms;android-35" \
    "build-tools;35.0.0" \
    > /dev/null 2>&1

echo -e "${GREEN}✅ Composants Android SDK installés${NC}"

# Ajouter au .bashrc pour persistance
if ! grep -q "# Android SDK pour build" ~/.bashrc; then
    echo "" >> ~/.bashrc
    echo "# Android SDK pour build" >> ~/.bashrc
    echo "export ANDROID_HOME=\"\$HOME/android-sdk\"" >> ~/.bashrc
    echo "export ANDROID_SDK_ROOT=\"\$ANDROID_HOME\"" >> ~/.bashrc
    echo "export PATH=\"\$ANDROID_HOME/cmdline-tools/latest/bin:\$ANDROID_HOME/platform-tools:\$PATH\"" >> ~/.bashrc
    echo -e "${GREEN}✅ ANDROID_HOME configuré dans .bashrc${NC}"
else
    echo -e "${GREEN}✅ ANDROID_HOME déjà configuré${NC}"
fi

# Créer le fichier local.properties
echo ""
echo "📝 Création du fichier local.properties..."
LOCAL_PROPS="android/local.properties"
if [ -f "$LOCAL_PROPS" ]; then
    # Mettre à jour si déjà existant
    if grep -q "sdk.dir" "$LOCAL_PROPS"; then
        sed -i "s|sdk.dir=.*|sdk.dir=$ANDROID_HOME|" "$LOCAL_PROPS"
    else
        echo "sdk.dir=$ANDROID_HOME" >> "$LOCAL_PROPS"
    fi
else
    echo "sdk.dir=$ANDROID_HOME" > "$LOCAL_PROPS"
fi
echo -e "${GREEN}✅ Fichier local.properties créé${NC}"

# 5. Installation des dépendances npm
echo ""
echo "📦 Étape 5/5: Installation des dépendances npm..."
if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✅ Dépendances installées${NC}"
else
    echo -e "${GREEN}✅ Dépendances déjà installées${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Configuration terminée avec succès!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Prochaines étapes:"
echo ""
echo "1. Pour construire l'APK:"
echo -e "   ${YELLOW}npm run android:build${NC}"
echo ""
echo "2. Pour générer un keystore de signature (optionnel):"
echo -e "   ${YELLOW}npm run android:setup${NC}"
echo ""
echo "3. L'APK sera disponible dans:"
echo "   android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "📚 Pour plus d'informations, consultez: ANDROID_BUILD_GUIDE.md"
echo ""
