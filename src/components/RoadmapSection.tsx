import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Image, ExternalLink } from 'lucide-react';
import { s3Manager } from '@/lib/s3-direct';
import { roadmapService, type RoadmapItem } from '@/lib/supabase-roadmap';
import { toast } from 'sonner';

const RoadmapSection = () => {
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      await loadRoadmapItems();
      
      // Subscribe to real-time changes
      const subscription = roadmapService.subscribeToChanges((updatedItems) => {
        setRoadmapItems(updatedItems.length > 0 ? updatedItems : getDefaultRoadmapData());
      });

      return () => {
        subscription?.unsubscribe();
      };
    };

    const cleanup = initializeData();
    
    return () => {
      cleanup.then(cleanupFn => cleanupFn?.());
    };
  }, []);

  const loadRoadmapItems = async () => {
    try {
      setLoading(true);
      const items = await roadmapService.getAllItems();
      // If no items exist in database, use default data for demo
      setRoadmapItems(items.length > 0 ? items : getDefaultRoadmapData());
    } catch (error) {
      console.error('Error loading roadmap items:', error);
      // Fallback to default data if Supabase fails
      setRoadmapItems(getDefaultRoadmapData());
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = async (fileName: string) => {
    try {
      // Generate signed URL for the file
      const fileUrl = await s3Manager.getFileUrl(fileName);
      
      // Open file in new tab
      window.open(fileUrl, '_blank');
      
      toast.success(`Ouverture du fichier: ${fileName.split('-').pop() || fileName}`);
    } catch (error) {
      console.error('Error opening file:', error);
      
      // Fallback: try to construct direct URL (for demo purposes)
      try {
        const fallbackUrl = `https://mvtlxvxywbdjkzcouyrn.supabase.co/storage/v1/object/public/global/${fileName}`;
        window.open(fallbackUrl, '_blank');
        toast.success(`Ouverture du fichier: ${fileName.split('-').pop() || fileName}`);
      } catch (fallbackError) {
        toast.error('Impossible d\'ouvrir le fichier. Le fichier n\'existe peut-être pas sur le serveur.');
      }
    }
  };

  const getDefaultRoadmapData = (): RoadmapItem[] => [
    {
      id: '1',
      title: 'Phase 1: Recherche et Développement',
      description: 'Recherche approfondie sur les technologies de reforestation autonome et développement des premiers prototypes de drones et capteurs.',
      timeline: 'Q1 2024',
      files: [],
      status: 'completed',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '2',
      title: 'Phase 2: Tests en Laboratoire',
      description: 'Tests des systèmes de plantation automatisée en environnement contrôlé. Optimisation des algorithmes de reconnaissance du terrain.',
      timeline: 'Q2 2024',
      files: [],
      status: 'completed',
      createdAt: '2024-04-01',
      updatedAt: '2024-04-01'
    },
    {
      id: '3',
      title: 'Phase 3: Prototypes de Terrain',
      description: 'Développement des premiers prototypes de drones de plantation et tests sur petites parcelles. Intégration des capteurs IoT.',
      timeline: 'Q3-Q4 2024',
      files: [],
      status: 'in-progress',
      createdAt: '2024-07-01',
      updatedAt: '2024-07-01'
    },
    {
      id: '4',
      title: 'Phase 4: Pilot Project',
      description: 'Lancement du premier projet pilote sur une zone déforestée de 100 hectares. Collaboration avec les autorités locales.',
      timeline: 'Q1-Q2 2025',
      files: [],
      status: 'planned',
      createdAt: '2024-10-01',
      updatedAt: '2024-10-01'
    },
    {
      id: '5',
      title: 'Phase 5: Déploiement à Grande Échelle',
      description: 'Expansion du projet vers plusieurs régions. Formation des équipes locales et transfert de technologie.',
      timeline: 'Q3-Q4 2025',
      files: [],
      status: 'planned',
      createdAt: '2024-12-01',
      updatedAt: '2024-12-01'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'in-progress':
        return 'En cours';
      case 'planned':
        return 'Planifié';
      default:
        return status;
    }
  };

  return (
    <section id="roadmap" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Roadmap du Projet
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les étapes clés du développement de GAIA, notre solution de reforestation autonome
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            <span className="ml-3 text-gray-600">Chargement de la roadmap...</span>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary"></div>
              
              <div className="space-y-12">
                {roadmapItems.map((item, index) => (
                  <div key={item.id} className="relative flex">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-4 h-4 bg-white border-4 border-primary rounded-full z-10"></div>
                    
                    {/* Content */}
                    <div className="ml-20 w-full">
                      <Card className="shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(item.status)}>
                                {getStatusText(item.status)}
                              </Badge>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="w-4 h-4 mr-1" />
                                {item.timeline}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 mb-4">{item.description}</p>
                          
                          {item.files && item.files.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="font-semibold text-sm text-gray-900">Fichiers associés:</h4>
                              <div className="flex flex-wrap gap-2">
                                {item.files.map((fileName, fileIndex) => (
                                  <Button
                                    key={fileIndex}
                                    variant="outline"
                                    size="sm"
                                    className="h-8 px-3 text-xs"
                                    onClick={() => handleFileClick(fileName)}
                                  >
                                    {fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                      <Image className="w-3 h-3 mr-1" />
                                    ) : (
                                      <FileText className="w-3 h-3 mr-1" />
                                    )}
                                    {fileName.split('-').pop() || fileName}
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RoadmapSection;