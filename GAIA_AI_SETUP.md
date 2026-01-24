# Gaia AI Chatbot - Guide de Configuration

## Vue d'ensemble

Gaia AI est un chatbot intelligent qui utilise l'API Groq pour répondre aux questions sur le Projet Gaia. Le chatbot a accès à toute la documentation et la roadmap du projet pour fournir des réponses précises et contextuelles.

## Architecture

- **Frontend**: Page React avec interface de chat en temps réel
- **Backend**: Supabase Edge Function qui gère les appels à l'API Groq
- **API**: Groq API avec le modèle `deepseek/deepseek-r1-distill-llama-70b`
- **Streaming**: Support du streaming SSE (Server-Sent Events) pour des réponses en temps réel

## Configuration

### 1. Obtenir une clé API Groq

1. Créez un compte sur [Groq Console](https://console.groq.com/)
2. Générez une clé API dans la section API Keys
3. Copiez la clé (elle commence par `gsk_...`)

### 2. Déployer l'Edge Function

L'Edge Function se trouve dans `supabase/functions/gaia-chat/index.ts`.

#### Méthode 1: Via Supabase CLI (Recommandé)

```bash
# Installer Supabase CLI si ce n'est pas déjà fait
npm install -g supabase

# Se connecter à Supabase
supabase login

# Lier votre projet
supabase link --project-ref <votre-project-ref>

# Déployer la fonction
supabase functions deploy gaia-chat
```

#### Méthode 2: Via le Dashboard Supabase

1. Allez dans votre projet Supabase
2. Naviguez vers "Edge Functions"
3. Cliquez sur "Create a new function"
4. Nommez-la `gaia-chat`
5. Copiez le contenu de `supabase/functions/gaia-chat/index.ts`
6. Cliquez sur "Deploy"

### 3. Configurer le Secret GROQ_API_KEY

Le secret `GROQ_API_KEY` doit être configuré dans Supabase pour que l'Edge Function puisse communiquer avec l'API Groq.

#### Via Supabase CLI

```bash
# Définir le secret
supabase secrets set GROQ_API_KEY=gsk_votre_cle_api_ici

# Vérifier que le secret est bien défini
supabase secrets list
```

#### Via le Dashboard Supabase

1. Allez dans votre projet Supabase
2. Naviguez vers "Edge Functions" → "Manage Secrets"
3. Cliquez sur "Add Secret"
4. Nom: `GROQ_API_KEY`
5. Valeur: Votre clé API Groq
6. Cliquez sur "Save"

### 4. Variables d'environnement (Frontend)

Aucune variable d'environnement supplémentaire n'est nécessaire pour le frontend si vous utilisez déjà Supabase. Le client utilise automatiquement:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Ces variables doivent déjà être configurées dans votre fichier `.env`.

## Utilisation

### Accéder au Chatbot

Le chatbot est accessible à l'URL: `http://localhost:8080/gaia-ai` (en développement) ou `/gaia-ai` sur votre domaine de production.

### Fonctionnalités

- **Streaming en temps réel**: Les réponses apparaissent progressivement
- **Contexte complet**: Accès à toute la documentation et la roadmap
- **Historique de conversation**: Les 5 derniers messages sont conservés pour le contexte
- **Interface intuitive**: Design moderne avec support du markdown
- **Langue française**: Toutes les interactions sont en français

### Exemples de questions

- "Qu'est-ce que le Projet Gaia ?"
- "Quelles sont les technologies utilisées ?"
- "Montre-moi les éléments de la roadmap en cours"
- "Comment construire l'application Android ?"
- "Quelles sont les fonctionnalités principales ?"

## Architecture Technique

### Flux de données

```
Utilisateur → Frontend (React)
     ↓
     Envoie message
     ↓
Edge Function (Supabase)
     ↓
     Charge le contexte (Documentation + Roadmap)
     ↓
     Appelle Groq API avec streaming
     ↓
     Retourne le stream SSE
     ↓
Frontend reçoit et affiche progressivement
```

### Sécurité

- La clé API Groq est stockée côté serveur (Edge Function)
- Pas d'exposition de la clé dans le code frontend
- Utilisation de l'authentification Supabase pour les appels Edge Functions
- Support CORS configuré pour les domaines autorisés

### Performance

- **Cache du contexte**: Le contexte (documentation + roadmap) est mis en cache pendant 5 minutes
- **Streaming**: Réponses progressives pour une meilleure UX
- **Limitation de l'historique**: Seulement les 5 derniers messages sont envoyés à l'API

## Dépannage

### L'Edge Function ne répond pas

1. Vérifiez que la fonction est bien déployée:
   ```bash
   supabase functions list
   ```

2. Vérifiez les logs de la fonction:
   ```bash
   supabase functions logs gaia-chat
   ```

3. Testez la fonction directement:
   ```bash
   curl -X POST https://<project-ref>.supabase.co/functions/v1/gaia-chat \
     -H "Authorization: Bearer <anon-key>" \
     -H "Content-Type: application/json" \
     -d '{"messages":[{"role":"user","content":"Bonjour"}]}'
   ```

### Erreur "GROQ_API_KEY is not configured"

Le secret n'est pas défini correctement. Suivez les étapes de la section 3 pour configurer le secret.

### Le streaming ne fonctionne pas

1. Vérifiez la console du navigateur pour des erreurs
2. Assurez-vous que le modèle Groq supporte le streaming
3. Vérifiez que l'Edge Function retourne bien les headers SSE

### Le contexte ne se charge pas

1. Vérifiez que la documentation et la roadmap sont publiées dans Supabase
2. Vérifiez les permissions RLS (Row Level Security) sur les tables
3. Consultez la console du navigateur pour des erreurs

## Développement

### Tester localement l'Edge Function

```bash
# Démarrer le serveur local Supabase
supabase start

# Servir la fonction localement
supabase functions serve gaia-chat --env-file .env.local

# Tester avec curl
curl -X POST http://localhost:54321/functions/v1/gaia-chat \
  -H "Authorization: Bearer <anon-key>" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Test"}]}'
```

### Modifier le modèle Groq

Pour changer le modèle utilisé, éditez `supabase/functions/gaia-chat/index.ts` et modifiez la ligne:

```typescript
model: 'deepseek/deepseek-r1-distill-llama-70b',
```

Modèles disponibles:
- `llama-3.3-70b-versatile`
- `deepseek/deepseek-r1-distill-llama-70b`
- `mixtral-8x7b-32768`
- Etc. (voir [Groq Models](https://console.groq.com/docs/models))

### Modifier le contexte système

Le contexte système est construit dans `src/lib/gaia-context.ts`. Vous pouvez le personnaliser pour ajouter plus d'informations ou changer le comportement du chatbot.

## Limitations

- **Tokens**: Maximum 2048 tokens par réponse
- **Historique**: Les 5 derniers messages sont gardés en contexte
- **Cache**: Le contexte est mis en cache pendant 5 minutes
- **Rate Limiting**: Dépend de votre plan Groq (gratuit ou payant)

## Support

Pour toute question ou problème, consultez:
- [Documentation Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Documentation Groq API](https://console.groq.com/docs)
- [Documentation du Projet Gaia](./README.md)
