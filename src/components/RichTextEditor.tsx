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
  Settings,
  Minus,
  CheckSquare,
  AlertTriangle,
  Info,
  CheckCircle,
  FileImage,
  Paperclip,
  ChevronDown
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
        { icon: CheckSquare, tooltip: 'Liste de tâches', action: () => insertCheckList() },
        { icon: Quote, tooltip: 'Citation', action: () => insertFormat('> ', '') },
      ]
    },
    {
      group: 'structure',
      buttons: [
        { icon: Minus, tooltip: 'Séparateur', action: () => insertSeparator() },
        { icon: ChevronDown, tooltip: 'Accordéon', action: () => insertAccordion() },
      ]
    },
    {
      group: 'callouts',
      buttons: [
        { icon: Info, tooltip: 'Callout Info', action: () => insertCallout('info') },
        { icon: AlertTriangle, tooltip: 'Callout Avertissement', action: () => insertCallout('warning') },
        { icon: CheckCircle, tooltip: 'Callout Succès', action: () => insertCallout('success') },
      ]
    },
    {
      group: 'media',
      buttons: [
        { icon: Link, tooltip: 'Lien', action: () => insertLink() },
        { icon: Image, tooltip: 'Image', action: () => insertImage() },
        { icon: FileImage, tooltip: 'Document', action: () => insertDocument() },
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

  const insertCheckList = () => {
    const textarea = document.getElementById('rich-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const text = textarea.value;
    const lineStart = text.lastIndexOf('\n', start - 1) + 1;
    
    const newText = text.substring(0, lineStart) + '- [ ] ' + text.substring(lineStart);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 6, start + 6);
    }, 0);
  };

  const insertSeparator = () => {
    insertFormat('\n\n---\n\n', '');
  };

  const insertAccordion = () => {
    const title = prompt('Titre de l\'accordéon:') || 'Titre';
    const content = prompt('Contenu de l\'accordéon:') || 'Contenu';
    
    const accordion = `\n\n<details>\n<summary>${title}</summary>\n\n${content}\n\n</details>\n\n`;
    insertFormat(accordion, '');
  };

  const insertCallout = (type: 'info' | 'warning' | 'success') => {
    const title = prompt('Titre du callout:') || 'Note';
    const content = prompt('Contenu du callout:') || 'Contenu du callout';
    
    const callout = `\n\n> **${type.toUpperCase()}**: ${title}\n> \n> ${content}\n\n`;
    insertFormat(callout, '');
  };

  const insertDocument = () => {
    const url = prompt('URL du document:');
    const name = prompt('Nom du document:') || 'Document';
    
    if (url) {
      insertFormat(`[📎 ${name}](${url})`, '');
    }
  };

  const renderPreview = (text: string) => {
    // Enhanced markdown-to-HTML conversion for preview
    return text
      // Headers
      .replace(/### (.*)/g, '<h3 class="text-lg font-semibold mb-2 mt-4">$1</h3>')
      .replace(/## (.*)/g, '<h2 class="text-xl font-semibold mb-3 mt-6">$1</h2>')
      .replace(/# (.*)/g, '<h1 class="text-2xl font-bold mb-4 mt-8">$1</h1>')
      
      // Text formatting
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/<u>(.*?)<\/u>/g, '<span class="underline">$1</span>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
      
      // Lists
      .replace(/^- \[ \] (.*)$/gm, '<div class="flex items-center space-x-2 my-1"><input type="checkbox" disabled class="rounded"> <span>$1</span></div>')
      .replace(/^- \[x\] (.*)$/gm, '<div class="flex items-center space-x-2 my-1"><input type="checkbox" checked disabled class="rounded"> <span class="line-through text-gray-500">$1</span></div>')
      .replace(/^- (.*)$/gm, '<li class="ml-4">• $1</li>')
      .replace(/^[0-9]+\. (.*)$/gm, '<li class="ml-4 list-decimal">$1</li>')
      
      // Quotes
      .replace(/^> (.*)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2">$1</blockquote>')
      
      // Separators
      .replace(/^---$/gm, '<hr class="my-6 border-gray-300">')
      
      // Callouts (enhanced)
      .replace(/^> \*\*INFO\*\*: (.*)$/gm, '<div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-4"><div class="flex"><div class="flex-shrink-0">ℹ️</div><div class="ml-3"><h4 class="text-sm font-medium text-blue-800">$1</h4></div></div></div>')
      .replace(/^> \*\*WARNING\*\*: (.*)$/gm, '<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4"><div class="flex"><div class="flex-shrink-0">⚠️</div><div class="ml-3"><h4 class="text-sm font-medium text-yellow-800">$1</h4></div></div></div>')
      .replace(/^> \*\*SUCCESS\*\*: (.*)$/gm, '<div class="bg-green-50 border-l-4 border-green-400 p-4 my-4"><div class="flex"><div class="flex-shrink-0">✅</div><div class="ml-3"><h4 class="text-sm font-medium text-green-800">$1</h4></div></div></div>')
      
      // Accordions/Details
      .replace(/<details>([\s\S]*?)<\/details>/g, (match, content) => {
        const summaryMatch = content.match(/<summary>(.*?)<\/summary>/);
        const summary = summaryMatch ? summaryMatch[1] : 'Détails';
        const actualContent = content.replace(/<summary>.*?<\/summary>/, '').trim();
        return `<details class="border rounded-lg p-4 my-4"><summary class="font-semibold cursor-pointer hover:text-primary">${summary}</summary><div class="mt-2 pt-2 border-t">${actualContent}</div></details>`;
      })
      
      // Links and images
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-blue-600 hover:text-blue-800 underline">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />')
      
      // Line breaks
      .replace(/\n\n/g, '<br><br>')
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