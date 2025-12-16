import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import RichTextEditor from '@/components/RichTextEditor';
import TableEditor from '@/components/TableEditor';
import { useDocumentation, DocSection } from '@/hooks/useDocumentation';
import { useAutosave } from '@/hooks/useAutosave';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  FileText, 
  Table, 
  List, 
  AlertTriangle,
  CheckSquare,
  Layers,
  Save,
  X,
  Eye,
  Copy,
  Move,
  Settings,
  Palette,
  Type
} from 'lucide-react';
import { toast } from 'sonner';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface CalloutItem {
  type: 'info' | 'warning' | 'success';
  title: string;
  content: string;
}

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

const DocumentationManager = () => {
  const { 
    sections, 
    updateSection, 
    createSection, 
    deleteSection, 
    togglePublish 
  } = useDocumentation();
  
  const [editingSection, setEditingSection] = useState<DocSection | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSection, setNewSection] = useState<Partial<DocSection>>({
    title: '',
    content: '',
    type: 'rich',
    data: {},
    order: sections.length + 1,
    isPublished: true
  });

  // Autosave for editing section
  const editingSectionContent = editingSection ? JSON.stringify(editingSection) : '';
  const { clearAutosave: clearEditAutosave } = useAutosave({
    entityType: 'documentation',
    entityId: editingSection?.id || null,
    content: editingSectionContent,
    enabled: !!editingSection,
  });

  // Autosave for new section
  const newSectionContent = JSON.stringify(newSection);
  const { clearAutosave: clearNewAutosave } = useAutosave({
    entityType: 'documentation',
    entityId: null,
    content: newSectionContent,
    enabled: isDialogOpen,
  });

  const sectionTypes = [
    { value: 'rich', label: 'Contenu Riche (Markdown)', icon: FileText },
    { value: 'text', label: 'Texte Simple', icon: Type },
    { value: 'accordion', label: 'Accordéon', icon: Layers },
    { value: 'table', label: 'Tableau', icon: Table },
    { value: 'callout', label: 'Encadré/Alerte', icon: AlertTriangle },
    { value: 'checklist', label: 'Liste de Tâches', icon: CheckSquare }
  ];

  const handleCreateSection = async () => {
    if (!newSection.title) {
      toast.error('Le titre est obligatoire');
      return;
    }

    const sectionData = {
      ...newSection,
      title: newSection.title!,
      content: newSection.content || '',
      type: newSection.type || 'rich',
      order: newSection.order || sections.length + 1,
      isPublished: newSection.isPublished ?? true
    } as Omit<DocSection, 'id'>;

    // Initialize data based on type
    switch (sectionData.type) {
      case 'accordion':
        sectionData.data = { items: [] };
        break;
      case 'table':
        sectionData.data = { headers: ['Colonne 1', 'Colonne 2'], rows: [] };
        break;
      case 'callout':
        sectionData.data = { callouts: [] };
        break;
      case 'checklist':
        sectionData.data = { items: [] };
        break;
    }

    const createdSection = createSection(sectionData);
    
    if (createdSection) {
      // Clear autosave after successful creation
      await clearNewAutosave();
      
      setNewSection({
        title: '',
        content: '',
        type: 'rich',
        data: {},
        order: sections.length + 2,
        isPublished: true
      });
      setIsDialogOpen(false);
      toast.success('Section créée avec succès');
    } else {
      toast.error('Erreur lors de la création de la section');
    }
  };

  const handleDeleteSection = (id: string) => {
    if (deleteSection(id)) {
      toast.success('Section supprimée');
    } else {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleTogglePublish = (id: string) => {
    const section = sections.find(s => s.id === id);
    if (togglePublish(id)) {
      toast.success(`Section ${section?.isPublished ? 'dépubliée' : 'publiée'}`);
    } else {
      toast.error('Erreur lors de la publication');
    }
  };

  const renderSectionTypeIcon = (type: string) => {
    const typeConfig = sectionTypes.find(t => t.value === type);
    if (!typeConfig) return <FileText className="h-4 w-4" />;
    const IconComponent = typeConfig.icon;
    return <IconComponent className="h-4 w-4" />;
  };

  const renderAdvancedEditor = (section: DocSection) => {
    switch (section.type) {
      case 'rich':
        return (
          <div className="space-y-4">
            <Label>Contenu Markdown Avancé</Label>
            <RichTextEditor
              content={section.content}
              onChange={(content) => {
                setEditingSection({
                  ...section,
                  content
                });
              }}
              placeholder="Utilisez la barre d'outils pour formater votre contenu avec toutes les fonctionnalités markdown avancées..."
            />
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <Label>Contenu Texte Simple</Label>
            <Textarea
              placeholder="Contenu de la section..."
              value={section.content}
              rows={10}
              onChange={(e) => {
                setEditingSection({
                  ...section,
                  content: e.target.value
                });
              }}
            />
          </div>
        );

      case 'accordion':
        return (
          <div className="space-y-4">
            <Label>Éléments de l'accordéon</Label>
            {section.data?.items?.map((item: AccordionItem, index: number) => (
              <Card key={item.id} className="p-4">
                <div className="space-y-3">
                  <Input
                    placeholder="Titre de l'élément"
                    value={item.title}
                    onChange={(e) => {
                      const newItems = [...section.data.items];
                      newItems[index].title = e.target.value;
                      setEditingSection({
                        ...section,
                        data: { ...section.data, items: newItems }
                      });
                    }}
                  />
                  <Textarea
                    placeholder="Contenu de l'élément"
                    value={item.content}
                    rows={3}
                    onChange={(e) => {
                      const newItems = [...section.data.items];
                      newItems[index].content = e.target.value;
                      setEditingSection({
                        ...section,
                        data: { ...section.data, items: newItems }
                      });
                    }}
                  />
                </div>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                const newItem: AccordionItem = {
                  id: Date.now().toString(),
                  title: '',
                  content: ''
                };
                setEditingSection({
                  ...section,
                  data: {
                    ...section.data,
                    items: [...(section.data?.items || []), newItem]
                  }
                });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un élément
            </Button>
          </div>
        );

      case 'callout':
        return (
          <div className="space-y-4">
            <Label>Encadrés</Label>
            {section.data?.callouts?.map((callout: CalloutItem, index: number) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <Select
                    value={callout.type}
                    onValueChange={(value) => {
                      const newCallouts = [...section.data.callouts];
                      newCallouts[index].type = value;
                      setEditingSection({
                        ...section,
                        data: { ...section.data, callouts: newCallouts }
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Information</SelectItem>
                      <SelectItem value="warning">Avertissement</SelectItem>
                      <SelectItem value="success">Succès</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Titre"
                    value={callout.title}
                    onChange={(e) => {
                      const newCallouts = [...section.data.callouts];
                      newCallouts[index].title = e.target.value;
                      setEditingSection({
                        ...section,
                        data: { ...section.data, callouts: newCallouts }
                      });
                    }}
                  />
                  <Textarea
                    placeholder="Contenu"
                    value={callout.content}
                    onChange={(e) => {
                      const newCallouts = [...section.data.callouts];
                      newCallouts[index].content = e.target.value;
                      setEditingSection({
                        ...section,
                        data: { ...section.data, callouts: newCallouts }
                      });
                    }}
                  />
                </div>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                const newCallout: CalloutItem = {
                  type: 'info',
                  title: '',
                  content: ''
                };
                setEditingSection({
                  ...section,
                  data: {
                    ...section.data,
                    callouts: [...(section.data?.callouts || []), newCallout]
                  }
                });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un encadré
            </Button>
          </div>
        );

      case 'table':
        return (
          <TableEditor
            data={section.data}
            onChange={(data) => {
              setEditingSection({
                ...section,
                data: data
              });
            }}
          />
        );

      case 'checklist':
        return (
          <div className="space-y-4">
            <Label>Liste de tâches</Label>
            {section.data?.items?.map((item: ChecklistItem, index: number) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={item.completed}
                    onCheckedChange={(checked) => {
                      const newItems = [...section.data.items];
                      newItems[index].completed = checked as boolean;
                      setEditingSection({
                        ...section,
                        data: { ...section.data, items: newItems }
                      });
                    }}
                  />
                  <Input
                    placeholder="Texte de la tâche"
                    value={item.text}
                    className="flex-1"
                    onChange={(e) => {
                      const newItems = [...section.data.items];
                      newItems[index].text = e.target.value;
                      setEditingSection({
                        ...section,
                        data: { ...section.data, items: newItems }
                      });
                    }}
                  />
                </div>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                const newItem: ChecklistItem = {
                  id: Date.now(),
                  text: '',
                  completed: false
                };
                setEditingSection({
                  ...section,
                  data: {
                    ...section.data,
                    items: [...(section.data?.items || []), newItem]
                  }
                });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une tâche
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  const saveSection = async () => {
    if (editingSection) {
      if (updateSection(editingSection)) {
        // Clear autosave after successful save
        await clearEditAutosave();
        
        setEditingSection(null);
        toast.success('Section sauvegardée avec succès');
      } else {
        toast.error('Erreur lors de la sauvegarde');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestion de la Documentation</h2>
          <p className="text-muted-foreground">
            Créez et gérez les sections de documentation avec des fonctionnalités avancées
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Nouvelle Section</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer une nouvelle section</DialogTitle>
              <DialogDescription>
                Ajoutez une nouvelle section à votre documentation
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titre de la section</Label>
                <Input
                  id="title"
                  value={newSection.title}
                  onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                  placeholder="Entrez le titre de la section"
                />
              </div>
              <div>
                <Label htmlFor="type">Type de contenu</Label>
                <Select
                  value={newSection.type}
                  onValueChange={(value) => setNewSection({ ...newSection, type: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sectionTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          <type.icon className="h-4 w-4" />
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {newSection.type === 'text' && (
                <div>
                  <Label htmlFor="content">Contenu</Label>
                  <RichTextEditor
                    content={newSection.content || ''}
                    onChange={(content) => setNewSection({ ...newSection, content })}
                    placeholder="Entrez le contenu de la section"
                    showToolbar={true}
                  />
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="published"
                  checked={newSection.isPublished}
                  onCheckedChange={(checked) => 
                    setNewSection({ ...newSection, isPublished: checked as boolean })
                  }
                />
                <Label htmlFor="published">Publier immédiatement</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleCreateSection}>
                  Créer la section
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Section Editor */}
      {editingSection && (
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                {renderSectionTypeIcon(editingSection.type)}
                <span>Édition: {editingSection.title}</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setEditingSection(null)}>
                  <X className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={saveSection}>
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Titre</Label>
              <Input
                id="edit-title"
                value={editingSection.title}
                onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
              />
            </div>
            {editingSection.type === 'text' && (
              <div>
                <Label htmlFor="edit-content">Contenu</Label>
                <RichTextEditor
                  content={editingSection.content}
                  onChange={(content) => setEditingSection({ ...editingSection, content })}
                  placeholder="Contenu de la section"
                  showToolbar={true}
                />
              </div>
            )}
            {renderAdvancedEditor(editingSection)}
          </CardContent>
        </Card>
      )}

      {/* Sections List */}
      <div className="grid gap-4">
        {sections
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <Card key={section.id} className={`${!section.isPublished ? 'opacity-60' : ''}`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {renderSectionTypeIcon(section.type)}
                      <h3 className="font-semibold text-lg">{section.title}</h3>
                      <Badge variant={section.isPublished ? "default" : "secondary"}>
                        {section.isPublished ? 'Publié' : 'Brouillon'}
                      </Badge>
                      <Badge variant="outline">
                        {sectionTypes.find(t => t.value === section.type)?.label}
                      </Badge>
                    </div>
                    {section.content && (
                      <p className="text-muted-foreground text-sm">
                        {section.content.length > 100 
                          ? section.content.substring(0, 100) + '...' 
                          : section.content}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePublish(section.id)}
                    >
                      {section.isPublished ? 'Dépublier' : 'Publier'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingSection(section)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteSection(section.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default DocumentationManager;