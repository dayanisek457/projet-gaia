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
Le Projet Gaia est une application web de reforestation intelligente développée pour le Lycée Saint Joseph à Dijon. 
C'est une application React + TypeScript + Vite avec une interface d'administration complète et un support Android.

### Technologies utilisées
- **Frontend**: React 18, TypeScript, Vite 5, Tailwind CSS, shadcn/ui
- **Backend**: Supabase, PostgreSQL avec Row Level Security
- **Mobile**: Capacitor 6, Android SDK

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
