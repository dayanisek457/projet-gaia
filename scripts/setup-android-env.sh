#!/bin/bash
# Script de configuration rapide pour GitHub Codespace
# Configure l'environnement pour builder l'APK Android

set -e

echo "🚀 Configuration de l'environnement Android pour GitHub Codespace"
echo "================================================================="
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Installation de Java 21
echo "📦 Étape 1/3: Installation de Java 21..."
if ! command -v java &> /dev/null || ! java -version 2>&1 | grep -q "21\."; then
    sudo apt-get update -qq
    sudo apt-get install -y openjdk-21-jdk
    echo -e "${GREEN}✅ Java 21 installé${NC}"
else
    echo -e "${GREEN}✅ Java 21 déjà installé${NC}"
fi

# 2. Configuration de JAVA_HOME
echo ""
echo "🔧 Étape 2/3: Configuration de JAVA_HOME..."
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# Ajouter au .bashrc pour persistance
if ! grep -q "JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64" ~/.bashrc; then
    echo "" >> ~/.bashrc
    echo "# Java 21 pour Android build" >> ~/.bashrc
    echo "export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64" >> ~/.bashrc
    echo "export PATH=\$JAVA_HOME/bin:\$PATH" >> ~/.bashrc
    echo -e "${GREEN}✅ JAVA_HOME configuré dans .bashrc${NC}"
else
    echo -e "${GREEN}✅ JAVA_HOME déjà configuré${NC}"
fi

# 3. Installation des dépendances npm
echo ""
echo "📦 Étape 3/3: Installation des dépendances npm..."
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
