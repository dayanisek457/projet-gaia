import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { storageAdapter, type StorageFile } from '@/lib/storage';
import { 
  Upload, 
  Download, 
  Trash2, 
  FileText, 
  Image, 
  Video, 
  File,
  RefreshCw,
  ExternalLink,
  Edit
} from 'lucide-react';

const SupabaseStorageDashboard = () => {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const fileList = await storageAdapter.listFiles();
      setFiles(fileList);
    } catch (error) {
      console.error('Error fetching files:', error);
      alert('Erreur lors de la récupération des fichiers');
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
      await storageAdapter.uploadFile(file);
      alert('Fichier uploadé avec succès');
      fetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Erreur lors de l\'upload du fichier');
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
      await storageAdapter.replaceFile(existingKey, file);
      alert('Fichier remplacé avec succès');
      fetchFiles();
    } catch (error) {
      console.error('Error replacing file:', error);
      alert('Erreur lors du remplacement du fichier');
    } finally {
      setUploading(false);
    }
  };

  const handleFileDelete = async (key: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${key} ?`)) return;

    try {
      await storageAdapter.deleteFile(key);
      alert('Fichier supprimé avec succès');
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Erreur lors de la suppression du fichier');
    }
  };

  const handleFileDownload = async (key: string) => {
    try {
      const url = await storageAdapter.getDownloadUrl(key);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error generating download URL:', error);
      alert('Erreur lors de la génération du lien de téléchargement');
    }
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return <Image className="h-4 w-4" />;
    }
    if (['mp4', 'avi', 'mov', 'wmv'].includes(extension || '')) {
      return <Video className="h-4 w-4" />;
    }
    if (['txt', 'doc', 'docx', 'pdf'].includes(extension || '')) {
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
          <h2 className="text-2xl font-bold">Gestion des fichiers Supabase Storage</h2>
          <p className="text-muted-foreground">Bucket: global</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={fetchFiles} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button 
            onClick={() => window.open(`https://mvtlxvxywbdjkzcouyrn.supabase.co/dashboard/project/mvtlxvxywbdjkzcouyrn/storage/buckets`, '_blank')}
            variant="outline" 
            size="sm"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Supabase Dashboard
          </Button>
        </div>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload de fichiers</CardTitle>
          <CardDescription>
            Sélectionnez un fichier à uploader sur le bucket Supabase Storage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              onChange={handleFileUpload}
              disabled={uploading}
              className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80"
            />
            {uploading && (
              <Badge variant="outline">
                <Upload className="h-3 w-3 mr-1" />
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
            Liste des fichiers présents dans le bucket
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
                <div key={file.Key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.Key)}
                    <div>
                      <p className="font-medium">{file.Key}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(file.Size)} • {file.LastModified.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleFileDownload(file.Key)}
                      variant="outline"
                      size="sm"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Télécharger
                    </Button>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={(e) => handleFileReplace(file.Key, e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploading}
                      />
                      <Button variant="outline" size="sm" disabled={uploading}>
                        <Edit className="h-3 w-3 mr-1" />
                        Remplacer
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleFileDelete(file.Key)}
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

export default SupabaseStorageDashboard;