import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, Calendar, Eye, EyeOff, RefreshCw } from 'lucide-react';
import RoadmapForm from './RoadmapForm';

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

const RoadmapManagement = () => {
  const [entries, setEntries] = useState<RoadmapEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingEntry, setEditingEntry] = useState<RoadmapEntry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('roadmap_entries')
        .select('*')
        .order('entry_date', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error: any) {
      console.error('Error fetching roadmap entries:', error);
      setError('Erreur lors du chargement des entrées de roadmap');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette entrée ?')) return;

    try {
      const { error } = await supabase
        .from('roadmap_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchEntries();
      alert('Entrée supprimée avec succès');
    } catch (error: any) {
      console.error('Error deleting entry:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('roadmap_entries')
        .update({ is_published: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      await fetchEntries();
      alert(`Entrée ${!currentStatus ? 'publiée' : 'dépubliée'} avec succès`);
    } catch (error: any) {
      console.error('Error toggling publish status:', error);
      alert('Erreur lors de la modification du statut');
    }
  };

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
    setEditingEntry(null);
    fetchEntries();
  };

  const startEdit = (entry: RoadmapEntry) => {
    setEditingEntry(entry);
    setIsDialogOpen(true);
  };

  const startCreate = () => {
    setEditingEntry(null);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin mr-2" />
        <span>Chargement des entrées de roadmap...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestion de la Roadmap</h2>
          <p className="text-muted-foreground">
            Gérez les entrées de la roadmap du projet GAIA
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={startCreate} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Nouvelle entrée</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEntry ? 'Modifier l\'entrée' : 'Nouvelle entrée de roadmap'}
              </DialogTitle>
            </DialogHeader>
            <RoadmapForm 
              entry={editingEntry} 
              onSuccess={handleFormSuccess}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        {entries.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucune entrée de roadmap trouvée</p>
              <Button onClick={startCreate} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Créer la première entrée
              </Button>
            </CardContent>
          </Card>
        ) : (
          entries.map((entry) => (
            <Card key={entry.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-xl">{entry.title}</CardTitle>
                      <Badge variant={entry.is_published ? "default" : "secondary"}>
                        {entry.is_published ? "Publié" : "Brouillon"}
                      </Badge>
                    </div>
                    <CardDescription>
                      {new Date(entry.entry_date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </CardDescription>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePublish(entry.id, entry.is_published)}
                    >
                      {entry.is_published ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(entry)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(entry.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4">{entry.description}</p>
                
                {entry.image_url && (
                  <div className="mb-4">
                    <img
                      src={entry.image_url}
                      alt={entry.title}
                      className="w-full h-48 object-cover rounded-md"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                {entry.attached_files && entry.attached_files.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {entry.attached_files.map((file: any, index: number) => (
                      <Badge key={index} variant="outline">
                        📎 {file.name || `Fichier ${index + 1}`}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="text-sm text-muted-foreground">
                  Créé le {new Date(entry.created_at).toLocaleDateString('fr-FR')}
                  {entry.updated_at !== entry.created_at && (
                    <span> • Modifié le {new Date(entry.updated_at).toLocaleDateString('fr-FR')}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default RoadmapManagement;