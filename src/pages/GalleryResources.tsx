import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Image as ImageIcon, Sparkles } from 'lucide-react';

// Type definitions
interface GalleryImage {
  src: string;
  alt: string;
  size: 'small' | 'medium' | 'large';
}

interface ResourceFile {
  name: string;
  path: string;
  size?: string;
  type?: string;
}

const GalleryResources = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [resourceFiles, setResourceFiles] = useState<ResourceFile[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Load gallery images from manifest
    const loadGalleryImages = async () => {
      try {
        const response = await fetch('/gallery/manifest.json');
        if (response.ok) {
          const data = await response.json();
          // Filter out the _instructions field and only keep actual image entries
          const images = data.images.filter((img: any) => img.src && img.alt);
          setGalleryImages(images);
        }
      } catch (error) {
        console.error('Error loading gallery images:', error);
        // If manifest doesn't exist or fails to load, show empty state
        setGalleryImages([]);
      }
    };

    // Load resource files from manifest
    const loadResourceFiles = async () => {
      try {
        const response = await fetch('/files/manifest.json');
        if (response.ok) {
          const data = await response.json();
          // Filter out the _instructions field and only keep actual file entries
          const files = data.files.filter((file: any) => file.name && file.path);
          setResourceFiles(files);
        }
      } catch (error) {
        console.error('Error loading resource files:', error);
        // If manifest doesn't exist or fails to load, show empty state
        setResourceFiles([]);
      }
    };

    loadGalleryImages();
    loadResourceFiles();
  }, []);

  const handleDownload = (filePath: string) => {
    window.open(filePath, '_blank');
  };

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 animate-float-slow">
              <Sparkles className="h-32 w-32 text-primary/8" />
            </div>
            <div className="absolute bottom-32 left-16 animate-float">
              <ImageIcon className="h-24 w-24 text-accent/10" />
            </div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Galerie & Ressources
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Découvrez notre galerie d'images et accédez à nos ressources disponibles pour le projet Gaia
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <ImageIcon className="h-8 w-8 text-primary" />
                <h2 className="text-4xl font-display font-bold">Galerie Photo</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explorez notre collection d'images du projet Gaia
              </p>
            </div>

            {galleryImages.length === 0 ? (
              <Card className="max-w-3xl mx-auto">
                <CardContent className="py-16 text-center">
                  <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-2xl font-semibold mb-4">Galerie en préparation</h3>
                  <p className="text-muted-foreground mb-6">
                    Les images seront bientôt disponibles. Ajoutez vos images dans le dossier <code className="bg-muted px-2 py-1 rounded">public/gallery</code> du repository GitHub.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-6 max-w-2xl mx-auto text-left">
                    <p className="font-semibold mb-2">Instructions pour ajouter des images :</p>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Placez vos images dans le dossier <code className="bg-background px-2 py-1 rounded">public/gallery</code></li>
                      <li>Formats supportés : JPG, PNG, GIF, WebP</li>
                      <li>Les images seront automatiquement affichées ici</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="masonry-grid">
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className={`masonry-item masonry-item-${image.size} cursor-pointer`}
                    onClick={() => handleImageClick(image.src)}
                  >
                    <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <p className="text-white p-4 font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FileText className="h-8 w-8 text-primary" />
                <h2 className="text-4xl font-display font-bold">Ressources & Fichiers</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Téléchargez les documents et fichiers liés au projet
              </p>
            </div>

            {resourceFiles.length === 0 ? (
              <Card className="max-w-3xl mx-auto">
                <CardContent className="py-16 text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-2xl font-semibold mb-4">Ressources en préparation</h3>
                  <p className="text-muted-foreground mb-6">
                    Les fichiers seront bientôt disponibles. Ajoutez vos fichiers dans le dossier <code className="bg-muted px-2 py-1 rounded">public/files</code> du repository GitHub.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-6 max-w-2xl mx-auto text-left">
                    <p className="font-semibold mb-2">Instructions pour ajouter des fichiers :</p>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Placez vos fichiers dans le dossier <code className="bg-background px-2 py-1 rounded">public/files</code></li>
                      <li>Tous les types de fichiers sont supportés (PDF, DOC, etc.)</li>
                      <li>Les fichiers seront automatiquement listés ici</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {resourceFiles.map((file, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold mb-1 truncate">{file.name}</h3>
                          {file.type && (
                            <p className="text-sm text-muted-foreground mb-2">{file.type}</p>
                          )}
                          {file.size && (
                            <p className="text-xs text-muted-foreground mb-3">{file.size}</p>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(file.path)}
                            className="w-full"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-7xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white"
              onClick={closeModal}
            >
              ✕
            </Button>
          </div>
        </div>
      )}

      <style>{`
        .masonry-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          grid-auto-rows: 200px;
        }

        .masonry-item {
          overflow: hidden;
        }

        .masonry-item-small {
          grid-row: span 1;
        }

        .masonry-item-medium {
          grid-row: span 2;
        }

        .masonry-item-large {
          grid-row: span 3;
        }

        @media (max-width: 768px) {
          .masonry-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            grid-auto-rows: 180px;
          }
        }
      `}</style>
    </div>
  );
};

export default GalleryResources;
