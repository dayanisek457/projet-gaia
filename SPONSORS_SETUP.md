# Guide de Configuration - Système de Gestion des Sponsors

Ce guide explique comment configurer et utiliser le nouveau système de gestion des sponsors/partenaires pour le projet GAIA.

## 📋 Table des Matières

1. [Configuration de la Base de Données](#configuration-de-la-base-de-données)
2. [Accès au Panel Admin](#accès-au-panel-admin)
3. [Gestion des Sponsors](#gestion-des-sponsors)
4. [Personnalisation](#personnalisation)

---

## 🗄️ Configuration de la Base de Données

### Étape 1 : Exécuter le Script SQL

1. Connectez-vous à votre dashboard Supabase : https://app.supabase.com
2. Sélectionnez votre projet GAIA
3. Dans le menu de gauche, cliquez sur "SQL Editor"
4. Cliquez sur "+ New query"
5. Copiez le contenu du fichier `supabase_sponsors_table.sql`
6. Collez-le dans l'éditeur SQL
7. Cliquez sur "Run" (ou appuyez sur Ctrl+Enter)

### Ce que le script crée :

- **Table `sponsors`** avec les colonnes :
  - `id` : Identifiant unique (UUID)
  - `name` : Nom du sponsor/partenaire
  - `description` : Description du sponsor
  - `logo_url` : URL du logo (stocké sur S3)
  - `image_url` : URL de l'image principale (stocké sur S3)
  - `website_url` : Site web du sponsor
  - `category` : Catégorie du sponsor
  - `display_order` : Ordre d'affichage (nombre)
  - `created_at` : Date de création
  - `updated_at` : Date de dernière modification

- **Indexes** pour optimiser les performances
- **Politiques RLS (Row Level Security)** :
  - Lecture publique (tout le monde peut voir les sponsors)
  - Écriture réservée aux utilisateurs authentifiés

- **Trigger** pour mettre à jour automatiquement `updated_at`

- **Données d'exemple** (optionnel - peut être supprimé après les tests)

### Étape 2 : Vérification

Pour vérifier que la table a été créée correctement :

1. Dans Supabase, allez dans "Table Editor"
2. Vous devriez voir la table "sponsors"
3. Vérifiez qu'il y a 3 exemples de sponsors (si vous n'avez pas supprimé les INSERT)

---

## 🔐 Accès au Panel Admin

### Connexion

1. Naviguez vers `/admin` sur votre site
2. Utilisez vos identifiants Supabase pour vous connecter
3. Une fois connecté, vous verrez le dashboard admin

### Navigation vers la Gestion des Sponsors

1. Dans le menu de navigation en haut, cliquez sur l'onglet **"Sponsors"**
2. Vous arriverez sur l'interface de gestion des sponsors

---

## 👥 Gestion des Sponsors

### Ajouter un Nouveau Sponsor

1. Cliquez sur le bouton **"Ajouter un Sponsor"** (en haut à droite)
2. Remplissez le formulaire :
   - **Nom*** : Le nom de l'organisation (obligatoire)
   - **Description*** : Une description du partenaire (obligatoire)
   - **Catégorie*** : Choisissez parmi :
     - Entreprises Aéronautiques
     - Jardineries & Reforestation
     - Collectivités Locales
     - Partenaires Technologiques
     - Autres
   - **Ordre d'affichage** : Nombre pour définir l'ordre (0 = premier)
   - **Site Web** : URL du site du sponsor (optionnel)
   - **Logo** : Téléchargez le logo (image, optionnel)
   - **Image** : Téléchargez une image principale (optionnel)

3. Cliquez sur **"Créer"**

> **Note sur les images** : Les fichiers sont automatiquement uploadés sur Supabase S3 dans le bucket `global`. Assurez-vous que ce bucket existe et est configuré correctement.

### Modifier un Sponsor

1. Sur la carte du sponsor, cliquez sur **"Modifier"**
2. Modifiez les champs souhaités
3. Pour changer le logo ou l'image, sélectionnez un nouveau fichier
4. Cliquez sur **"Mettre à jour"**

### Supprimer un Sponsor

1. Sur la carte du sponsor, cliquez sur l'icône de poubelle (rouge)
2. Confirmez la suppression dans la boîte de dialogue

### Ordre d'Affichage

Les sponsors sont affichés par :
1. **Ordre d'affichage** (display_order) : croissant
2. **Date de création** : plus récent en premier

Pour réorganiser, modifiez le champ "Ordre d'affichage" de chaque sponsor.

---

## 🎨 Personnalisation

### Catégories

Pour ajouter ou modifier les catégories disponibles :

1. Ouvrez `src/components/SponsorsManager.tsx`
2. Trouvez la constante `SPONSOR_CATEGORIES`
3. Ajoutez ou modifiez les catégories selon vos besoins

```typescript
const SPONSOR_CATEGORIES = [
  'Entreprises Aéronautiques',
  'Jardineries & Reforestation',
  'Collectivités Locales',
  'Partenaires Technologiques',
  'Autres',
  // Ajoutez vos catégories ici
];
```

### Styles de la Page Partenaires

Le fichier `src/pages/Partenaires.tsx` contient le code de la page publique. Vous pouvez personnaliser :
- Les couleurs des boutons
- La mise en page des cartes
- Le texte des sections
- Les animations

### Section d'Accueil

Le fichier `src/components/SponsorsSection.tsx` contient la section simplifiée sur la page d'accueil. Vous pouvez modifier :
- Le texte d'accroche
- Les boutons d'action
- Les couleurs et styles

---

## 🔍 Dépannage

### Les sponsors ne s'affichent pas

**Problème** : La page /partenaires affiche "Premiers Partenaires Recherchés"

**Solution** :
1. Vérifiez que la table `sponsors` existe dans Supabase
2. Vérifiez qu'il y a au moins un sponsor dans la table
3. Vérifiez les politiques RLS (elles doivent autoriser la lecture publique)
4. Vérifiez la console du navigateur pour les erreurs

### Impossible d'uploader des images

**Problème** : L'upload d'image échoue

**Solution** :
1. Vérifiez que le bucket `global` existe dans Supabase Storage
2. Vérifiez les permissions du bucket (doit autoriser les uploads pour les utilisateurs authentifiés)
3. Vérifiez que vous êtes bien connecté en tant qu'administrateur
4. Vérifiez la taille du fichier (limitée par Supabase)

### Erreur de connexion à l'admin

**Problème** : Impossible de se connecter au panel admin

**Solution** :
1. Vérifiez que vos identifiants Supabase sont corrects
2. Vérifiez que les variables d'environnement sont bien configurées dans `.env`
3. Vérifiez que l'authentification Supabase est activée pour votre projet

---

## 📱 Pages Créées

### 1. `/partenaires` - Page Publique
- Affiche tous les sponsors groupés par catégorie
- Design responsive et professionnel
- Boutons d'appel à l'action
- Gestion de l'état vide

### 2. `/admin` (onglet Sponsors) - Panel Admin
- Interface CRUD complète
- Upload de fichiers
- Gestion des catégories
- Réorganisation par drag-and-drop de l'ordre

### 3. Page d'accueil (section simplifiée)
- Section allégée et moins redondante
- Lien vers la page dédiée
- Call-to-action maintenu

---

## 🎯 Prochaines Étapes

1. **Supprimer les exemples** : Une fois que vous avez ajouté vos vrais sponsors, supprimez les exemples de la base de données
2. **Ajouter des vrais sponsors** : Utilisez le panel admin pour ajouter vos vrais partenaires
3. **Personnaliser le design** : Ajustez les couleurs et styles selon votre charte graphique
4. **Tester** : Vérifiez que tout fonctionne sur mobile et desktop

---

## 💡 Conseils

- **Ordre d'affichage** : Utilisez des multiples de 10 (10, 20, 30...) pour faciliter l'insertion de nouveaux sponsors entre les existants
- **Images** : Utilisez des images de haute qualité pour les logos (PNG avec fond transparent recommandé)
- **Descriptions** : Soyez concis et mettez en avant la valeur du partenariat
- **Catégories** : Regroupez vos sponsors de manière cohérente pour faciliter la navigation

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez la console du navigateur (F12) pour les erreurs JavaScript
2. Vérifiez les logs Supabase pour les erreurs de base de données
3. Consultez la documentation Supabase : https://supabase.com/docs

---

**Bonne chance avec la gestion de vos partenaires ! 🌱**
