// Service to build context for Gaia AI from documentation and roadmap
import { documentationService } from './supabase-documentation';
import { roadmapService } from './supabase-roadmap';

class GaiaContextService {
  private cachedContext: string | null = null;
  private lastUpdated: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

  /**
   * Build the complete context for Gaia AI
   * Includes documentation and roadmap information
   */
  async buildContext(): Promise<string> {
    // Return cached context if still valid
    if (this.cachedContext && Date.now() - this.lastUpdated < this.CACHE_DURATION) {
      return this.cachedContext;
    }

    try {
      // Fetch documentation and roadmap in parallel
      const [docSections, roadmapItems] = await Promise.all([
        documentationService.getPublishedSections(),
        roadmapService.getAllItems(),
      ]);

      // Build context string
      let context = `# Projet Gaia - Lycée Saint Joseph Dijon

## À propos du Projet Gaia

### Vue d'ensemble
Le Projet Gaia est un projet innovant de reforestation intelligente développé par des élèves de Sciences de l'Ingénieur du Lycée Saint-Joseph à Dijon pour l'année 2025-2026. 

**Slogan**: "L'avenir de la reforestation intelligente"

### Problématique
Comment utiliser les technologies aériennes pour accélérer la reforestation et restaurer durablement les écosystèmes dégradés face à l'urgence climatique mondiale ?

### La Solution Gaia
Un avion électrique radiocommandé pour accélérer la reforestation mondiale et restaurer durablement nos écosystèmes.

**Description technique**: Un avion 100% électrique intelligent avec batterie haute capacité, muni d'une soute pour larguer des Seedballs (billes de graines enrobées).

### Défis environnementaux adressés

1. **Déforestation massive**
   - Le Sahara avance de 5-10 km/an dans les forêts tropicales
   - Perte continue de biodiversité

2. **Montée des eaux**
   - Plus d'1 milliard de personnes devront migrer d'ici 2050
   - Impact sur les populations côtières

3. **Dérèglement climatique**
   - Urgence d'agir face aux changements globaux
   - Nécessité de solutions rapides et efficaces

4. **Solutions coûteuses**
   - Méthodes actuelles onéreuses et polluantes
   - Besoin d'alternatives économiques et écologiques

### Avantages du Projet Gaia

**Économiques**:
- Coûts réduits : 60 000€ pour 50 000 arbres
- Coût par arbre : ~1,20€
- Économie de 90% vs avion commercial (500 000€)
- Réduction de 85% vs hélicoptère (400 000€)

**Écologiques**:
- Empreinte carbone minimale (100% électrique)
- Pas de pollution sonore
- Respectueux de la faune locale
- Contribution directe à la lutte contre le changement climatique

**Techniques**:
- Précision GPS du largage
- Autonomie de vol étendue
- Maintenance simplifiée
- Technologie accessible et reproductible

**Sociaux**:
- Création d'emplois locaux
- Formation des communautés
- Sensibilisation environnementale
- Projet éducatif et inspirant

### Spécifications Techniques

**Avion**:
- Type: Avion électrique radiocommandé
- Motorisation: 100% électrique
- Batterie: Haute capacité pour autonomie optimale
- Soute: Système de largage de Seedballs
- Guidage: GPS précis
- Contrôle: Radiocommandé

**Seedballs**:
- Graines enrobées d'un mélange protecteur
- Conception pour favoriser la germination
- Adaptation aux terrains difficiles
- Protection contre les prédateurs

### Technologies de l'Application Web

- **Frontend**: React 18, TypeScript, Vite 5, Tailwind CSS, shadcn/ui
- **Backend**: Supabase, PostgreSQL avec Row Level Security
- **Mobile**: Capacitor 6, Android SDK
- **Déploiement**: Vercel pour le web, APK pour Android

### Fonctionnalités de l'Application

1. **Page d'accueil**: Présentation du projet, équipe, contact
2. **Documentation**: Système de documentation interactive avec différents types de contenu
3. **Roadmap**: Affichage de la feuille de route du projet avec statuts
4. **Galerie**: Ressources images et médias du projet
5. **Partenaires**: Liste des sponsors et partenaires
6. **Mode Présentation**: Présentation en plein écran avec slides
7. **Admin**: Interface d'administration complète
8. **Gaia AI**: Chatbot intelligent (cette fonctionnalité!)

### Équipe et Contact

**Établissement**: Lycée Saint-Joseph Dijon
**Filière**: Sciences de l'Ingénieur
**Année**: 2025-2026
**Instagram**: @projet_gaia_stjo

### Application Mobile

Une application Android est disponible en téléchargement (APK).
- Support: Android 6.0+ (API 23)
- Target: Android 15 (API 35)
- Taille: ~17 MB

## Documentation du Projet

`;

      // Add documentation sections
      if (docSections.length > 0) {
        for (const section of docSections) {
          context += `### ${section.title}\n\n`;
          context += `${section.content}\n\n`;
          
          // Add data if available
          if (section.data) {
            if (section.type === 'table' && section.data.headers && section.data.rows) {
              context += `**Tableau:**\n`;
              context += `Colonnes: ${section.data.headers.join(', ')}\n`;
              context += `Données: ${section.data.rows.length} lignes\n\n`;
            } else if (section.type === 'checklist' && section.data.items) {
              context += `**Liste de vérification:**\n`;
              section.data.items.forEach((item: { checked: boolean; text: string }) => {
                context += `- [${item.checked ? 'x' : ' '}] ${item.text}\n`;
              });
              context += '\n';
            }
          }
        }
      } else {
        context += `*Aucune documentation publiée disponible.*\n\n`;
      }

      // Add roadmap information
      context += `## Roadmap du Projet\n\n`;
      
      if (roadmapItems.length > 0) {
        for (const item of roadmapItems) {
          const statusText = item.status === 'completed' ? 'Terminé' : 
                           item.status === 'in-progress' ? 'En cours' : 
                           'Planifié';
          
          context += `### ${item.title} (${statusText})\n\n`;
          context += `**Description:** ${item.description}\n\n`;
          
          if (item.timeline) {
            context += `**Timeline:** ${item.timeline}\n\n`;
          }
          
          if (item.content) {
            context += `**Détails:**\n${item.content}\n\n`;
          }
          
          if (item.files && item.files.length > 0) {
            context += `**Fichiers attachés:** ${item.files.length} fichier(s)\n\n`;
          }
          
          context += `---\n\n`;
        }
      } else {
        context += `*Aucun élément de roadmap disponible.*\n\n`;
      }

      // Add general project information
      context += `## Informations Générales

### Fonctionnalités Principales
- **Interface d'Administration**: Gestion de la documentation, roadmap, tâches, sponsors et galerie
- **Documentation Interactive**: Système de documentation avec différents types de contenu (texte, accordéon, tableaux, etc.)
- **Roadmap Visuelle**: Affichage de la roadmap du projet avec statuts et fichiers attachés
- **Galerie de Ressources**: Gestion d'images et de ressources pour le projet
- **Support Mobile**: Application Android via Capacitor
- **Sauvegarde Automatique**: Système d'autosave pour éviter la perte de données dans l'interface admin

### Scripts de Développement
- \`npm run dev\` - Démarre le serveur de développement (port 8080)
- \`npm run build\` - Build de production
- \`npm run lint\` - Vérification du code
- \`npm run android:build\` - Construit l'APK Android

### Configuration
Le projet utilise des variables d'environnement pour Supabase et S3:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- Variables S3 pour le stockage de fichiers

---

**Note**: Tu es Gaia AI, un assistant intelligent spécialisé dans le Projet Gaia. Tu dois répondre en français et fournir des informations précises basées sur cette documentation. Si tu ne trouves pas d'information dans le contexte fourni, dis-le clairement.
`;

      // Cache the context
      this.cachedContext = context;
      this.lastUpdated = Date.now();

      return context;
    } catch (error) {
      console.error('Error building context:', error);
      throw error;
    }
  }

  /**
   * Clear the cached context
   */
  clearCache(): void {
    this.cachedContext = null;
    this.lastUpdated = 0;
  }
}

// Export singleton instance
export const gaiaContextService = new GaiaContextService();
