import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { s3Manager, type S3File } from '@/lib/s3-direct';
import { 
  Upload, 
  Download, 
  Trash2, 
  FileText, 
  Image, 
  Video, 
  File,
  RefreshCw,
  Edit
} from 'lucide-react';
import { toast } from 'sonner';

const S3Dashboard = () => {
  const [files, setFiles] = useState<S3File[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      
      // First check bucket health
      const healthCheck = await s3Manager.checkBucketHealth();
      if (!healthCheck.healthy) {
        console.error('Bucket health check failed:', healthCheck.error);
        
        if (healthCheck.serviceOffline) {
          toast.error('Service Supabase indisponible. Utilisez le mode démo pour tester les fonctionnalités.');
        } else {
          toast.error(`Erreur de configuration S3: ${healthCheck.error}`);
        }
        return;
      }
      
      const fileList = await s3Manager.listFiles();
      setFiles(fileList);
      console.log(`Successfully loaded ${fileList.length} files`);
    } catch (error) {
      console.error('Error fetching files:', error);
      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          toast.error('Service indisponible. Veuillez utiliser le mode démo ou réessayer plus tard.');
        } else {
          toast.error(`Erreur lors de la récupération des fichiers: ${error.message}`);
        }
      } else {
        toast.error('Erreur lors de la récupération des fichiers');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await s3Manager.uploadFile(file);
      toast.success('Fichier uploadé avec succès');
      fetchFiles();
      // Clear the input
      event.target.value = '';
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Erreur lors de l\'upload du fichier');
    } finally {
      setUploading(false);
    }
  };

  const handleFileReplace = async (existingKey: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!confirm(`Remplacer le fichier "${existingKey}" par "${file.name}" ?`)) return;

    try {
      setUploading(true);
      await s3Manager.replaceFile(existingKey, file);
      toast.success('Fichier remplacé avec succès');
      fetchFiles();
      // Clear the input
      event.target.value = '';
    } catch (error) {
      console.error('Error replacing file:', error);
      toast.error('Erreur lors du remplacement du fichier');
    } finally {
      setUploading(false);
    }
  };

  const handleFileDelete = async (key: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${key} ?`)) return;

    try {
      await s3Manager.deleteFile(key);
      toast.success('Fichier supprimé avec succès');
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Erreur lors de la suppression du fichier');
    }
  };

  const handleFileDownload = async (key: string) => {
    try {
      const url = await s3Manager.getFileUrl(key);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error generating download URL:', error);
      toast.error('Erreur lors de la génération du lien de téléchargement');
    }
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) {
      return <Image className="h-4 w-4" />;
    }
    if (['mp4', 'avi', 'mov', 'wmv', 'flv'].includes(extension || '')) {
      return <Video className="h-4 w-4" />;
    }
    if (['txt', 'doc', 'docx', 'pdf', 'md'].includes(extension || '')) {
      return <FileText className="h-4 w-4" />;
    }
    return <File className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestion des fichiers S3</h2>
          <p className="text-muted-foreground">Bucket: global | Région: eu-west-3</p>
        </div>
        <Button onClick={fetchFiles} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload de fichiers</CardTitle>
          <CardDescription>
            Sélectionnez un fichier à uploader sur le bucket S3
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              onChange={handleFileUpload}
              disabled={uploading}
              className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80 disabled:opacity-50"
            />
            {uploading && (
              <Badge variant="outline">
                <Upload className="h-3 w-3 mr-1 animate-spin" />
                Upload en cours...
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Files List */}
      <Card>
        <CardHeader>
          <CardTitle>Fichiers ({files.length})</CardTitle>
          <CardDescription>
            Liste des fichiers présents dans le bucket S3
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin mr-2" />
              <p>Chargement des fichiers...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <File className="h-6 w-6 mr-2 text-muted-foreground" />
              <p>Aucun fichier trouvé</p>
            </div>
          ) : (
            <div className="space-y-2">
              {files.map((file) => (
                <div key={file.key} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.key)}
                    <div>
                      <p className="font-medium">{file.key}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(file.size)} • {file.lastModified.toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleFileDownload(file.key)}
                      variant="outline"
                      size="sm"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Télécharger
                    </Button>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={(e) => handleFileReplace(file.key, e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploading}
                      />
                      <Button variant="outline" size="sm" disabled={uploading}>
                        <Edit className="h-3 w-3 mr-1" />
                        Remplacer
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleFileDelete(file.key)}
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default S3Dashboard;