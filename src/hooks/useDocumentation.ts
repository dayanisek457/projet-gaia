import { useState, useEffect } from 'react';

export interface DocSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'rich' | 'accordion' | 'table' | 'callout' | 'checklist';
  data?: any;
  order: number;
  isPublished: boolean;
}

const STORAGE_KEY = 'gaia-documentation';

// Initial documentation data
const initialSections: DocSection[] = [
  {
    id: 'overview',
    title: 'Vue d\'ensemble du Projet GAIA',
    content: `# Projet GAIA - Reforestation Intelligente

Le projet **GAIA** révolutionne la reforestation grâce à l'**intelligence artificielle** et aux *technologies de pointe*.

## Objectifs Principaux

- Optimiser les techniques de reforestation
- Utiliser l'IA pour l'analyse des terrains
- Surveiller les plantations par drones
- Améliorer les taux de survie des arbres

---

> **INFO**: Innovation Technologique
> 
> Ce projet combine IoT, IA et surveillance aérienne pour une approche holistique de la reforestation.

### Technologies Utilisées

1. **Intelligence Artificielle** pour l'analyse de terrain
2. **Internet des Objets (IoT)** pour le monitoring
3. **Surveillance par drones** pour le suivi aérien

<details>
<summary>Plus de détails techniques</summary>

Notre approche utilise des algorithmes d'apprentissage automatique pour analyser les données environnementales et optimiser les stratégies de plantation.

</details>`,
    type: 'rich',
    order: 1,
    isPublished: true
  },
  {
    id: 'features',
    title: 'Fonctionnalités Principales',
    content: '',
    type: 'accordion',
    data: {
      items: [
        {
          id: 'ai-analysis',
          title: 'Analyse IA du Terrain',
          content: 'Notre système d\'intelligence artificielle analyse les conditions du sol, la topographie, et les conditions climatiques pour optimiser la plantation.'
        },
        {
          id: 'drone-monitoring',
          title: 'Surveillance par Drones',
          content: 'Des drones équipés de capteurs IoT surveillent en temps réel la croissance des arbres et l\'état de santé de la forêt.'
        },
        {
          id: 'species-selection',
          title: 'Sélection d\'Espèces Optimale',
          content: 'Algorithmes avancés pour sélectionner les espèces d\'arbres les plus adaptées à chaque zone géographique.'
        }
      ]
    },
    order: 2,
    isPublished: true
  },
  {
    id: 'specifications',
    title: 'Spécifications Techniques',
    content: '',
    type: 'table',
    data: {
      headers: ['Composant', 'Technologie', 'Performance', 'Statut'],
      rows: [
        ['Capteurs IoT', 'LoRaWAN', '10km de portée', 'Déployé'],
        ['Analyse IA', 'TensorFlow', '95% précision', 'En développement'],
        ['Drones', 'Autonomie 2h', '50ha couverture', 'Test pilote'],
        ['Application Mobile', 'React Native', 'iOS/Android', 'Beta']
      ]
    },
    order: 3,
    isPublished: true
  },
  {
    id: 'alerts',
    title: 'Informations Importantes',
    content: '',
    type: 'callout',
    data: {
      callouts: [
        {
          type: 'info',
          title: 'Information',
          content: 'Ce projet est développé dans le cadre du programme d\'innovation écologique du lycée Saint-Joseph.'
        },
        {
          type: 'warning',
          title: 'Attention',
          content: 'Les données de surveillance en temps réel nécessitent une connexion internet stable.'
        },
        {
          type: 'success',
          title: 'Succès',
          content: 'Premier déploiement réussi sur 10 hectares avec 98% de taux de survie des plants.'
        }
      ]
    },
    order: 4,
    isPublished: true
  },
  {
    id: 'roadmap',
    title: 'Feuille de Route',
    content: '',
    type: 'checklist',
    data: {
      items: [
        { id: 1, text: 'Développement du prototype IA', completed: true },
        { id: 2, text: 'Tests sur terrain pilote', completed: true },
        { id: 3, text: 'Intégration des capteurs IoT', completed: false },
        { id: 4, text: 'Déploiement des drones de surveillance', completed: false },
        { id: 5, text: 'Lancement de l\'application mobile', completed: false },
        { id: 6, text: 'Expansion à 100 hectares', completed: false }
      ]
    },
    order: 5,
    isPublished: true
  }
];

export const useDocumentation = () => {
  const [sections, setSections] = useState<DocSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedSections = JSON.parse(stored);
        setSections(parsedSections);
      } else {
        setSections(initialSections);
        saveSections(initialSections);
      }
    } catch (error) {
      console.error('Error loading documentation:', error);
      setSections(initialSections);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSections = (newSections: DocSection[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSections));
      setSections(newSections);
      return true;
    } catch (error) {
      console.error('Error saving documentation:', error);
      return false;
    }
  };

  const getPublishedSections = () => {
    return sections
      .filter(section => section.isPublished)
      .sort((a, b) => a.order - b.order);
  };

  const getAllSections = () => {
    return sections.sort((a, b) => a.order - b.order);
  };

  const getSectionById = (id: string) => {
    return sections.find(section => section.id === id);
  };

  const updateSection = (updatedSection: DocSection) => {
    const newSections = sections.map(section => 
      section.id === updatedSection.id ? updatedSection : section
    );
    return saveSections(newSections);
  };

  const createSection = (section: Omit<DocSection, 'id'>) => {
    const newSection: DocSection = {
      ...section,
      id: Date.now().toString(),
      order: Math.max(...sections.map(s => s.order), 0) + 1
    };
    const newSections = [...sections, newSection];
    return saveSections(newSections) ? newSection : null;
  };

  const deleteSection = (id: string) => {
    const newSections = sections.filter(section => section.id !== id);
    return saveSections(newSections);
  };

  const togglePublish = (id: string) => {
    const section = sections.find(s => s.id === id);
    if (section) {
      const updatedSection = { ...section, isPublished: !section.isPublished };
      return updateSection(updatedSection);
    }
    return false;
  };

  const reorderSections = (reorderedSections: DocSection[]) => {
    const sectionsWithOrder = reorderedSections.map((section, index) => ({
      ...section,
      order: index + 1
    }));
    return saveSections(sectionsWithOrder);
  };

  return {
    sections: getAllSections(),
    publishedSections: getPublishedSections(),
    isLoading,
    getSectionById,
    updateSection,
    createSection,
    deleteSection,
    togglePublish,
    reorderSections,
    refreshSections: loadSections
  };
};