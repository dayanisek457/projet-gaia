import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Image as ImageIcon, ExternalLink, Video } from 'lucide-react';
import { s3Manager } from '@/lib/s3-direct';
import { roadmapService, type RoadmapItem } from '@/lib/supabase-roadmap';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Roadmap = () => {
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      await loadRoadmapItems();
      
      // Subscribe to real-time changes
      const subscription = roadmapService.subscribeToChanges((updatedItems) => {
        setRoadmapItems(updatedItems);
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
      setRoadmapItems(items);
    } catch (error) {
      console.error('Error loading roadmap items:', error);
      toast.error('Erreur lors du chargement de la roadmap');
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = async (fileName: string) => {
    try {
      const fileUrl = await s3Manager.getFileUrl(fileName);
      window.open(fileUrl, '_blank');
      toast.success(`Ouverture du fichier: ${fileName.split('-').pop() || fileName}`);
    } catch (error) {
      console.error('Error opening file:', error);
      
      try {
        const fallbackUrl = `https://mvtlxvxywbdjkzcouyrn.supabase.co/storage/v1/object/public/global/${fileName}`;
        window.open(fallbackUrl, '_blank');
        toast.success(`Ouverture du fichier: ${fileName.split('-').pop() || fileName}`);
      } catch (fallbackError) {
        toast.error('Impossible d\'ouvrir le fichier.');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'planned':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
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

  const renderMarkdownContent = (content?: string) => {
    if (!content) return null;

    // Enhanced markdown-to-HTML conversion with video support
    let html = content
      // Headers
      .replace(/### (.*)/g, '<h3 class="text-xl font-semibold mb-3 mt-6 text-gray-900">$1</h3>')
      .replace(/## (.*)/g, '<h2 class="text-2xl font-semibold mb-4 mt-8 text-gray-900">$1</h2>')
      .replace(/# (.*)/g, '<h1 class="text-3xl font-bold mb-6 mt-10 text-gray-900">$1</h1>')
      
      // Text formatting
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/<u>(.*?)<\/u>/g, '<span class="underline">$1</span>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">$1</code>')
      
      // Lists
      .replace(/^- \[ \] (.*)$/gm, '<div class="flex items-center space-x-2 my-2"><input type="checkbox" disabled class="rounded border-gray-300"> <span>$1</span></div>')
      .replace(/^- \[x\] (.*)$/gm, '<div class="flex items-center space-x-2 my-2"><input type="checkbox" checked disabled class="rounded border-gray-300"> <span class="line-through text-gray-500">$1</span></div>')
      .replace(/^- (.*)$/gm, '<li class="ml-6 my-1 list-disc">$1</li>')
      .replace(/^[0-9]+\. (.*)$/gm, '<li class="ml-6 my-1 list-decimal">$1</li>')
      
      // Quotes
      .replace(/^> (.*)$/gm, '<blockquote class="border-l-4 border-primary pl-4 italic text-gray-600 my-4 py-2">$1</blockquote>')
      
      // Separators
      .replace(/^---$/gm, '<hr class="my-8 border-gray-200">')
      
      // Callouts
      .replace(/^> \*\*INFO\*\*: (.*)$/gm, '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg"><div class="flex items-start"><div class="flex-shrink-0 text-2xl mr-3">ℹ️</div><div><h4 class="text-sm font-semibold text-blue-900 mb-1">Information</h4><p class="text-sm text-blue-800">$1</p></div></div></div>')
      .replace(/^> \*\*WARNING\*\*: (.*)$/gm, '<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded-r-lg"><div class="flex items-start"><div class="flex-shrink-0 text-2xl mr-3">⚠️</div><div><h4 class="text-sm font-semibold text-yellow-900 mb-1">Attention</h4><p class="text-sm text-yellow-800">$1</p></div></div></div>')
      .replace(/^> \*\*SUCCESS\*\*: (.*)$/gm, '<div class="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded-r-lg"><div class="flex items-start"><div class="flex-shrink-0 text-2xl mr-3">✅</div><div><h4 class="text-sm font-semibold text-green-900 mb-1">Succès</h4><p class="text-sm text-green-800">$1</p></div></div></div>')
      
      // Accordions/Details
      .replace(/<details>([\s\S]*?)<\/details>/g, (match, content) => {
        const summaryMatch = content.match(/<summary>(.*?)<\/summary>/);
        const summary = summaryMatch ? summaryMatch[1] : 'Détails';
        const actualContent = content.replace(/<summary>.*?<\/summary>/, '').trim();
        return `<details class="border border-gray-200 rounded-lg p-4 my-6 bg-white"><summary class="font-semibold cursor-pointer hover:text-primary text-gray-900">${summary}</summary><div class="mt-4 pt-4 border-t border-gray-100">${actualContent}</div></details>`;
      });

    // Handle YouTube embeds (convert YouTube links to embeds)
    html = html.replace(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/g, 
      '<div class="my-6 rounded-lg overflow-hidden shadow-lg"><iframe width="100%" height="400" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full"></iframe></div>');
    
    // Handle Vimeo embeds
    html = html.replace(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/([0-9]+)/g, 
      '<div class="my-6 rounded-lg overflow-hidden shadow-lg"><iframe width="100%" height="400" src="https://player.vimeo.com/video/$1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen class="w-full"></iframe></div>');

    // Images - before links to prevent conflict
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, 
      '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg shadow-md my-6" loading="lazy" />');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, 
      '<a href="$2" target="_blank" class="text-primary hover:text-primary/80 underline font-medium">$1</a>');
    
    // Line breaks
    html = html.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');

    return (
      <div 
        className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Roadmap du Projet GAIA
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Découvrez les étapes clés du développement de GAIA, notre solution innovante de reforestation autonome. 
            Suivez notre progression et les prochaines fonctionnalités à venir.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Chargement de la roadmap...</p>
            </div>
          </div>
        ) : roadmapItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <Calendar className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Roadmap en construction</h2>
              <p className="text-gray-600">
                Notre roadmap sera bientôt disponible. Revenez prochainement pour découvrir nos plans et objectifs.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/70 to-secondary hidden md:block"></div>
              
              <div className="space-y-16">
                {roadmapItems.map((item, index) => (
                  <div key={item.id} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-5 h-5 bg-white border-4 border-primary rounded-full z-10 shadow-lg hidden md:block"></div>
                    
                    {/* Content Card */}
                    <div className="md:ml-24">
                      <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-primary/30 bg-white">
                        <CardHeader className="pb-4">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-2">
                            <CardTitle className="text-2xl font-bold text-gray-900 flex-1">
                              {item.title}
                            </CardTitle>
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <Badge className={`${getStatusColor(item.status)} border font-medium px-3 py-1`}>
                                {getStatusText(item.status)}
                              </Badge>
                              <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                                <Calendar className="w-4 h-4 mr-2" />
                                {item.timeline}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 text-base leading-relaxed mt-2">{item.description}</p>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          {/* Markdown Content */}
                          {item.content && (
                            <div className="mb-6 bg-gray-50 rounded-lg p-6 border border-gray-100">
                              {renderMarkdownContent(item.content)}
                            </div>
                          )}
                          
                          {/* Files */}
                          {item.files && item.files.length > 0 && (
                            <div className="space-y-3 pt-4 border-t border-gray-100">
                              <h4 className="font-semibold text-sm text-gray-900 flex items-center">
                                <FileText className="w-4 h-4 mr-2" />
                                Fichiers et ressources associés
                              </h4>
                              <div className="flex flex-wrap gap-3">
                                {item.files.map((fileName, fileIndex) => (
                                  <Button
                                    key={fileIndex}
                                    variant="outline"
                                    size="sm"
                                    className="h-10 px-4 text-sm hover:bg-primary hover:text-white transition-colors"
                                    onClick={() => handleFileClick(fileName)}
                                  >
                                    {fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                      <ImageIcon className="w-4 h-4 mr-2" />
                                    ) : fileName.match(/\.(mp4|avi|mov|webm)$/i) ? (
                                      <Video className="w-4 h-4 mr-2" />
                                    ) : (
                                      <FileText className="w-4 h-4 mr-2" />
                                    )}
                                    {fileName.split('-').pop() || fileName}
                                    <ExternalLink className="w-3 h-3 ml-2" />
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Roadmap;
