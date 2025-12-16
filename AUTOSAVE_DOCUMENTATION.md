# Fonctionnalité d'Autosave (Sauvegarde Automatique)

## Vue d'ensemble

Le système d'autosave permet de sauvegarder automatiquement les modifications en cours dans l'espace administrateur toutes les 15 secondes. Cette fonctionnalité protège le travail de l'utilisateur en cas de fermeture accidentelle du navigateur ou de problème de connexion.

## Fonctionnalités

### 1. Sauvegarde Automatique
- **Intervalle**: 15 secondes après chaque modification
- **Zones couvertes**: 
  - Roadmap (création et édition)
  - Documentation (sections)
  - Tâches (TaskBoard)
  - Sponsors

### 2. Suppression Automatique
Les autosaves sont automatiquement supprimées lorsque :
- L'utilisateur publie/sauvegarde son contenu
- Le contenu est créé avec succès
- Le contenu est mis à jour avec succès

### 3. Nettoyage Automatique
Les autosaves de plus de 7 jours sont automatiquement supprimées pour éviter l'accumulation de données obsolètes.

## Architecture Technique

### Hook `useAutosave`
```typescript
const { clearAutosave } = useAutosave({
  entityType: 'roadmap', // Type d'entité
  entityId: item?.id || null, // ID de l'entité (null pour nouveau)
  content: JSON.stringify(formData), // Contenu à sauvegarder
  enabled: isDialogOpen, // Active/désactive l'autosave
});
```

### Service `autosaveService`
Le service gère toutes les opérations de base de données :
- `saveAutosave()`: Créer ou mettre à jour une autosave
- `getAutosave()`: Récupérer une autosave
- `deleteAutosave()`: Supprimer une autosave spécifique
- `deleteAllAutosaves()`: Supprimer toutes les autosaves d'un type

### Table de Base de Données
```sql
CREATE TABLE autosaves (
  id UUID PRIMARY KEY,
  entity_type TEXT NOT NULL, -- 'roadmap', 'documentation', 'task', 'sponsor'
  entity_id TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  UNIQUE(entity_type, entity_id, user_id)
);
```

## Sécurité

- **Row Level Security (RLS)**: Activé
- **Politiques**:
  - Les utilisateurs ne peuvent voir que leurs propres autosaves
  - Chaque utilisateur ne peut modifier que ses propres autosaves
  - Suppression automatique à la déconnexion (ON DELETE CASCADE)

## Paramètres de Langue

Tous les éditeurs de texte utilisent maintenant :
- `lang="fr"`: Pour la correction orthographique en français
- `spellCheck="true"`: Activation de la vérification orthographique

Cela s'applique à :
- Composant `Input`
- Composant `Textarea`
- `RichTextEditor`

## Utilisation pour Développeurs

### Intégration dans un Nouveau Composant

```typescript
import { useAutosave } from '@/hooks/useAutosave';

const MyComponent = () => {
  const [formData, setFormData] = useState({...});
  const [isEditing, setIsEditing] = useState(false);
  
  // Sérialiser les données du formulaire
  const contentToSave = JSON.stringify(formData);
  
  // Configurer l'autosave
  const { clearAutosave } = useAutosave({
    entityType: 'mon-type', // Ajouter à la liste des types
    entityId: editingItem?.id || null,
    content: contentToSave,
    enabled: isEditing, // Activer quand l'utilisateur édite
  });
  
  const handleSave = async () => {
    // Sauvegarder le contenu...
    
    // Supprimer l'autosave après sauvegarde réussie
    await clearAutosave();
  };
};
```

### Personnalisation de l'Intervalle

Par défaut, l'intervalle est de 15 secondes, mais peut être modifié :

```typescript
const { clearAutosave } = useAutosave({
  entityType: 'roadmap',
  entityId: item?.id || null,
  content: contentToSave,
  enabled: true,
  interval: 30000, // 30 secondes au lieu de 15
});
```

## Migration de Base de Données

Pour créer la table autosaves dans votre base de données Supabase :

```bash
# Exécuter le fichier de migration
psql -h [YOUR_DB_HOST] -U postgres -d postgres < supabase/migrations/create_autosaves_table.sql
```

Ou via l'interface Supabase SQL Editor, copier-coller le contenu de `supabase/migrations/create_autosaves_table.sql`.

## Maintenance

### Nettoyage Manuel
Pour nettoyer manuellement les anciens autosaves :

```sql
SELECT cleanup_old_autosaves();
```

### Monitoring
Pour surveiller l'utilisation :

```sql
-- Nombre d'autosaves par utilisateur
SELECT user_id, COUNT(*) 
FROM autosaves 
GROUP BY user_id;

-- Taille totale des autosaves
SELECT 
  pg_size_pretty(pg_total_relation_size('autosaves')) as table_size;
```

## Bonnes Pratiques

1. **Performance**: L'autosave utilise un debounce pour éviter trop de requêtes
2. **Sérialisation**: Toujours utiliser `JSON.stringify()` pour les objets complexes
3. **Nettoyage**: Toujours appeler `clearAutosave()` après une sauvegarde réussie
4. **Activation conditionnelle**: N'activer l'autosave que quand nécessaire (dialog ouvert, mode édition, etc.)

## Dépannage

### L'autosave ne fonctionne pas
1. Vérifier que `enabled` est à `true`
2. Vérifier que le contenu change (le hook ne sauvegarde que si le contenu est différent)
3. Vérifier la console pour les erreurs

### Autosaves non supprimées
1. S'assurer que `clearAutosave()` est bien appelé après la sauvegarde
2. Vérifier que l'utilisateur est authentifié
3. Vérifier les permissions RLS dans Supabase

## Support

Pour toute question ou problème, consultez :
- Le code source dans `src/hooks/useAutosave.ts`
- Le service dans `src/lib/supabase-autosave.ts`
- La migration dans `supabase/migrations/create_autosaves_table.sql`
