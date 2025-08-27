import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, 
  Book, 
  FileText, 
  Settings, 
  Users, 
  Zap,
  Info,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useDocumentation, DocSection } from '@/hooks/useDocumentation';

const Documentation = () => {
  const { publishedSections, isLoading } = useDocumentation();
  const [activeSection, setActiveSection] = useState('overview');

  // Update active section when sections load
  useEffect(() => {
    if (publishedSections.length > 0 && !publishedSections.find(s => s.id === activeSection)) {
      setActiveSection(publishedSections[0].id);
    }
  }, [publishedSections, activeSection]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
        <Header />
        <main className="container mx-auto px-6 pt-32 pb-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Chargement de la documentation...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const navigation = publishedSections.map(section => {
    const iconMap: Record<string, any> = {
      'overview': Book,
      'features': Zap,
      'specifications': Settings,
      'alerts': Info,
      'roadmap': Users
    };
    
    return {
      id: section.id,
      title: section.title,
      icon: iconMap[section.id] || FileText
    };
  });

  const renderCallout = (type: string, title: string, content: string) => {
    const icons = {
      info: Info,
      warning: AlertTriangle,
      success: CheckCircle
    };
    
    const variants = {
      info: 'border-blue-200 bg-blue-50',
      warning: 'border-yellow-200 bg-yellow-50',
      success: 'border-green-200 bg-green-50'
    };

    const IconComponent = icons[type as keyof typeof icons] || Info;

    return (
      <Alert className={`${variants[type as keyof typeof variants]} border-l-4`}>
        <IconComponent className="h-4 w-4" />
        <AlertTitle className="font-semibold">{title}</AlertTitle>
        <AlertDescription>{content}</AlertDescription>
      </Alert>
    );
  };

  const renderTable = (headers: string[], rows: string[][]) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-primary/5">
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-3 text-left font-semibold text-primary">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 px-4 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderChecklist = (items: { id: number; text: string; completed: boolean }[]) => (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-3">
          <Checkbox 
            checked={item.completed} 
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <span className={`${item.completed ? 'line-through text-muted-foreground' : 'text-foreground'} text-sm`}>
            {item.text}
          </span>
          {item.completed && <Badge variant="secondary" className="ml-auto">Terminé</Badge>}
        </div>
      ))}
    </div>
  );

  const renderMarkdown = (text: string) => {
    // Enhanced markdown-to-HTML conversion for public display
    const html = text
      // Headers
      .replace(/### (.*)/g, '<h3 class="text-lg font-semibold mb-2 mt-4 text-foreground">$1</h3>')
      .replace(/## (.*)/g, '<h2 class="text-xl font-semibold mb-3 mt-6 text-foreground">$1</h2>')
      .replace(/# (.*)/g, '<h1 class="text-2xl font-bold mb-4 mt-8 text-foreground">$1</h1>')
      
      // Text formatting
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/<u>(.*?)<\/u>/g, '<span class="underline">$1</span>')
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      
      // Lists
      .replace(/^- \[ \] (.*)$/gm, '<div class="flex items-center space-x-2 my-1"><input type="checkbox" disabled class="rounded border-gray-300"> <span class="text-muted-foreground">$1</span></div>')
      .replace(/^- \[x\] (.*)$/gm, '<div class="flex items-center space-x-2 my-1"><input type="checkbox" checked disabled class="rounded border-gray-300"> <span class="line-through text-muted-foreground">$1</span></div>')
      .replace(/^- (.*)$/gm, '<li class="ml-4 text-muted-foreground">• $1</li>')
      .replace(/^[0-9]+\. (.*)$/gm, '<li class="ml-4 list-decimal text-muted-foreground">$1</li>')
      
      // Quotes
      .replace(/^> (.*)$/gm, '<blockquote class="border-l-4 border-primary/30 pl-4 italic text-muted-foreground my-2">$1</blockquote>')
      
      // Separators
      .replace(/^---$/gm, '<hr class="my-6 border-border">')
      
      // Callouts (enhanced)
      .replace(/^> \*\*INFO\*\*: (.*)$/gm, '<div class="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 p-4 my-4 rounded-r"><div class="flex"><div class="flex-shrink-0 text-blue-600">ℹ️</div><div class="ml-3"><h4 class="text-sm font-medium text-blue-800 dark:text-blue-200">$1</h4></div></div></div>')
      .replace(/^> \*\*WARNING\*\*: (.*)$/gm, '<div class="bg-yellow-50 dark:bg-yellow-950/30 border-l-4 border-yellow-400 p-4 my-4 rounded-r"><div class="flex"><div class="flex-shrink-0 text-yellow-600">⚠️</div><div class="ml-3"><h4 class="text-sm font-medium text-yellow-800 dark:text-yellow-200">$1</h4></div></div></div>')
      .replace(/^> \*\*SUCCESS\*\*: (.*)$/gm, '<div class="bg-green-50 dark:bg-green-950/30 border-l-4 border-green-400 p-4 my-4 rounded-r"><div class="flex"><div class="flex-shrink-0 text-green-600">✅</div><div class="ml-3"><h4 class="text-sm font-medium text-green-800 dark:text-green-200">$1</h4></div></div></div>')
      
      // Accordions/Details
      .replace(/<details>([\s\S]*?)<\/details>/g, (match, content) => {
        const summaryMatch = content.match(/<summary>(.*?)<\/summary>/);
        const summary = summaryMatch ? summaryMatch[1] : 'Détails';
        const actualContent = content.replace(/<summary>.*?<\/summary>/, '').trim();
        return `<details class="border border-border rounded-lg p-4 my-4 bg-card"><summary class="font-semibold cursor-pointer hover:text-primary">${summary}</summary><div class="mt-2 pt-2 border-t border-border text-muted-foreground">${actualContent}</div></details>`;
      })
      
      // Tables (basic support)
      .replace(/\|(.+)\|/g, (match, content) => {
        const cells = content.split('|').map(cell => cell.trim());
        const cellsHtml = cells.map(cell => `<td class="border border-border px-4 py-2 text-muted-foreground">${cell}</td>`).join('');
        return `<tr>${cellsHtml}</tr>`;
      })
      
      // Links and images
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-primary hover:text-primary/80 underline">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4 shadow-md" />')
      
      // Line breaks
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');

    return html;
  };

  const renderContent = (section: DocSection) => {
    switch (section.type) {
      case 'text':
        return <p className="text-muted-foreground leading-relaxed">{section.content}</p>;
      
      case 'rich':
        return (
          <div 
            className="prose prose-sm max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(section.content) }}
          />
        );
      
      case 'accordion':
        return (
          <Accordion type="single" collapsible className="w-full">
            {section.data?.items?.map((item: any) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-left font-medium hover:text-primary">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        );
      
      case 'table':
        return renderTable(section.data?.headers || [], section.data?.rows || []);
      
      case 'callout':
        return (
          <div className="space-y-4">
            {section.data?.callouts?.map((callout: any, index: number) => (
              <div key={index}>
                {renderCallout(callout.type, callout.title, callout.content)}
              </div>
            ))}
          </div>
        );
      
      case 'checklist':
        return renderChecklist(section.data?.items || []);
      
      default:
        return <p className="text-muted-foreground">Contenu non disponible</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <Header />
      
      <main className="container mx-auto px-6 pt-32 pb-16">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span>Retour à l'accueil</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/admin" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <FileText className="h-4 w-4" />
              <span>Documentation Technique</span>
            </div>
            <h1 className="text-5xl font-display font-black bg-gradient-primary bg-clip-text text-transparent mb-4">
              Documentation GAIA
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Guide complet du projet de reforestation intelligente avec IA, IoT et surveillance par drones
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="glass sticky top-32">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Book className="h-5 w-5" />
                  <span>Sections</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? "default" : "ghost"}
                      className="w-full justify-start space-x-2 text-left"
                      onClick={() => setActiveSection(item.id)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="glass">
              <CardContent className="p-8">
                {publishedSections
                  .filter(section => section.id === activeSection)
                  .map(section => (
                    <div key={section.id} className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-display font-bold text-foreground">
                          {section.title}
                        </h2>
                      </div>
                      
                      <Separator />
                      
                      <div className="prose prose-lg max-w-none">
                        {renderContent(section)}
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Documentation;