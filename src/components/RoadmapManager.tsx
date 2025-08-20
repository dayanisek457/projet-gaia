import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { s3Manager } from '@/lib/s3-direct';
import { Upload, FileText, Image, Edit, Trash2, Plus, Calendar, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  timeline: string;
  files: string[];
  status: 'completed' | 'in-progress' | 'planned';
  createdAt: string;
  updatedAt: string;
}

interface FormDialogProps {
  isEdit: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: Partial<RoadmapItem>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<RoadmapItem>>>;
  uploading: boolean;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  handleCreate: () => void;
  handleUpdate: () => void;
}

const FormDialog = ({ 
  isEdit, 
  open, 
  onOpenChange, 
  formData, 
  setFormData, 
  uploading, 
  handleFileUpload, 
  removeFile, 
  handleCreate, 
  handleUpdate 
}: FormDialogProps) => {
  const FileUploadSection = () => (
    <div className="space-y-2">
      <Label>Fichiers et Images</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          disabled={uploading}
          accept="image/*,.pdf,.doc,.docx,.txt"
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
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
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Modifier l\'élément roadmap' : 'Créer un nouvel élément roadmap'}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? 'Modifiez les informations de cet élément' : 'Ajoutez un nouvel élément à la roadmap du projet GAIA'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={formData.title || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Titre de l'élément roadmap"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Description détaillée de l'élément"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Input
                id="timeline"
                value={formData.timeline || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                placeholder="Ex: Q1 2025, Mars 2025"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}
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

          <FileUploadSection />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button 
            onClick={isEdit ? handleUpdate : handleCreate}
            disabled={uploading || !formData.title || !formData.description}
          >
            {uploading ? 'Upload en cours...' : (isEdit ? 'Mettre à jour' : 'Créer')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const RoadmapManager = () => {
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [editingItem, setEditingItem] = useState<RoadmapItem | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<Partial<RoadmapItem>>({
    title: '',
    description: '',
    timeline: '',
    status: 'planned',
    files: []
  });

  useEffect(() => {
    loadRoadmapItems();
  }, []);

  const loadRoadmapItems = () => {
    const saved = localStorage.getItem('gaia-roadmap');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setRoadmapItems(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Error loading roadmap:', error);
        setRoadmapItems([]);
      }
    }
  };

  const saveRoadmapItems = (items: RoadmapItem[]) => {
    localStorage.setItem('gaia-roadmap', JSON.stringify(items));
    setRoadmapItems(items);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileName = `roadmap-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${file.name}`;
        await s3Manager.uploadFile(file);
        return fileName;
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

  const handleCreate = () => {
    if (!formData.title || !formData.description) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newItem: RoadmapItem = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      timeline: formData.timeline || 'Non spécifié',
      status: formData.status || 'planned',
      files: formData.files || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newItems = [...roadmapItems, newItem];
    saveRoadmapItems(newItems);
    
    setShowCreateDialog(false);
    resetForm();
    toast.success('Élément roadmap créé avec succès !');
  };

  const handleUpdate = () => {
    if (!editingItem || !formData.title || !formData.description) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const updatedItem: RoadmapItem = {
      ...editingItem,
      title: formData.title,
      description: formData.description,
      timeline: formData.timeline || 'Non spécifié',
      status: formData.status || 'planned',
      files: formData.files || [],
      updatedAt: new Date().toISOString()
    };

    const newItems = roadmapItems.map(item => 
      item.id === editingItem.id ? updatedItem : item
    );
    saveRoadmapItems(newItems);
    
    setShowEditDialog(false);
    setEditingItem(null);
    resetForm();
    toast.success('Élément roadmap mis à jour avec succès !');
  };

  const handleDelete = (itemId: string) => {
    const newItems = roadmapItems.filter(item => item.id !== itemId);
    saveRoadmapItems(newItems);
    toast.success('Élément roadmap supprimé');
  };

  const openEditDialog = (item: RoadmapItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      timeline: item.timeline,
      status: item.status,
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
      timeline: '',
      status: 'planned',
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestion de la Roadmap</h1>
          <p className="text-muted-foreground">
            Gérez les éléments de la roadmap publique du projet GAIA
          </p>
        </div>
        <Button onClick={openCreateDialog} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nouvel élément</span>
        </Button>
      </div>

      {roadmapItems.length === 0 ? (
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
                  <CardTitle className="text-lg">{item.title}</CardTitle>
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

      {/* Dialogs */}
      <FormDialog 
        isEdit={false}
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        formData={formData}
        setFormData={setFormData}
        uploading={uploading}
        handleFileUpload={handleFileUpload}
        removeFile={removeFile}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
      />
      
      <FormDialog 
        isEdit={true}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        formData={formData}
        setFormData={setFormData}
        uploading={uploading}
        handleFileUpload={handleFileUpload}
        removeFile={removeFile}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default RoadmapManager;