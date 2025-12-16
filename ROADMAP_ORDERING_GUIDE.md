# Guide: Fonctionnalité d'Ordre d'Affichage de la Roadmap

## Vue d'ensemble

Cette fonctionnalité permet aux administrateurs de contrôler l'ordre dans lequel les éléments de la roadmap apparaissent sur la page publique `/roadmap`.

**Principe:**
- Les éléments avec un **numéro d'ordre plus élevé** apparaissent **en premier** (en haut de la page)
- Les éléments avec un **numéro d'ordre plus bas** apparaissent **en dernier** (en bas de la page)
- Par exemple: ordre 10 → en haut, ordre 1 → en bas

## Installation

### 1. Appliquer la Migration Base de Données

La migration ajoute une colonne `display_order` à la table `roadmap_entries`.

**Option A: Via l'interface Supabase**
1. Ouvrir le projet Supabase
2. Aller dans "SQL Editor"
3. Copier et coller le contenu du fichier `supabase/migrations/add_display_order_to_roadmap.sql`
4. Exécuter la requête

**Option B: Via Supabase CLI**
```bash
# Si vous utilisez Supabase CLI
supabase migration up
```

### 2. Vérifier l'Installation

Exécuter cette requête SQL pour vérifier que la colonne a été ajoutée:

```sql
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'roadmap_entries' 
AND column_name = 'display_order';
```

Résultat attendu:
```
column_name   | data_type | column_default
--------------|-----------|---------------
display_order | integer   | 0
```

## Utilisation

### Pour les Administrateurs

#### Créer un Nouvel Élément de Roadmap

1. Se connecter à l'espace admin
2. Aller dans l'onglet "Roadmap"
3. Cliquer sur "Nouvel élément"
4. Remplir le formulaire:
   - Titre *
   - Description courte *
   - Timeline
   - Statut
   - **Ordre d'affichage** *: Choisir la position dans le dropdown
     - 1 = Dernier (en bas)
     - Plus grand nombre = Premier (en haut)
5. Ajouter du contenu détaillé (optionnel)
6. Ajouter des fichiers (optionnel)
7. Cliquer sur "Créer"

#### Modifier l'Ordre d'un Élément Existant

1. Dans l'onglet "Roadmap" de l'admin
2. Repérer l'élément à modifier (un badge #N indique l'ordre actuel)
3. Cliquer sur le bouton "Modifier" (icône crayon)
4. Changer la valeur du champ "Ordre d'affichage"
5. Cliquer sur "Mettre à jour"

**Conseil:** Pour réorganiser plusieurs éléments:
- Noter l'ordre souhaité sur papier
- Modifier chaque élément un par un
- Les changements sont visibles immédiatement sur la page publique

### Pour les Visiteurs

Les visiteurs verront automatiquement les éléments dans l'ordre défini:
- Page: `/roadmap`
- Les éléments sont affichés du haut vers le bas selon leur `display_order`
- Le premier élément (numéro le plus élevé) a un badge "🆕 Plus récent"

## Comportement Technique

### Ordre de Tri

Les éléments sont triés selon ces critères (dans l'ordre):
1. `display_order` (décroissant) - Plus élevé en premier
2. `created_at` (décroissant) - Plus récent en premier (si même display_order)

### Valeurs par Défaut

- **Nouveaux éléments:** Reçoivent automatiquement `display_order = nombre_d_elements + 1`
- **Éléments existants:** Ont reçu des valeurs séquentielles lors de la migration (basées sur leur date de création)

### Index Base de Données

Un index composite a été créé pour optimiser les performances:
```sql
CREATE INDEX idx_roadmap_entries_display_order 
ON roadmap_entries(display_order DESC, created_at DESC);
```

## Tests

### Test 1: Créer un Élément avec Ordre Spécifique

**Étapes:**
1. Créer 3 éléments avec les ordres suivants:
   - Élément A: ordre 3
   - Élément B: ordre 1
   - Élément C: ordre 2
2. Aller sur la page `/roadmap`

**Résultat attendu:**
- Ordre d'affichage: A (en haut) → C (milieu) → B (en bas)

### Test 2: Modifier l'Ordre d'un Élément

**Étapes:**
1. Avoir au moins 3 éléments de roadmap
2. Modifier l'élément du milieu pour lui donner l'ordre le plus élevé
3. Recharger la page `/roadmap`

**Résultat attendu:**
- L'élément modifié apparaît maintenant en premier

### Test 3: Éléments avec Même Ordre

**Étapes:**
1. Créer deux éléments avec le même `display_order`
2. Observer leur ordre sur `/roadmap`

**Résultat attendu:**
- L'élément créé le plus récemment apparaît en premier

### Test 4: Vérification Admin

**Étapes:**
1. Aller dans l'onglet "Roadmap" de l'admin
2. Observer les badges #N sur chaque carte

**Résultat attendu:**
- Chaque carte affiche un badge avec le numéro d'ordre (ex: #1, #2, #3)
- Les cartes sont triées par ordre décroissant

## Dépannage

### Les éléments ne s'affichent pas dans le bon ordre

**Solutions:**
1. Vérifier que la migration a été appliquée:
   ```sql
   SELECT id, title, display_order, created_at 
   FROM roadmap_entries 
   ORDER BY display_order DESC, created_at DESC;
   ```

2. Vider le cache du navigateur et recharger la page

3. Vérifier les valeurs de `display_order` dans la base de données

### La colonne display_order n'existe pas

**Solution:**
1. Appliquer la migration manuellement via SQL Editor
2. Redémarrer l'application si nécessaire

### Les modifications ne sont pas visibles

**Solutions:**
1. Vérifier que l'élément est publié (`is_published = true`)
2. Attendre quelques secondes pour la réplication Supabase
3. Vérifier la console du navigateur pour des erreurs

## Commandes SQL Utiles

```sql
-- Voir tous les éléments et leur ordre
SELECT id, title, display_order, created_at, status
FROM roadmap_entries
WHERE is_published = true
ORDER BY display_order DESC, created_at DESC;

-- Réinitialiser tous les ordres (séquentiel basé sur date de création)
WITH ordered_items AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) as new_order
  FROM roadmap_entries
)
UPDATE roadmap_entries r
SET display_order = o.new_order
FROM ordered_items o
WHERE r.id = o.id;

-- Intervertir l'ordre de deux éléments
BEGIN;
UPDATE roadmap_entries SET display_order = 999 WHERE id = 'ELEMENT_A_ID';
UPDATE roadmap_entries SET display_order = (
  SELECT display_order FROM roadmap_entries WHERE id = 'ELEMENT_B_ID'
) WHERE id = 'ELEMENT_A_ID';
UPDATE roadmap_entries SET display_order = 999 WHERE id = 'ELEMENT_B_ID';
COMMIT;

-- Décaler tous les ordres (pour insérer un élément au milieu)
UPDATE roadmap_entries 
SET display_order = display_order + 1 
WHERE display_order >= 5;
```

## Architecture

### Fichiers Modifiés

1. **`supabase/migrations/add_display_order_to_roadmap.sql`**
   - Migration base de données
   - Ajoute la colonne `display_order`
   - Crée l'index
   - Initialise les valeurs pour les éléments existants

2. **`src/lib/supabase-roadmap.ts`**
   - Interface `RoadmapItem`: ajout de `displayOrder: number`
   - Interface `RoadmapItemDB`: ajout de `display_order: number`
   - Méthodes `dbToFrontend` et `frontendToDb`: conversion du champ
   - Méthode `getAllItems()`: tri par `display_order DESC`

3. **`src/components/RoadmapManager.tsx`**
   - Ajout du champ `displayOrder` dans le formulaire
   - Dropdown de sélection avec labels explicatifs
   - Badge visuel (#N) sur les cartes admin
   - Helper `getOrderDisplayLabel()` pour les labels

4. **`src/pages/Roadmap.tsx`**
   - Utilise automatiquement le tri de `getAllItems()`
   - Affichage séquentiel des éléments

## Support

Pour toute question ou problème:
1. Consulter ce guide
2. Vérifier les logs de la console navigateur
3. Vérifier les logs Supabase
4. Contacter l'équipe de développement
