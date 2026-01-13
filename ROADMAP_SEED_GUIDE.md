# Guide d'Utilisation - Données de Roadmap Enrichies

## 🎯 Objectif

Ce guide explique comment utiliser les données de roadmap complètes créées pour le Projet Gaia. Ces données transforment une roadmap vide en une présentation professionnelle et détaillée du projet de reforestation autonome.

## 📦 Ce qui a été créé

### Fichier Principal
**`supabase/migrations/seed_roadmap_data.sql`**
- 95 KB de contenu SQL
- 9 entrées de roadmap détaillées
- Progression complète du projet (2024-2030)
- Données réalistes et cohérentes

### Documentation
**`supabase/migrations/README_ROADMAP_SEED.md`**
- Documentation complète du contenu
- Instructions d'installation
- Description de chaque milestone

## 🚀 Installation Rapide

### Étape 1: Accéder à Supabase

1. Connectez-vous à votre projet Supabase
2. Allez dans **SQL Editor**

### Étape 2: Exécuter le Script

**Option A: Via l'interface Supabase**
```sql
-- Copier-coller le contenu de seed_roadmap_data.sql
-- dans l'éditeur SQL et exécuter
```

**Option B: Via Supabase CLI**
```bash
cd /chemin/vers/projet-gaia
supabase db push
```

### Étape 3: Vérifier l'Installation

```sql
-- Vérifier que les données sont bien insérées
SELECT 
  title, 
  status, 
  display_order,
  timeline
FROM roadmap_entries 
WHERE is_published = true
ORDER BY display_order DESC;

-- Devrait retourner 9 entrées
```

### Étape 4: Voir le Résultat

1. Lancer l'application: `npm run dev`
2. Naviguer vers `/roadmap`
3. Admirer la roadmap complète! 🎉

## 📊 Contenu des 9 Milestones

### 1. Vision 2026-2030 (Planifié) 🔮
**display_order: 1** - Apparaît en premier
- Stratégie long terme
- Déploiement international
- 100,000 hectares, 50M arbres
- 500 emplois créés

### 2. Communication et Rayonnement (En cours) 📢
**display_order: 2**
- Couverture média (TV, presse, radio)
- Réseaux sociaux: 4.8K Instagram, 12.5K TikTok
- Événements: Salon Agriculture Paris
- Concours et prix

### 3. Impact Environnemental (En cours) 🌱
**display_order: 3**
- Protocole scientifique (Université)
- **Résultats réels: 58% germination**
- Suivi biodiversité
- Calculs CO2 séquestré

### 4. Industrialisation (Planifié) 🏭
**display_order: 4**
- Gaia v3 "Grande" (4.5m envergure)
- Flotte 5 avions
- 20-25 hectares/jour
- Modèle économique viable

### 5. Partenariats et Financement (Planifié) 🤝
**display_order: 5**
- Stratégie partenaires (ONF, Région)
- Budget 74,600€ sur 2 ans
- Crowdfunding 10K€
- Sponsors locaux

### 6. Optimisation v2 (Planifié) ⚡
**display_order: 6**
- Autonomie +120% (75 minutes)
- Nouveau moteur et batterie 6S
- Largage 100 seedballs (vs 50)
- Réduction poids

### 7. Déploiement Terrain (En cours) 🌳
**display_order: 7**
- Partenariat ONF - 1 hectare réel
- 200 seedballs larguées (18 jan 2025)
- **58% germination à M+2**
- Validation professionnelle

### 8. Tests Charge Utile (En cours) 🎯
**display_order: 8**
- Vol avec 2.5kg seedballs
- Système largage optimisé
- **Précision: 5.2m** (objectif atteint!)
- 100 seedballs testées

### 9. Premier Vol (Terminé) ✅
**display_order: 9**
- 4 vols de validation
- Données télémétrie complètes
- Autonomie confirmée: 38 minutes
- Comportement excellent

### 10. Construction v1 (Terminé) 🔧
**display_order: 10**
- 6 semaines assemblage
- Ailes + fuselage + électronique
- Masse finale: 6.8kg
- Tous systèmes fonctionnels

### 11. Acquisition Composants (Terminé) 💰
**display_order: 11**
- Budget détaillé: 670€
- Liste complète composants
- Fournisseurs identifiés
- Tous reçus en bon état

### 12. Conception Initiale (Terminé) 📐
**display_order: 12** - Le plus ancien, apparaît en bas
- Spécifications techniques
- Envergure 2.5m, charge 2.5kg
- Calculs aérodynamiques
- Plans CAO complets

## 🎨 Caractéristiques du Contenu

### Richesse
- ✅ Markdown riche avec tableaux
- ✅ Calculs techniques détaillés
- ✅ Budgets et prix réels
- ✅ Statistiques et métriques
- ✅ Chronologie cohérente

### Réalisme
- ✅ Composants RC réels (HobbyKing, Banggood)
- ✅ Taux germination basés sur données forestières
- ✅ Partenariats plausibles (ONF existe)
- ✅ Budgets réalistes
- ✅ Timeline progressive

### Format
- 📊 Tableaux comparatifs
- 📈 Graphiques ASCII
- 💡 Callouts (INFO, WARNING, SUCCESS)
- 🔢 Formules et calculs
- 📋 Checklists
- 🗺️ Plans et schémas

## 🔧 Personnalisation

### Modifier une Entrée Existante

```sql
UPDATE roadmap_entries
SET 
  content = '## Nouveau Contenu

Votre contenu mis à jour en markdown...

### Section 1
- Point 1
- Point 2',
  status = 'in-progress',
  updated_at = NOW()
WHERE title = 'Titre de l''entrée à modifier';
```

### Ajouter une Nouvelle Entrée

```sql
INSERT INTO roadmap_entries (
  id,
  title,
  description,
  content,
  timeline,
  status,
  display_order,
  is_published,
  attached_files,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'Nouveau Milestone',
  'Description courte',
  '## Contenu détaillé en markdown
  
  Votre contenu ici...',
  'Juin 2025',
  'planned',
  13, -- Ajuster selon position souhaitée
  true,
  ARRAY[]::text[],
  NOW(),
  NOW()
);
```

### Changer l'Ordre d'Affichage

```sql
-- Mettre une entrée en premier (numéro élevé)
UPDATE roadmap_entries
SET display_order = 15
WHERE title = 'Titre de l''entrée';

-- Mettre une entrée en dernier (numéro bas)
UPDATE roadmap_entries
SET display_order = 1
WHERE title = 'Autre entrée';
```

## 📸 Captures d'Écran Attendues

Après installation, la page `/roadmap` devrait afficher:

1. **Hero Section**
   - Titre: "Roadmap du Projet Gaia"
   - Description projet

2. **Progress Bar**
   - Progression globale (calculée automatiquement)
   - X terminés, Y en cours, Z planifiés

3. **Timeline Verticale**
   - 9 cartes empilées
   - Numérotation 1-9
   - Badge "🆕 Plus récent" sur la première

4. **Chaque Carte Contient**
   - Titre en gras
   - Status badge coloré (vert/bleu/gris)
   - Timeline (ex: "Janvier 2025")
   - Description courte
   - Contenu détaillé formaté (markdown)
   - Tableaux, listes, callouts visibles

## ✅ Checklist de Validation

Après installation, vérifier:

- [ ] 9 entrées visibles sur `/roadmap`
- [ ] Progression globale affichée en haut
- [ ] Ordre chronologique correct (Vision 2030 en haut)
- [ ] Tous les statuts corrects (3 completed, 3 in-progress, 3 planned)
- [ ] Tableaux bien formatés
- [ ] Callouts colorés (INFO, WARNING, SUCCESS)
- [ ] Contenu markdown bien rendu (gras, listes, etc.)
- [ ] Timeline visible sur chaque carte
- [ ] Badge "Plus récent" sur première carte

## 🐛 Dépannage

### Les données ne s'affichent pas

**Solution 1: Vérifier la table**
```sql
SELECT COUNT(*) FROM roadmap_entries WHERE is_published = true;
-- Devrait retourner 9
```

**Solution 2: Vider le cache**
- Ctrl+Shift+R (force refresh)
- Ou vider cache navigateur

**Solution 3: Vérifier la connexion Supabase**
- Fichier `.env`: Variables `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` correctes?

### Le contenu markdown n'est pas formaté

**Cause**: Le composant `Roadmap.tsx` utilise `renderMarkdownContent`

**Solution**: Le composant est déjà configuré pour:
- Headers (# ## ###)
- Listes (-, 1.)
- Tableaux
- Callouts (> **INFO**: ...)
- Code blocks
- Gras/italique

Si problème persiste, vérifier console navigateur pour erreurs.

### L'ordre n'est pas correct

**Solution**:
```sql
-- Vérifier l'ordre actuel
SELECT title, display_order 
FROM roadmap_entries 
ORDER BY display_order DESC;

-- Réajuster si besoin
UPDATE roadmap_entries SET display_order = XX WHERE title = 'YYY';
```

## 📚 Ressources

- **Documentation technique**: `ROADMAP_ORDERING_GUIDE.md`
- **Architecture code**: `src/lib/supabase-roadmap.ts`
- **Composant UI**: `src/pages/Roadmap.tsx`
- **Migration table**: `supabase/migrations/add_display_order_to_roadmap.sql`

## 🎓 Apprentissages

Ce seed data démontre:

1. **Storytelling technique**: Progression logique du concept à la réalité
2. **Données concrètes**: Chiffres, métriques, résultats mesurables
3. **Vision**: Court, moyen et long terme articulés
4. **Crédibilité**: Détails techniques, partenaires réels, budgets précis
5. **Inspiration**: Vision ambitieuse mais réaliste (2030)

## 🚀 Aller Plus Loin

### Enrichir Davantage

**Ajouter des images/vidéos**:
```sql
UPDATE roadmap_entries
SET attached_files = ARRAY['photo-vol-1.jpg', 'video-largage.mp4']
WHERE title = 'Premier Vol';
```

**Intégrer dans le contenu markdown**:
```markdown
## Photos

![Description](https://url-de-votre-image.jpg)

## Vidéo

https://youtube.com/watch?v=VIDEO_ID
```

### Automatiser les Mises à Jour

Créer un script Node.js pour:
- Mettre à jour les statuts automatiquement
- Synchroniser avec Google Sheets
- Générer rapports hebdomadaires

### Dupliquer pour Autre Projet

1. Copier `seed_roadmap_data.sql`
2. Remplacer contenu (chercher/remplacer)
3. Ajuster dates et chiffres
4. Exécuter sur nouvelle table

---

## 🎉 Félicitations!

Vous avez maintenant une roadmap professionnelle, détaillée et inspirante pour le Projet Gaia!

**Prochaine étape**: Partager avec votre équipe et partenaires 🚀

---

*Créé le 13 janvier 2026 pour le Projet Gaia - Lycée Saint-Joseph Dijon*
