#!/bin/bash
# Script pour générer un keystore pour signer l'APK Android

set -e

echo "=== Génération du Keystore pour Gaia Android ===="
echo ""

KEYSTORE_DIR="android/keystore"
KEYSTORE_FILE="$KEYSTORE_DIR/gaia-release.keystore"

# Créer le répertoire keystore s'il n'existe pas
mkdir -p "$KEYSTORE_DIR"

# Vérifier si le keystore existe déjà
if [ -f "$KEYSTORE_FILE" ]; then
    echo "⚠️  Un keystore existe déjà à $KEYSTORE_FILE"
    read -p "Voulez-vous le remplacer? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Opération annulée."
        exit 0
    fi
    rm "$KEYSTORE_FILE"
fi

# Paramètres par défaut
ALIAS="gaia"
VALIDITY=10000  # jours (environ 27 ans)

echo "Création du keystore..."
echo "Note: Vous allez devoir entrer un mot de passe pour le keystore."
echo ""

# Générer le keystore
keytool -genkeypair \
    -v \
    -keystore "$KEYSTORE_FILE" \
    -alias "$ALIAS" \
    -keyalg RSA \
    -keysize 2048 \
    -validity $VALIDITY \
    -dname "CN=Gaia, OU=Lycée Saint Joseph, O=Lycée Saint Joseph Dijon, L=Dijon, ST=Bourgogne, C=FR"

echo ""
echo "✅ Keystore créé avec succès: $KEYSTORE_FILE"
echo ""
echo "📝 Prochaines étapes:"
echo "1. Ajoutez ces lignes à android/keystore.properties:"
echo "   storeFile=keystore/gaia-release.keystore"
echo "   storePassword=VOTRE_MOT_DE_PASSE"
echo "   keyAlias=gaia"
echo "   keyPassword=VOTRE_MOT_DE_PASSE"
echo ""
echo "2. Ou utilisez les variables d'environnement dans GitHub:"
echo "   ANDROID_KEYSTORE_PASSWORD"
echo ""
echo "⚠️  IMPORTANT: Ne commitez JAMAIS le keystore ou le mot de passe dans Git!"
echo "   Le fichier android/keystore/ est déjà dans .gitignore"
