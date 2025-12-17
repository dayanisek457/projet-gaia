# Guide d'utilisation - Galerie & Ressources

Ce guide explique comment ajouter et gérer les images et fichiers dans la section Galerie & Ressources du site Projet Gaia.

## 📸 Ajouter des images à la galerie

### Étape 1 : Ajouter vos fichiers images

Placez vos images dans le dossier :
```
public/gallery/
```

**Formats supportés :** JPG, JPEG, PNG, GIF, WebP, SVG

### Étape 2 : Mettre à jour le manifest

Éditez le fichier `public/gallery/manifest.json` et ajoutez une entrée pour chaque image :

```json
{
  "images": [
    {
      "src": "/gallery/mon-image.jpg",
      "alt": "Description de l'image",
      "size": "large"
    }
  ]
}
```

**Tailles disponibles :**
- `"small"` : Image petite (hauteur 1 unité)
- `"medium"` : Image moyenne (hauteur 2 unités)
- `"large"` : Image grande (hauteur 3 unités)

💡 **Astuce :** Variez les tailles pour un rendu visuel plus attractif en masonry layout !

### Exemple complet

```json
{
  "images": [
    {
      "src": "/gallery/drone-prototype.jpg",
      "alt": "Prototype du drone Gaia en vol",
      "size": "large"
    },
    {
      "src": "/gallery/team-photo.jpg",
      "alt": "Photo de l'équipe Gaia 2025",
      "size": "medium"
    },
    {
      "src": "/gallery/reforestation-site.jpg",
      "alt": "Site de reforestation test",
      "size": "small"
    }
  ]
}
```

## 📁 Ajouter des fichiers aux ressources

### Étape 1 : Ajouter vos fichiers

Placez vos fichiers dans le dossier :
```
public/files/
```

**Tous les types de fichiers sont acceptés :** PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT, etc.

### Étape 2 : Mettre à jour le manifest

Éditez le fichier `public/files/manifest.json` et ajoutez une entrée pour chaque fichier :

```json
{
  "files": [
    {
      "name": "Nom affiché du fichier",
      "path": "/files/mon-fichier.pdf",
      "type": "Document PDF",
      "size": "2.5 MB"
    }
  ]
}
```

**Champs :**
- `name` : Nom qui sera affiché (obligatoire)
- `path` : Chemin depuis `/public` (obligatoire)
- `type` : Type de document (optionnel)
- `size` : Taille du fichier (optionnel)

### Exemple complet

```json
{
  "files": [
    {
      "name": "Présentation du Projet Gaia",
      "path": "/files/presentation-gaia-2025.pdf",
      "type": "Présentation PDF",
      "size": "5.2 MB"
    },
    {
      "name": "Dossier Technique",
      "path": "/files/dossier-technique.pdf",
      "type": "Document PDF",
      "size": "12.8 MB"
    },
    {
      "name": "Budget Prévisionnel",
      "path": "/files/budget.xlsx",
      "type": "Feuille de calcul Excel",
      "size": "156 KB"
    }
  ]
}
```

## 🔄 Workflow GitHub

### Pour ajouter ou modifier des fichiers :

1. **Clonez le repository** ou créez une nouvelle branche
   ```bash
   git checkout -b add-gallery-images
   ```

2. **Ajoutez vos fichiers** dans `public/gallery/` ou `public/files/`

3. **Mettez à jour les manifests** correspondants

4. **Committez et pushez**
   ```bash
   git add public/gallery/ public/files/
   git commit -m "Ajout de nouvelles images et ressources"
   git push origin add-gallery-images
   ```

5. **Créez une Pull Request** sur GitHub

6. **Une fois mergée**, les fichiers seront automatiquement disponibles sur le site !

## 🎨 Bonnes pratiques

### Pour les images :
- ✅ Utilisez des images de bonne qualité mais optimisées
- ✅ Variez les tailles (small/medium/large) pour un layout dynamique
- ✅ Nommez vos fichiers de manière descriptive : `drone-vol-test-mars2025.jpg`
- ✅ Ajoutez des descriptions alt détaillées pour l'accessibilité
- ⚠️ Évitez les images trop lourdes (idéalement < 2 MB par image)

### Pour les fichiers :
- ✅ Utilisez des noms de fichiers clairs et explicites
- ✅ Compressez les PDF si possible
- ✅ Mentionnez la taille pour informer les utilisateurs
- ✅ Indiquez le type de document clairement

## 📱 Fonctionnalités

- **Galerie responsive** : S'adapte automatiquement à tous les écrans
- **Vue modale** : Cliquez sur une image pour la voir en grand format
- **Téléchargement direct** : Bouton de téléchargement pour chaque fichier
- **Layout masonry** : Affichage dynamique avec différentes tailles d'images
- **Navigation intégrée** : Accessible depuis le menu principal

## 🛠️ Support

Si vous rencontrez des problèmes ou avez des questions :
1. Vérifiez que les chemins dans les manifests correspondent aux fichiers réels
2. Assurez-vous que les fichiers sont bien dans `public/gallery/` ou `public/files/`
3. Vérifiez la syntaxe JSON des manifests (pas de virgule en trop !)
4. Consultez la console du navigateur pour les erreurs éventuelles

## 📝 Notes

- Les fichiers d'exemple peuvent être supprimés une fois que vous avez ajouté vos propres fichiers
- Les manifests JSON doivent être valides (utilisez un validateur JSON si nécessaire)
- Les modifications sont prises en compte immédiatement après le déploiement
