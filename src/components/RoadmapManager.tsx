import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { s3Manager } from '@/lib/s3';
import { roadmapService, type RoadmapItem } from '@/lib/supabase-roadmap';
import RichTextEditor from '@/components/RichTextEditor';
import { useAutosave } from '@/hooks/useAutosave';
import { Upload, FileText, Image, Edit, Trash2, Plus, Calendar, Eye } from 'lucide-react';
import { toast } from 'sonner';

const RoadmapManager = () => {
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [editingItem, setEditingItem] = useState<RoadmapItem | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<Partial<RoadmapItem>>({
    title: '',
    description: '',
    content: '',
    timeline: '',
    status: 'planned',
    displayOrder: 1,
    files: []
  });

  // Autosave for form content - serialize the form data for autosave
  const formContentForAutosave = JSON.stringify(formData);
  const { clearAutosave } = useAutosave({
    entityType: 'roadmap',
    entityId: editingItem?.id || null,
    content: formContentForAutosave,
    enabled: showCreateDialog || showEditDialog, // Only autosave when dialog is open
  });

  useEffect(() => {
    loadRoadmapItems();
    
    // Subscribe to real-time changes
    const subscription = roadmapService.subscribeToChanges((updatedItems) => {
      setRoadmapItems(updatedItems);
    });

    return () => {
      subscription?.unsubscribe();
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileName = `roadmap-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${file.name}`;
        const actualFileName = await s3Manager.uploadFile(file, fileName);
        return actualFileName;
      });

      const fileNames = await Promise.all(uploadPromises);
      const newFiles = [...(formData.files || []), ...fileNames];
      setFormData(prev => ({ ...prev, files: newFiles }));
      
      toast.success(`${files.length} fichier(s) uploadé(s) avec succès`);
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Erreur lors de l\'upload des fichiers');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (fileIndex: number) => {
    const newFiles = [...(formData.files || [])];
    newFiles.splice(fileIndex, 1);
    setFormData(prev => ({ ...prev, files: newFiles }));
    toast.success('Fichier retiré');
  };

  const handleCreate = async () => {
    if (!formData.title || !formData.description) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      const newItem = await roadmapService.createItem({
        title: formData.title,
        description: formData.description,
        content: formData.content,
        timeline: formData.timeline || 'Non spécifié',
        status: formData.status || 'planned',
        displayOrder: formData.displayOrder || 1,
        files: formData.files || []
      });

      // Clear autosave after successful creation
      await clearAutosave();
      
      setShowCreateDialog(false);
      resetForm();
      toast.success('Élément roadmap créé avec succès !');
    } catch (error) {
      console.error('Error creating roadmap item:', error);
      toast.error('Erreur lors de la création de l\'élément');
    }
  };

  const handleUpdate = async () => {
    if (!editingItem || !formData.title || !formData.description) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      await roadmapService.updateItem(editingItem.id, {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        timeline: formData.timeline || 'Non spécifié',
        status: formData.status || 'planned',
        displayOrder: formData.displayOrder || 1,
        files: formData.files || []
      });

      // Clear autosave after successful update
      await clearAutosave();

      setShowEditDialog(false);
      setEditingItem(null);
      resetForm();
      toast.success('Élément roadmap mis à jour avec succès !');
    } catch (error) {
      console.error('Error updating roadmap item:', error);
      toast.error('Erreur lors de la mise à jour de l\'élément');
    }
  };

  const handleDelete = async (itemId: string) => {
    try {
      await roadmapService.deleteItem(itemId);
      toast.success('Élément roadmap supprimé');
    } catch (error) {
      console.error('Error deleting roadmap item:', error);
      toast.error('Erreur lors de la suppression de l\'élément');
    }
  };

  const openEditDialog = (item: RoadmapItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      content: item.content || '',
      timeline: item.timeline,
      status: item.status,
      displayOrder: item.displayOrder,
      files: [...item.files]
    });
    setShowEditDialog(true);
  };

  const openCreateDialog = () => {
    resetForm();
    setShowCreateDialog(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      timeline: '',
      status: 'planned',
      displayOrder: roadmapItems.length + 1, // Default to next available position
      files: []
    });
  };

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

  // Form content JSX - rendered inline to avoid re-mounting issues
  const renderFormContent = () => (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="basic">Informations de base</TabsTrigger>
        <TabsTrigger value="content">Contenu détaillé (Markdown)</TabsTrigger>
      </TabsList>
      
      <TabsContent value="basic" className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="roadmap-title">Titre *</Label>
          <Input
            id="roadmap-title"
            value={formData.title || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Titre de l'élément roadmap"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="roadmap-description">Description courte *</Label>
          <Textarea
            id="roadmap-description"
            value={formData.description || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Description courte qui apparaitra en haut de la carte"
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            Résumé court visible sur la carte. Pour du contenu détaillé, utilisez l'onglet "Contenu détaillé".
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="roadmap-timeline">Timeline</Label>
            <Input
              id="roadmap-timeline"
              value={formData.timeline || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
              placeholder="Ex: Q1 2025, Mars 2025"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="roadmap-status">Statut</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as 'completed' | 'in-progress' | 'planned' }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planned">Planifié</SelectItem>
                <SelectItem value="in-progress">En cours</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="roadmap-display-order">Ordre d'affichage *</Label>
          <Select
            value={String(formData.displayOrder || 1)}
            onValueChange={(value) => setFormData(prev => ({ ...prev, displayOrder: parseInt(value) }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir l'ordre d'affichage" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: Math.max(roadmapItems.length + 1, 10) }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={String(num)}>
                  {num === 1 
                    ? `${num} - Dernier (en bas de la page)` 
                    : num === Math.max(roadmapItems.length + 1, 10)
                    ? `${num} - Premier (en haut de la page)`
                    : `${num}`
                  }
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            L'ordre d'affichage détermine la position de cet élément sur la page roadmap publique. 
            Le nombre le plus élevé apparaîtra en premier (en haut), et 1 apparaîtra en dernier (en bas).
          </p>
        </div>

        {/* File Upload Section */}
        <div className="space-y-2">
          <Label>Fichiers et Images</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              disabled={uploading}
              accept="image/*,video/*,.pdf,.doc,.docx,.txt"
              className="hidden"
              id="roadmap-file-upload"
            />
            <label
              htmlFor="roadmap-file-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              {uploading ? (
                <Upload className="h-8 w-8 animate-pulse text-primary" />
              ) : (
                <Upload className="h-8 w-8 text-gray-400" />
              )}
              <span className="text-sm text-gray-600">
                {uploading 
                  ? 'Upload en cours...' 
                  : 'Cliquer pour sélectionner des fichiers'
                }
              </span>
              <span className="text-xs text-muted-foreground">
                Images, vidéos, PDF, documents acceptés
              </span>
            </label>
          </div>
          
          {formData.files && formData.files.length > 0 && (
            <div className="mt-4">
              <Label className="text-sm font-medium">Fichiers uploadés:</Label>
              <div className="mt-2 space-y-2">
                {formData.files.map((fileName, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div className="flex items-center space-x-2 text-sm">
                      {fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                        <Image className="h-4 w-4 text-green-600" />
                      ) : (
                        <FileText className="h-4 w-4 text-blue-600" />
                      )}
                      <span>{fileName.split('-').pop() || fileName}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="h-6 w-6 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="content" className="py-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between mb-2">
            <div>
              <Label>Contenu détaillé (Markdown)</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Utilisez le Markdown pour formater le contenu. Vous pouvez inclure des images, vidéos YouTube/Vimeo, tableaux, etc.
              </p>
            </div>
          </div>
          <RichTextEditor
            content={formData.content || ''}
            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
            placeholder="## Contenu détaillé

Écrivez ici le contenu détaillé de cet élément de roadmap...

### Ajouter une image
![Description](URL_de_l_image)

### Ajouter une vidéo YouTube
Collez simplement l'URL: https://www.youtube.com/watch?v=VIDEO_ID

### Ajouter une vidéo Vimeo
Collez simplement l'URL: https://vimeo.com/VIDEO_ID

Utilisez la barre d'outils pour plus d'options de formatage."
            showToolbar={true}
          />
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Conseils pour les médias</h4>
            <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
              <li>Pour les images: utilisez la syntaxe <code className="bg-blue-100 px-1 rounded">![alt](url)</code></li>
              <li>Pour YouTube: collez directement l'URL (ex: https://www.youtube.com/watch?v=VIDEO_ID)</li>
              <li>Pour Vimeo: collez directement l'URL (ex: https://vimeo.com/VIDEO_ID)</li>
              <li>Les vidéos seront automatiquement converties en lecteurs intégrés</li>
            </ul>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestion de la Roadmap</h1>
          <p className="text-muted-foreground">
            Gérez les éléments de la roadmap publique du projet Gaia
          </p>
        </div>
        <Button onClick={openCreateDialog} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nouvel élément</span>
        </Button>
      </div>

      {loading ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de la roadmap...</p>
          </CardContent>
        </Card>
      ) : roadmapItems.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun élément roadmap</h3>
            <p className="text-gray-600 mb-4">Commencez par créer votre premier élément de roadmap</p>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Créer le premier élément
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadmapItems.map((item) => (
            <Card key={item.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary font-bold">
                      #{item.displayOrder}
                    </Badge>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(item.status)}>
                    {getStatusText(item.status)}
                  </Badge>
                </div>
                <CardDescription className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {item.timeline}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 line-clamp-3">{item.description}</p>
                
                {item.files && item.files.length > 0 && (
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-900">
                      {item.files.length} fichier(s) associé(s)
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.files.slice(0, 3).map((fileName, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                            <Image className="w-3 h-3 mr-1" />
                          ) : (
                            <FileText className="w-3 h-3 mr-1" />
                          )}
                          {fileName.split('-').pop()?.substring(0, 10) || 'fichier'}
                        </Badge>
                      ))}
                      {item.files.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.files.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-gray-500">
                    Créé le {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                          <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer l'élément "{item.title}" ? 
                            Cette action est irréversible.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Créer un nouvel élément roadmap</DialogTitle>
            <DialogDescription>
              Ajoutez un nouvel élément à la roadmap du projet Gaia
            </DialogDescription>
          </DialogHeader>
          {renderFormContent()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleCreate}
              disabled={uploading || !formData.title || !formData.description}
            >
              {uploading ? 'Upload en cours...' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier l'élément roadmap</DialogTitle>
            <DialogDescription>
              Modifiez les informations de cet élément
            </DialogDescription>
          </DialogHeader>
          {renderFormContent()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleUpdate}
              disabled={uploading || !formData.title || !formData.description}
            >
              {uploading ? 'Upload en cours...' : 'Mettre à jour'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoadmapManager;