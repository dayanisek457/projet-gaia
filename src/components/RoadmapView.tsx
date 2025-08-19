import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';
import { Calendar, Clock, FileText, Image as ImageIcon, ExternalLink } from 'lucide-react';

interface RoadmapEntry {
  id: string;
  title: string;
  description: string;
  content?: string;
  image_url?: string;
  attached_files: any[];
  entry_date: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const RoadmapView = () => {
  const [entries, setEntries] = useState<RoadmapEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<RoadmapEntry | null>(null);

  const fetchPublishedEntries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('roadmap_entries')
        .select('*')
        .eq('is_published', true)
        .order('entry_date', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error: any) {
      console.error('Error fetching roadmap entries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishedEntries();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Aujourd'hui";
    if (diffInDays === 1) return "Hier";
    if (diffInDays < 30) return `Il y a ${diffInDays} jours`;
    if (diffInDays < 365) return `Il y a ${Math.floor(diffInDays / 30)} mois`;
    return `Il y a ${Math.floor(diffInDays / 365)} an${Math.floor(diffInDays / 365) > 1 ? 's' : ''}`;
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Chargement de la roadmap...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="roadmap" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Roadmap du Projet GAIA
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez les derniers progrès et développements de notre projet de reforestation innovant.
              Suivez notre parcours vers un avenir plus vert.
            </p>
          </div>

          {/* Timeline */}
          {entries.length === 0 ? (
            <Card className="text-center p-8">
              <CardContent>
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Roadmap en construction</h3>
                <p className="text-muted-foreground">
                  Nous préparons du contenu passionnant à partager avec vous. Revenez bientôt!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {entries.map((entry, index) => (
                <div key={entry.id} className="relative animate-slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Timeline connector */}
                  {index !== entries.length - 1 && (
                    <div className="absolute left-8 top-24 w-0.5 h-16 bg-gradient-to-b from-primary to-primary/30"></div>
                  )}
                  
                  <div className="flex items-start space-x-6">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                      <Calendar className="h-8 w-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-3">
                                <CardTitle className="text-xl">{entry.title}</CardTitle>
                                <Badge className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{getTimeAgo(entry.entry_date)}</span>
                                </Badge>
                              </div>
                              <CardDescription className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(entry.entry_date)}</span>
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {entry.description}
                          </p>

                          {/* Image */}
                          {entry.image_url && (
                            <div className="mb-6">
                              <img
                                src={entry.image_url}
                                alt={entry.title}
                                className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => window.open(entry.image_url, '_blank')}
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                          )}

                          {/* Attached Files */}
                          {entry.attached_files && entry.attached_files.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-medium mb-3 flex items-center space-x-2">
                                <FileText className="h-4 w-4" />
                                <span>Fichiers joints:</span>
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {entry.attached_files.map((file: any, fileIndex: number) => (
                                  <Button
                                    key={fileIndex}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center space-x-2"
                                    onClick={() => window.open(file.url, '_blank')}
                                  >
                                    <FileText className="h-3 w-3" />
                                    <span>{file.name}</span>
                                    <ExternalLink className="h-3 w-3" />
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Read More Button */}
                          {entry.content && entry.content.trim() && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" className="mt-2">
                                  Lire la suite
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>{entry.title}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(entry.entry_date)}</span>
                                  </div>
                                  
                                  {entry.image_url && (
                                    <img
                                      src={entry.image_url}
                                      alt={entry.title}
                                      className="w-full h-64 object-cover rounded-lg"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                  )}
                                  
                                  <div className="prose prose-sm max-w-none">
                                    <p className="whitespace-pre-wrap">{entry.content}</p>
                                  </div>

                                  {entry.attached_files && entry.attached_files.length > 0 && (
                                    <div>
                                      <h4 className="font-medium mb-2 flex items-center space-x-2">
                                        <FileText className="h-4 w-4" />
                                        <span>Fichiers joints:</span>
                                      </h4>
                                      <div className="flex flex-wrap gap-2">
                                        {entry.attached_files.map((file: any, fileIndex: number) => (
                                          <Button
                                            key={fileIndex}
                                            variant="outline"
                                            size="sm"
                                            className="flex items-center space-x-2"
                                            onClick={() => window.open(file.url, '_blank')}
                                          >
                                            <FileText className="h-3 w-3" />
                                            <span>{file.name}</span>
                                            <ExternalLink className="h-3 w-3" />
                                          </Button>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Suivez notre progression</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Le projet GAIA évolue constamment. Cette roadmap sera régulièrement mise à jour 
                  avec nos dernières avancées, découvertes et étapes importantes.
                </p>
                <div className="flex justify-center space-x-4">
                  <Badge variant="outline" className="px-4 py-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    Mis à jour régulièrement
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Contenu multimédia
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapView;