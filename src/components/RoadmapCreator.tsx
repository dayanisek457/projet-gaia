import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { s3Manager } from '@/lib/s3-direct';
import { Upload, FileText, Image } from 'lucide-react';
import { toast } from 'sonner';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  timeline: string;
  files: string[];
}

const RoadmapCreator = () => {
  const [roadmapItem, setRoadmapItem] = useState<Partial<RoadmapItem>>({
    title: '',
    description: '',
    timeline: '',
    files: []
  });
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

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
      const newUploadedFiles = [...uploadedFiles, ...fileNames];
      setUploadedFiles(newUploadedFiles);
      setRoadmapItem(prev => ({
        ...prev,
        files: newUploadedFiles
      }));
      
      toast.success(`${files.length} fichier(s) uploadé(s) avec succès`);
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Erreur lors de l\'upload des fichiers');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roadmapItem.title || !roadmapItem.description) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newRoadmapItem: RoadmapItem = {
      id: Date.now().toString(),
      title: roadmapItem.title!,
      description: roadmapItem.description!,
      timeline: roadmapItem.timeline || 'Non spécifié',
      files: uploadedFiles
    };

    console.log('Nouvel élément roadmap créé:', newRoadmapItem);
    toast.success('Élément roadmap créé avec succès !');

    // Reset form
    setRoadmapItem({
      title: '',
      description: '',
      timeline: '',
      files: []
    });
    setUploadedFiles([]);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Créer un nouvel élément roadmap</CardTitle>
          <CardDescription>
            Ajoutez un élément à la roadmap du projet Gaia avec des fichiers et images
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={roadmapItem.title || ''}
                onChange={(e) => setRoadmapItem(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Titre de l'élément roadmap"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={roadmapItem.description || ''}
                onChange={(e) => setRoadmapItem(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Description détaillée de l'élément"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Input
                id="timeline"
                value={roadmapItem.timeline || ''}
                onChange={(e) => setRoadmapItem(prev => ({ ...prev, timeline: e.target.value }))}
                placeholder="Ex: Q1 2025, Mars 2025, etc."
              />
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
                      : 'Cliquer pour sélectionner des fichiers ou glisser-déposer'
                    }
                  </span>
                  <span className="text-xs text-gray-500">
                    Images, PDF, documents Word acceptés
                  </span>
                </label>
              </div>
              
              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <Label className="text-sm font-medium">Fichiers uploadés:</Label>
                  <div className="mt-2 space-y-1">
                    {uploadedFiles.map((fileName, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        {fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                          <Image className="h-4 w-4 text-green-600" />
                        ) : (
                          <FileText className="h-4 w-4 text-blue-600" />
                        )}
                        <span>{fileName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={uploading || !roadmapItem.title || !roadmapItem.description}
            >
              {uploading ? 'Upload en cours...' : 'Créer élément roadmap'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoadmapCreator;