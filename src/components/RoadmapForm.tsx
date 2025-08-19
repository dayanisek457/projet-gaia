import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { s3Client, s3Config } from '@/lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Upload, X, FileText, Save, Calendar } from 'lucide-react';

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

interface RoadmapFormProps {
  entry?: RoadmapEntry | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const RoadmapForm = ({ entry, onSuccess, onCancel }: RoadmapFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    entry_date: new Date().toISOString().split('T')[0],
    is_published: false
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [existingFiles, setExistingFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (entry) {
      setFormData({
        title: entry.title,
        description: entry.description,
        content: entry.content || '',
        entry_date: new Date(entry.entry_date).toISOString().split('T')[0],
        is_published: entry.is_published
      });
      setExistingImageUrl(entry.image_url || '');
      setExistingFiles(entry.attached_files || []);
    }
  }, [entry]);

  const uploadToS3 = async (file: File, prefix: string = 'roadmap'): Promise<string> => {
    const fileKey = `${prefix}/${Date.now()}-${file.name}`;
    
    try {
      // Convert File to ArrayBuffer for proper S3 upload
      const fileBuffer = await file.arrayBuffer();
      
      const command = new PutObjectCommand({
        Bucket: s3Config.bucketName,
        Key: fileKey,
        Body: new Uint8Array(fileBuffer),
        ContentType: file.type
      });

      await s3Client.send(command);
      return `https://${s3Config.endpoint}/${s3Config.bucketName}/${fileKey}`;
    } catch (error: any) {
      console.error('S3 upload failed:', error);
      // Re-throw the error to be handled by the calling function
      throw new Error(`Upload S3 échoué: ${error.message}`);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        setError('');
      } else {
        setError('Veuillez sélectionner un fichier image valide');
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeAttachedFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingFile = (index: number) => {
    setExistingFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageUrl = existingImageUrl;
      let uploadedFiles = [...existingFiles];

      setUploading(true);
      
      // Upload new image if provided
      if (imageFile) {
        try {
          imageUrl = await uploadToS3(imageFile, 'roadmap/images');
        } catch (uploadError: any) {
          console.error('Image upload failed:', uploadError);
          setError(`Attention: L'upload de l'image a échoué (${uploadError.message}), mais l'entrée sera créée sans image.`);
          imageUrl = existingImageUrl; // Keep existing image or null
        }
      }

      // Upload new attached files
      if (attachedFiles.length > 0) {
        const successfulUploads = [];
        for (const file of attachedFiles) {
          try {
            const url = await uploadToS3(file, 'roadmap/files');
            successfulUploads.push({
              name: file.name,
              url: url,
              type: file.type,
              size: file.size
            });
          } catch (uploadError: any) {
            console.error(`File upload failed for ${file.name}:`, uploadError);
            setError(prev => prev + `\nAttention: L'upload du fichier "${file.name}" a échoué mais l'entrée sera créée sans ce fichier.`);
          }
        }
        uploadedFiles = [...uploadedFiles, ...successfulUploads];
      }

      setUploading(false);

      const entryData = {
        title: formData.title,
        description: formData.description,
        content: formData.content || null,
        entry_date: formData.entry_date,
        is_published: formData.is_published,
        image_url: imageUrl || null,
        attached_files: uploadedFiles
      };

      if (entry) {
        // Update existing entry
        const { error } = await supabase
          .from('roadmap_entries')
          .update(entryData)
          .eq('id', entry.id);

        if (error) throw error;
      } else {
        // Create new entry
        const { error } = await supabase
          .from('roadmap_entries')
          .insert([entryData]);

        if (error) throw error;
      }

      onSuccess();
      alert(`Entrée ${entry ? 'mise à jour' : 'créée'} avec succès!`);
    } catch (error: any) {
      console.error('Error saving roadmap entry:', error);
      if (error.message.includes('Failed to fetch')) {
        setError(`Erreur de connectivité: Impossible de contacter le serveur. Vérifiez votre connexion internet et la configuration S3.`);
      } else {
        setError(`Erreur lors de la ${entry ? 'mise à jour' : 'création'}: ${error.message}`);
      }
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        {/* Title */}
        <div>
          <Label htmlFor="title">Titre *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Titre de l'entrée de roadmap"
            required
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Description courte de cette entrée"
            rows={3}
            required
          />
        </div>

        {/* Content */}
        <div>
          <Label htmlFor="content">Contenu détaillé</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Contenu détaillé (optionnel)"
            rows={6}
          />
        </div>

        {/* Date */}
        <div>
          <Label htmlFor="entry_date">Date *</Label>
          <Input
            id="entry_date"
            type="date"
            value={formData.entry_date}
            onChange={(e) => setFormData(prev => ({ ...prev, entry_date: e.target.value }))}
            required
          />
        </div>

        {/* Image Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Image principale</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {existingImageUrl && !imageFile && (
              <div className="mb-4">
                <img
                  src={existingImageUrl}
                  alt="Image actuelle"
                  className="w-full h-48 object-cover rounded-md"
                />
                <p className="text-sm text-muted-foreground mt-2">Image actuelle</p>
              </div>
            )}
            
            {imageFile && (
              <div className="mb-4">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Aperçu"
                  className="w-full h-48 object-cover rounded-md"
                />
                <p className="text-sm text-muted-foreground mt-2">Nouvelle image sélectionnée</p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80"
            />
          </CardContent>
        </Card>

        {/* Attached Files */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Fichiers attachés</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Existing files */}
            {existingFiles.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Fichiers existants:</p>
                <div className="flex flex-wrap gap-2">
                  {existingFiles.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Badge variant="outline" className="flex items-center space-x-2">
                        <span>📎 {file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeExistingFile(index)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New files */}
            {attachedFiles.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Nouveaux fichiers:</p>
                <div className="flex flex-wrap gap-2">
                  {attachedFiles.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Badge variant="secondary" className="flex items-center space-x-2">
                        <span>📎 {file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeAttachedFile(index)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80"
            />
          </CardContent>
        </Card>

        {/* Publish Toggle */}
        <div className="flex items-center space-x-3">
          <Switch
            id="is_published"
            checked={formData.is_published}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
          />
          <Label htmlFor="is_published" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Publier immédiatement</span>
          </Label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={loading || uploading || !formData.title.trim() || !formData.description.trim()}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>
            {loading ? (uploading ? 'Upload en cours...' : 'Sauvegarde...') : 
             entry ? 'Mettre à jour' : 'Créer'}
          </span>
        </Button>
      </div>
    </form>
  );
};

export default RoadmapForm;