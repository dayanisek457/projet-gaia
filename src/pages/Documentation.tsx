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
  CheckCircle,
  X,
  Plus,
  Edit3,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Sample documentation content structure
interface DocSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'accordion' | 'table' | 'callout' | 'checklist';
  data?: any;
}

const Documentation = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [docSections, setDocSections] = useState<DocSection[]>([
    {
      id: 'overview',
      title: 'Vue d\'ensemble du Projet GAIA',
      content: 'Le projet GAIA révolutionne la reforestation grâce à l\'intelligence artificielle et aux technologies de pointe.',
      type: 'text'
    },
    {
      id: 'features',
      title: 'Fonctionnalités Principales',
      content: '',
      type: 'accordion',
      data: {
        items: [
          {
            id: 'ai-analysis',
            title: 'Analyse IA du Terrain',
            content: 'Notre système d\'intelligence artificielle analyse les conditions du sol, la topographie, et les conditions climatiques pour optimiser la plantation.'
          },
          {
            id: 'drone-monitoring',
            title: 'Surveillance par Drones',
            content: 'Des drones équipés de capteurs IoT surveillent en temps réel la croissance des arbres et l\'état de santé de la forêt.'
          },
          {
            id: 'species-selection',
            title: 'Sélection d\'Espèces Optimale',
            content: 'Algorithmes avancés pour sélectionner les espèces d\'arbres les plus adaptées à chaque zone géographique.'
          }
        ]
      }
    },
    {
      id: 'specifications',
      title: 'Spécifications Techniques',
      content: '',
      type: 'table',
      data: {
        headers: ['Composant', 'Technologie', 'Performance', 'Statut'],
        rows: [
          ['Capteurs IoT', 'LoRaWAN', '10km de portée', 'Déployé'],
          ['Analyse IA', 'TensorFlow', '95% précision', 'En développement'],
          ['Drones', 'Autonomie 2h', '50ha couverture', 'Test pilote'],
          ['Application Mobile', 'React Native', 'iOS/Android', 'Beta']
        ]
      }
    },
    {
      id: 'alerts',
      title: 'Informations Importantes',
      content: '',
      type: 'callout',
      data: {
        callouts: [
          {
            type: 'info',
            title: 'Information',
            content: 'Ce projet est développé dans le cadre du programme d\'innovation écologique du lycée Saint-Joseph.'
          },
          {
            type: 'warning',
            title: 'Attention',
            content: 'Les données de surveillance en temps réel nécessitent une connexion internet stable.'
          },
          {
            type: 'success',
            title: 'Succès',
            content: 'Premier déploiement réussi sur 10 hectares avec 98% de taux de survie des plants.'
          }
        ]
      }
    },
    {
      id: 'roadmap',
      title: 'Feuille de Route',
      content: '',
      type: 'checklist',
      data: {
        items: [
          { id: 1, text: 'Développement du prototype IA', completed: true },
          { id: 2, text: 'Tests sur terrain pilote', completed: true },
          { id: 3, text: 'Intégration des capteurs IoT', completed: false },
          { id: 4, text: 'Déploiement des drones de surveillance', completed: false },
          { id: 5, text: 'Lancement de l\'application mobile', completed: false },
          { id: 6, text: 'Expansion à 100 hectares', completed: false }
        ]
      }
    }
  ]);

  const navigation = [
    { id: 'overview', title: 'Vue d\'ensemble', icon: Book },
    { id: 'features', title: 'Fonctionnalités', icon: Zap },
    { id: 'specifications', title: 'Spécifications', icon: Settings },
    { id: 'alerts', title: 'Alertes', icon: Info },
    { id: 'roadmap', title: 'Roadmap', icon: Users }
  ];

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

  const renderContent = (section: DocSection) => {
    switch (section.type) {
      case 'text':
        return <p className="text-muted-foreground leading-relaxed">{section.content}</p>;
      
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
              <Button
                variant={isEditMode ? "default" : "outline"}
                onClick={() => setIsEditMode(!isEditMode)}
                className="flex items-center space-x-2"
              >
                {isEditMode ? <EyeOff className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                <span>{isEditMode ? 'Mode Lecture' : 'Mode Édition'}</span>
              </Button>
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
                {docSections
                  .filter(section => section.id === activeSection)
                  .map(section => (
                    <div key={section.id} className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-display font-bold text-foreground">
                          {section.title}
                        </h2>
                        {isEditMode && (
                          <Button size="sm" variant="outline" className="flex items-center space-x-2">
                            <Edit3 className="h-4 w-4" />
                            <span>Éditer</span>
                          </Button>
                        )}
                      </div>
                      
                      <Separator />
                      
                      <div className="prose prose-lg max-w-none">
                        {renderContent(section)}
                      </div>
                      
                      {isEditMode && (
                        <div className="flex justify-end space-x-2 pt-6 border-t">
                          <Button variant="outline" size="sm">
                            <X className="h-4 w-4 mr-2" />
                            Annuler
                          </Button>
                          <Button size="sm">
                            <Save className="h-4 w-4 mr-2" />
                            Sauvegarder
                          </Button>
                        </div>
                      )}
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