# Guide de Test - Autosave et Langue Française

## Prérequis

1. Base de données Supabase configurée
2. Migration SQL exécutée (`supabase/migrations/create_autosaves_table.sql`)
3. Application démarrée (`npm run dev`)
4. Compte administrateur pour accéder à l'espace admin

## Tests de l'Autosave

### Test 1: Roadmap - Création d'un nouvel élément

**Étapes:**
1. Se connecter à l'espace admin
2. Aller dans l'onglet "Roadmap"
3. Cliquer sur "Nouvel élément"
4. Commencer à remplir le formulaire (titre, description)
5. Attendre 15 secondes sans sauvegarder

**Résultat attendu:**
- L'autosave devrait se déclencher automatiquement (vérifier dans la console du navigateur: "Autosave successful")
- Aucune notification toast visible (sauvegarde silencieuse)

**Vérification:**
```sql
-- Dans Supabase SQL Editor
SELECT * FROM autosaves WHERE entity_type = 'roadmap';
```

### Test 2: Roadmap - Modification d'un élément existant

**Étapes:**
1. Cliquer sur "Modifier" sur un élément existant
2. Modifier le titre ou la description
3. Attendre 15 secondes sans sauvegarder

**Résultat attendu:**
- L'autosave devrait se mettre à jour automatiquement
- `updated_at` devrait être mis à jour dans la base de données

### Test 3: Suppression de l'autosave après publication

**Étapes:**
1. Créer/modifier un élément de roadmap
2. Attendre l'autosave (15 secondes)
3. Cliquer sur "Créer" ou "Mettre à jour"

**Résultat attendu:**
- L'élément est créé/mis à jour avec succès
- L'autosave correspondante est supprimée de la base de données

**Vérification:**
```sql
-- L'autosave devrait avoir disparu
SELECT * FROM autosaves WHERE entity_type = 'roadmap' AND user_id = 'YOUR_USER_ID';
```

### Test 4: Documentation - Nouvelle section

**Étapes:**
1. Aller dans l'onglet "Documentation"
2. Cliquer sur "Nouvelle Section"
3. Remplir le titre et sélectionner un type
4. Attendre 15 secondes

**Résultat attendu:**
- Autosave créé avec `entity_type = 'documentation'`
- `entity_id` est NULL (nouvelle section)

### Test 5: Documentation - Édition de section

**Étapes:**
1. Cliquer sur "Éditer" sur une section existante
2. Modifier le contenu
3. Attendre 15 secondes

**Résultat attendu:**
- Autosave créé/mis à jour avec `entity_type = 'documentation'`
- `entity_id` contient l'ID de la section

### Test 6: Tâches (TaskBoard)

**Étapes:**
1. Aller dans l'onglet "Tâches"
2. Créer ou modifier une tâche
3. Attendre 15 secondes

**Résultat attendu:**
- Autosave créé avec `entity_type = 'task'`

### Test 7: Sponsors

**Étapes:**
1. Aller dans l'onglet "Sponsors"
2. Créer ou modifier un sponsor
3. Attendre 15 secondes

**Résultat attendu:**
- Autosave créé avec `entity_type = 'sponsor'`

### Test 8: Multiple autosaves simultanées

**Étapes:**
1. Ouvrir deux onglets avec l'application
2. Dans le premier onglet, commencer à éditer une roadmap
3. Dans le deuxième onglet, commencer à éditer une documentation
4. Attendre 15 secondes

**Résultat attendu:**
- Deux autosaves distinctes créées
- Chaque autosave a le bon `entity_type`

### Test 9: Nettoyage automatique

**Pour tester manuellement:**
```sql
-- Créer une autosave ancienne (simuler 8 jours)
INSERT INTO autosaves (entity_type, entity_id, content, user_id, created_at, updated_at)
VALUES ('roadmap', 'test-123', '{"test": "data"}', 'YOUR_USER_ID', 
        NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days');

-- Exécuter le nettoyage
SELECT cleanup_old_autosaves();

-- Vérifier que l'autosave ancienne a été supprimée
SELECT * FROM autosaves WHERE entity_id = 'test-123';
```

## Tests de la Langue Française

### Test 10: Input - Correction orthographique

**Étapes:**
1. Ouvrir l'espace admin
2. Dans n'importe quel formulaire, commencer à taper dans un champ Input
3. Taper un mot français mal orthographié (ex: "bonjur" au lieu de "bonjour")

**Résultat attendu:**
- Le navigateur devrait souligner le mot en rouge (correction orthographique française)
- Le navigateur ne devrait PAS suggérer des corrections anglaises

**Note:** Vérifier dans l'inspecteur que l'input a bien `lang="fr"` et `spellcheck="true"`

### Test 11: Textarea - Correction orthographique

**Étapes:**
1. Dans un formulaire avec Textarea (ex: description de roadmap)
2. Taper du texte avec des fautes en français

**Résultat attendu:**
- Correction orthographique en français active
- Pas de suggestions en anglais

### Test 12: RichTextEditor - Correction orthographique

**Étapes:**
1. Créer une nouvelle section de documentation ou un contenu détaillé de roadmap
2. Utiliser le RichTextEditor
3. Taper du texte avec des fautes en français

**Résultat attendu:**
- L'éditeur devrait détecter les fautes en français
- Pas de vérification en anglais

## Tests de Sécurité (RLS)

### Test 13: Isolation des autosaves par utilisateur

**Étapes:**
1. Se connecter avec le compte A
2. Créer un autosave (commencer à éditer quelque chose)
3. Se déconnecter
4. Se connecter avec le compte B
5. Vérifier les autosaves visibles

**Résultat attendu:**
- Le compte B ne devrait voir aucun autosave du compte A

**Vérification SQL:**
```sql
-- Se connecter avec différents utilisateurs
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = 'USER_A_ID';
SELECT * FROM autosaves; -- Voir uniquement les autosaves de USER_A

SET LOCAL request.jwt.claim.sub = 'USER_B_ID';
SELECT * FROM autosaves; -- Voir uniquement les autosaves de USER_B
```

### Test 14: Cascade Delete

**Étapes:**
1. Créer un autosave pour un utilisateur
2. Supprimer l'utilisateur depuis Supabase Auth

**Résultat attendu:**
- L'autosave devrait être automatiquement supprimée (CASCADE)

## Tests de Performance

### Test 15: Debouncing

**Étapes:**
1. Ouvrir la console du navigateur
2. Créer/éditer un élément
3. Taper rapidement du texte (plusieurs caractères par seconde)

**Résultat attendu:**
- L'autosave ne devrait se déclencher qu'après 15 secondes d'inactivité
- Pas de multiples appels API simultanés
- Message "Autosave successful" visible toutes les 15 secondes minimum

### Test 16: Contenu identique

**Étapes:**
1. Créer/éditer un élément
2. Ne rien modifier
3. Attendre 15 secondes

**Résultat attendu:**
- Aucun autosave si le contenu n'a pas changé
- Pas d'appel API inutile

## Checklist de Validation

- [ ] Autosave fonctionne pour Roadmap (création)
- [ ] Autosave fonctionne pour Roadmap (édition)
- [ ] Autosave fonctionne pour Documentation (nouvelle section)
- [ ] Autosave fonctionne pour Documentation (édition section)
- [ ] Autosave fonctionne pour TaskBoard
- [ ] Autosave fonctionne pour Sponsors
- [ ] Les autosaves sont supprimées après publication
- [ ] Correction orthographique française fonctionne dans Input
- [ ] Correction orthographique française fonctionne dans Textarea
- [ ] Correction orthographique française fonctionne dans RichTextEditor
- [ ] RLS empêche l'accès aux autosaves d'autres utilisateurs
- [ ] Cascade delete fonctionne
- [ ] Debouncing évite les appels excessifs
- [ ] Nettoyage automatique supprime les anciennes autosaves

## Dépannage

### L'autosave ne se déclenche pas

1. Vérifier la console: chercher "Autosave successful"
2. Vérifier que le dialog/formulaire est ouvert
3. Vérifier que le contenu a changé
4. Vérifier l'authentification de l'utilisateur

### Les autosaves ne sont pas supprimées

1. Vérifier que `clearAutosave()` est appelé après la sauvegarde
2. Vérifier les logs d'erreur dans la console
3. Vérifier les permissions RLS dans Supabase

### La correction orthographique ne fonctionne pas en français

1. Vérifier que le navigateur est configuré en français
2. Vérifier l'attribut `lang="fr"` dans l'inspecteur
3. Essayer avec un autre navigateur (Chrome, Firefox)
4. S'assurer que le dictionnaire français est installé dans le navigateur

## Commandes SQL Utiles

```sql
-- Voir tous les autosaves
SELECT * FROM autosaves ORDER BY updated_at DESC;

-- Voir les autosaves par type
SELECT entity_type, COUNT(*) 
FROM autosaves 
GROUP BY entity_type;

-- Voir la taille des autosaves
SELECT 
  entity_type,
  pg_size_pretty(SUM(LENGTH(content))::bigint) as content_size
FROM autosaves
GROUP BY entity_type;

-- Supprimer manuellement un autosave
DELETE FROM autosaves WHERE id = 'AUTOSAVE_ID';

-- Nettoyer les autosaves anciens
SELECT cleanup_old_autosaves();
```

## Logs à Surveiller

### Console du Navigateur
```
Autosave successful: roadmap abc-123
Autosave cleared: roadmap abc-123
```

### Supabase Logs
- Erreurs de permissions (RLS)
- Erreurs d'insertion/mise à jour
- Violations de contraintes

## Support

En cas de problème:
1. Consulter `AUTOSAVE_DOCUMENTATION.md`
2. Vérifier les logs de la console
3. Vérifier les logs Supabase
4. Vérifier que la migration SQL a été exécutée correctement
