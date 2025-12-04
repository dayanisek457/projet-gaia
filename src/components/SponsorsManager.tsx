import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Sponsor, sponsorsService, CreateSponsorDto } from '@/lib/supabase-sponsors';
import { s3Manager } from '@/lib/s3';
import { Plus, Edit, Trash2, Upload, ExternalLink, Image as ImageIcon } from 'lucide-react';

const SPONSOR_CATEGORIES = [
  'Entreprises Aéronautiques',
  'Jardineries & Reforestation',
  'Collectivités Locales',
  'Partenaires Technologiques',
  'Autres',
];

const SponsorsManager = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sponsorToDelete, setSponsorToDelete] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website_url: '',
    category: SPONSOR_CATEGORIES[0],
    display_order: 0,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    loadSponsors();
  }, []);

  const loadSponsors = async () => {
    try {
      setLoading(true);
      const data = await sponsorsService.getSponsors();
      setSponsors(data);
    } catch (error) {
      console.error('Error loading sponsors:', error);
      toast.error('Erreur lors du chargement des sponsors');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (sponsor?: Sponsor) => {
    if (sponsor) {
      setEditingSponsor(sponsor);
      setFormData({
        name: sponsor.name,
        description: sponsor.description,
        website_url: sponsor.website_url || '',
        category: sponsor.category,
        display_order: sponsor.display_order,
      });
    } else {
      setEditingSponsor(null);
      setFormData({
        name: '',
        description: '',
        website_url: '',
        category: SPONSOR_CATEGORIES[0],
        display_order: 0,
      });
    }
    setLogoFile(null);
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingSponsor(null);
    setLogoFile(null);
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setUploading(true);

      // Upload files if provided
      let logoUrl = editingSponsor?.logo_url || null;
      let imageUrl = editingSponsor?.image_url || null;

      if (logoFile) {
        const fileName = await s3Manager.uploadFile(logoFile, `sponsors/logos/${Date.now()}-${logoFile.name}`);
        logoUrl = await s3Manager.getFileUrl(fileName);
      }

      if (imageFile) {
        const fileName = await s3Manager.uploadFile(imageFile, `sponsors/images/${Date.now()}-${imageFile.name}`);
        imageUrl = await s3Manager.getFileUrl(fileName);
      }

      const sponsorData: CreateSponsorDto = {
        name: formData.name,
        description: formData.description,
        logo_url: logoUrl,
        image_url: imageUrl,
        website_url: formData.website_url || null,
        category: formData.category,
        display_order: formData.display_order,
      };

      if (editingSponsor) {
        await sponsorsService.updateSponsor(editingSponsor.id, sponsorData);
        toast.success('Sponsor mis à jour avec succès');
      } else {
        await sponsorsService.createSponsor(sponsorData);
        toast.success('Sponsor créé avec succès');
      }

      handleCloseDialog();
      loadSponsors();
    } catch (error) {
      console.error('Error saving sponsor:', error);
      toast.error('Erreur lors de la sauvegarde du sponsor');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setSponsorToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!sponsorToDelete) return;

    try {
      await sponsorsService.deleteSponsor(sponsorToDelete);
      toast.success('Sponsor supprimé avec succès');
      loadSponsors();
    } catch (error) {
      console.error('Error deleting sponsor:', error);
      toast.error('Erreur lors de la suppression du sponsor');
    } finally {
      setDeleteDialogOpen(false);
      setSponsorToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestion des Sponsors</h1>
          <p className="text-muted-foreground">
            Gérez les sponsors affichés sur la page /partenaires
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Ajouter un Sponsor</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((sponsor) => (
          <Card key={sponsor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-1">{sponsor.name}</CardTitle>
                  <Badge variant="secondary">{sponsor.category}</Badge>
                </div>
                {sponsor.logo_url && (
                  <img
                    src={sponsor.logo_url}
                    alt={sponsor.name}
                    className="w-12 h-12 object-contain ml-2"
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {sponsor.description}
              </p>
              
              {sponsor.image_url && (
                <div className="w-full h-32 bg-muted rounded-md overflow-hidden">
                  <img
                    src={sponsor.image_url}
                    alt={sponsor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Ordre: {sponsor.display_order}</span>
                {sponsor.website_url && (
                  <a
                    href={sponsor.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 hover:text-primary"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Site web</span>
                  </a>
                )}
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDialog(sponsor)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Modifier
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteClick(sponsor.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sponsors.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Aucun sponsor pour le moment. Cliquez sur "Ajouter un Sponsor" pour commencer.
            </p>
          </CardContent>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSponsor ? 'Modifier le Sponsor' : 'Ajouter un Sponsor'}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations du sponsor. Les champs avec * sont obligatoires.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nom du sponsor"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description du sponsor"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SPONSOR_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="display_order">Ordre d'affichage</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website_url">Site Web</Label>
              <Input
                id="website_url"
                type="url"
                value={formData.website_url}
                onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Logo</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                  className="flex-1"
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
              {editingSponsor?.logo_url && !logoFile && (
                <p className="text-xs text-muted-foreground">
                  Logo actuel: <a href={editingSponsor.logo_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Voir</a>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="flex-1"
                />
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              {editingSponsor?.image_url && !imageFile && (
                <p className="text-xs text-muted-foreground">
                  Image actuelle: <a href={editingSponsor.image_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Voir</a>
                </p>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Annuler
              </Button>
              <Button type="submit" disabled={uploading}>
                {uploading ? 'Enregistrement...' : editingSponsor ? 'Mettre à jour' : 'Créer'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le sponsor sera définitivement supprimé de la base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SponsorsManager;
