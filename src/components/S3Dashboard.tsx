import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { s3, s3Config } from '@/lib/s3';
import { 
  Upload, 
  Download, 
  Trash2, 
  FileText, 
  Image, 
  Video, 
  File,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface S3File {
  Key: string;
  LastModified: Date;
  Size: number;
  StorageClass: string;
}

const S3Dashboard = () => {
  const [files, setFiles] = useState<S3File[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await s3.listObjects({
        Bucket: s3Config.bucketName
      }).promise();

      if (response.Contents) {
        setFiles(response.Contents.map(file => ({
          Key: file.Key!,
          LastModified: file.LastModified!,
          Size: file.Size!,
          StorageClass: file.StorageClass!
        })));
      }
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
      await s3.upload({
        Bucket: s3Config.bucketName,
        Key: file.name,
        Body: file
      }).promise();

      alert('Fichier uploadé avec succès');
      fetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Erreur lors de l\'upload du fichier');
    } finally {
      setUploading(false);
    }
  };

  const handleFileDelete = async (key: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${key} ?`)) return;

    try {
      await s3.deleteObject({
        Bucket: s3Config.bucketName,
        Key: key
      }).promise();

      alert('Fichier supprimé avec succès');
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Erreur lors de la suppression du fichier');
    }
  };

  const handleFileDownload = async (key: string) => {
    try {
      const url = s3.getSignedUrl('getObject', {
        Bucket: s3Config.bucketName,
        Key: key,
        Expires: 300 // 5 minutes
      });
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
          <h2 className="text-2xl font-bold">Gestion des fichiers S3</h2>
          <p className="text-muted-foreground">Bucket: {s3Config.bucketName}</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={fetchFiles} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button 
            onClick={() => window.open(`https://${s3Config.endpoint}`, '_blank')}
            variant="outline" 
            size="sm"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Tebi.io
          </Button>
        </div>
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
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Chargement des fichiers...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-8">
              <File className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucun fichier trouvé</p>
            </div>
          ) : (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {getFileIcon(file.Key)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.Key}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{formatFileSize(file.Size)}</span>
                        <span>{new Date(file.LastModified).toLocaleString('fr-FR')}</span>
                        <Badge variant="outline" className="text-xs">
                          {file.StorageClass}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleFileDownload(file.Key)}
                      size="sm"
                      variant="outline"
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button
                      onClick={() => handleFileDelete(file.Key)}
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
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