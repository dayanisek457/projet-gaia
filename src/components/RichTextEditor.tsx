import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bold, 
  Italic, 
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Table,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Type,
  Eye,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Move,
  Copy,
  Palette,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  showToolbar?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = "Commencez à écrire...",
  showToolbar = true
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  const toolbarButtons = [
    { 
      group: 'text',
      buttons: [
        { icon: Bold, tooltip: 'Gras', action: () => insertFormat('**', '**') },
        { icon: Italic, tooltip: 'Italique', action: () => insertFormat('*', '*') },
        { icon: Underline, tooltip: 'Souligné', action: () => insertFormat('<u>', '</u>') },
        { icon: Code, tooltip: 'Code', action: () => insertFormat('`', '`') },
      ]
    },
    {
      group: 'headings',
      buttons: [
        { icon: Heading1, tooltip: 'Titre 1', action: () => insertHeading('#') },
        { icon: Heading2, tooltip: 'Titre 2', action: () => insertHeading('##') },
        { icon: Heading3, tooltip: 'Titre 3', action: () => insertHeading('###') },
      ]
    },
    {
      group: 'lists',
      buttons: [
        { icon: List, tooltip: 'Liste à puces', action: () => insertList('-') },
        { icon: ListOrdered, tooltip: 'Liste numérotée', action: () => insertList('1.') },
        { icon: Quote, tooltip: 'Citation', action: () => insertFormat('> ', '') },
      ]
    },
    {
      group: 'alignment',
      buttons: [
        { icon: AlignLeft, tooltip: 'Aligner à gauche', action: () => insertAlignment('left') },
        { icon: AlignCenter, tooltip: 'Centrer', action: () => insertAlignment('center') },
        { icon: AlignRight, tooltip: 'Aligner à droite', action: () => insertAlignment('right') },
      ]
    },
    {
      group: 'media',
      buttons: [
        { icon: Link, tooltip: 'Lien', action: () => insertLink() },
        { icon: Image, tooltip: 'Image', action: () => insertImage() },
        { icon: Table, tooltip: 'Tableau', action: () => insertTable() },
      ]
    }
  ];

  const insertFormat = (before: string, after: string) => {
    const textarea = document.getElementById('rich-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    
    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
    onChange(newText);

    // Maintenir la sélection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const insertHeading = (level: string) => {
    const textarea = document.getElementById('rich-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const text = textarea.value;
    const lineStart = text.lastIndexOf('\n', start - 1) + 1;
    
    const newText = text.substring(0, lineStart) + level + ' ' + text.substring(lineStart);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + level.length + 1, start + level.length + 1);
    }, 0);
  };

  const insertList = (marker: string) => {
    const textarea = document.getElementById('rich-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const text = textarea.value;
    const lineStart = text.lastIndexOf('\n', start - 1) + 1;
    
    const newText = text.substring(0, lineStart) + marker + ' ' + text.substring(lineStart);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + marker.length + 1, start + marker.length + 1);
    }, 0);
  };

  const insertAlignment = (align: string) => {
    const textarea = document.getElementById('rich-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end) || 'Texte aligné';
    
    const alignedText = `<div style="text-align: ${align}">${selectedText}</div>`;
    const newText = text.substring(0, start) + alignedText + text.substring(end);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + alignedText.length, start + alignedText.length);
    }, 0);
  };

  const insertLink = () => {
    const url = prompt('Entrez l\'URL:');
    const text = prompt('Texte du lien:') || 'Lien';
    
    if (url) {
      insertFormat(`[${text}](${url})`, '');
    }
  };

  const insertImage = () => {
    const url = prompt('URL de l\'image:');
    const alt = prompt('Texte alternatif:') || 'Image';
    
    if (url) {
      insertFormat(`![${alt}](${url})`, '');
    }
  };

  const insertTable = () => {
    const rows = parseInt(prompt('Nombre de lignes:') || '3');
    const cols = parseInt(prompt('Nombre de colonnes:') || '3');
    
    let table = '\n\n';
    // Header
    table += '|';
    for (let i = 0; i < cols; i++) {
      table += ` Colonne ${i + 1} |`;
    }
    table += '\n|';
    for (let i = 0; i < cols; i++) {
      table += ' --- |';
    }
    table += '\n';
    
    // Rows
    for (let r = 0; r < rows; r++) {
      table += '|';
      for (let c = 0; c < cols; c++) {
        table += ' Cellule |';
      }
      table += '\n';
    }
    
    insertFormat(table, '');
  };

  const renderPreview = (text: string) => {
    // Simple markdown-to-HTML conversion for preview
    return text
      .replace(/### (.*)/g, '<h3>$1</h3>')
      .replace(/## (.*)/g, '<h2>$1</h2>')
      .replace(/# (.*)/g, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/> (.*)/g, '<blockquote>$1</blockquote>')
      .replace(/- (.*)/g, '<li>$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;" />')
      .replace(/\n/g, '<br>');
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Éditeur de Contenu Avancé</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant={isPreviewMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              {isPreviewMode ? <Edit3 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {isPreviewMode ? 'Éditer' : 'Aperçu'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {showToolbar && !isPreviewMode && (
          <div className="border rounded-lg p-3 mb-4 bg-muted/30">
            <div className="flex flex-wrap gap-2">
              {toolbarButtons.map((group, groupIndex) => (
                <div key={group.group} className="flex items-center">
                  {groupIndex > 0 && <Separator orientation="vertical" className="mx-2 h-6" />}
                  <div className="flex space-x-1">
                    {group.buttons.map((button, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={button.action}
                        className="h-8 w-8 p-0"
                        title={button.tooltip}
                      >
                        <button.icon className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {!isPreviewMode ? (
          <Textarea
            id="rich-editor"
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[300px] resize-none font-mono text-sm"
            onSelect={(e) => {
              const textarea = e.target as HTMLTextAreaElement;
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              setSelectedText(textarea.value.substring(start, end));
            }}
          />
        ) : (
          <ScrollArea className="min-h-[300px] max-h-[500px] w-full rounded-md border p-4">
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: renderPreview(content) }}
            />
          </ScrollArea>
        )}
        
        {showToolbar && (
          <div className="flex justify-between items-center mt-4 pt-3 border-t">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{content.length} caractères</span>
              <span>{content.split(/\s+/).filter(w => w.length > 0).length} mots</span>
              <span>{content.split('\n').length} lignes</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copier
              </Button>
              <Button size="sm">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RichTextEditor;