import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Home,
  TreePine,
  Lightbulb,
  MapPin,
  Users,
  Heart,
  Mail,
  ExternalLink,
  Zap,
  Leaf,
  Wind,
  Droplets,
  AlertTriangle,
  Calendar,
  Sparkles,
  BookOpen,
  Image,
  Camera,
  Cpu,
  Globe,
  Target,
  List,
  CheckCircle2,
} from 'lucide-react';
import { roadmapService, type RoadmapItem } from '@/lib/supabase-roadmap';
import { sponsorsService, type Sponsor } from '@/lib/supabase-sponsors';
import { documentationService, type DocSection } from '@/lib/supabase-documentation';

const Presentation = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [docSections, setDocSections] = useState<DocSection[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        const [roadmap, sponsorsList, documentation] = await Promise.all([
          roadmapService.getAllItems(),
          sponsorsService.getSponsors(),
          documentationService.getPublishedSections(),
        ]);
        setRoadmapItems(roadmap); // Show all roadmap items
        setSponsors(sponsorsList);
        setDocSections(documentation); // Get all doc sections
      } catch (error) {
        console.error('Error loading presentation data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Update carousel state
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/');
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        api?.scrollNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        api?.scrollPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [api, navigate]);

  const handleNavigateToPage = (path: string) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-primary/20 to-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl">Chargement de la présentation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-primary/20 to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-32 right-16 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/10 backdrop-blur-sm text-white border-white/20">
              Mode Présentation
            </Badge>
            <span className="text-white/70 text-sm">
              {current} / {count}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10 backdrop-blur-sm"
              title="Retour à l'accueil (Échap)"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Carousel */}
      <div className="container mx-auto px-4 h-screen flex items-center justify-center relative z-10">
        <Carousel
          setApi={setApi}
          className="w-full max-w-7xl"
          opts={{
            align: 'center',
            loop: false,
          }}
        >
          <CarouselContent>
            {/* Slide 1: Cover/Hero */}
            <CarouselItem>
              <div className="h-[80vh] flex items-center justify-center p-8">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl flex items-center justify-center">
                  <div className="text-center space-y-8 p-12">
                    <div className="inline-block animate-scale-in">
                      <img 
                        src="/logo.png" 
                        alt="Logo Gaia" 
                        className="h-32 w-32 mx-auto mb-6 object-contain"
                      />
                    </div>
                    <h1 className="text-7xl md:text-8xl font-display font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in-up">
                      Gaia
                    </h1>
                    <p className="text-3xl md:text-4xl text-gray-700 font-semibold animate-fade-in-up-delayed">
                      L'avenir de la reforestation intelligente
                    </p>
                    <div className="pt-6 space-y-4 animate-scale-in-delayed">
                      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Un drone électrique autonome et intelligent pour accélérer 
                        la reforestation mondiale et restaurer durablement nos écosystèmes.
                      </p>
                      <Badge className="text-lg px-6 py-2 bg-primary hover:bg-primary/90">
                        Lycée Saint-Joseph Dijon
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* Slide 2: Contexte */}
            <CarouselItem>
              <div className="h-[80vh] flex items-center justify-center p-8">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-auto">
                  <div className="p-12 space-y-8">
                    <div className="text-center space-y-4">
                      <h2 className="text-5xl font-display font-bold text-gray-900 flex items-center justify-center gap-4">
                        <Globe className="h-12 w-12 text-primary" />
                        Contexte Mondial
                      </h2>
                      <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
                        La reforestation au cœur des enjeux climatiques
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 bg-green-500 rounded-lg">
                            <TreePine className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-green-900">Déforestation</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-green-800">
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">•</span>
                            <span>10 millions d'hectares de forêts perdus chaque année</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">•</span>
                            <span>Perte de biodiversité massive et irréversible</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">•</span>
                            <span>Impact direct sur le réchauffement climatique</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 bg-orange-500 rounded-lg">
                            <AlertTriangle className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-orange-900">Urgence Climatique</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-orange-800">
                          <li className="flex items-start gap-2">
                            <span className="text-orange-600 mt-0.5">•</span>
                            <span>Température mondiale en hausse de +1.5°C d'ici 2040</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-600 mt-0.5">•</span>
                            <span>Événements climatiques extrêmes en augmentation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-600 mt-0.5">•</span>
                            <span>Fenêtre d'action limitée pour inverser la tendance</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 bg-blue-500 rounded-lg">
                            <Leaf className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-blue-900">Importance des Arbres</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-blue-800">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-0.5">•</span>
                            <span>Captent 30% des émissions de CO2 mondiales</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-0.5">•</span>
                            <span>Régulent le cycle de l'eau et protègent les sols</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-0.5">•</span>
                            <span>Abritent 80% de la biodiversité terrestre</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 bg-purple-500 rounded-lg">
                            <Target className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-purple-900">Objectifs Mondiaux</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-purple-800">
                          <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-0.5">•</span>
                            <span>Planter 1 trillion d'arbres d'ici 2030 (ONU)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-0.5">•</span>
                            <span>Restaurer 350 millions d'hectares de forêts</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-0.5">•</span>
                            <span>Limiter le réchauffement à +1.5°C</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl border-2 border-primary/20 text-center">
                      <p className="text-lg text-gray-700 font-semibold">
                        La reforestation est l'une des solutions les plus efficaces pour lutter contre le changement climatique
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* Slide 3: Problématique */}
            <CarouselItem>
              <div className="h-[80vh] flex items-center justify-center p-8">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-auto">
                  <div className="p-12 space-y-8">
                    <div className="text-center space-y-4">
                      <h2 className="text-5xl font-display font-bold text-gray-900 flex items-center justify-center gap-4">
                        <AlertTriangle className="h-12 w-12 text-orange-500" />
                        Face à l'urgence climatique
                      </h2>
                      <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
                        Notre projet Gaia répond aux défis environnementaux majeurs
                      </p>
                    </div>

                    {/* Problématique box */}
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl border-2 border-primary/20 text-center">
                      <h3 className="text-2xl font-bold text-primary mb-4">Problématique</h3>
                      <p className="text-xl text-gray-700 leading-relaxed">
                        Comment utiliser les technologies aériennes pour accélérer la reforestation 
                        et restaurer durablement les écosystèmes dégradés face à l'urgence climatique mondiale ?
                      </p>
                    </div>

                    {/* Challenges Grid */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white/80 p-6 rounded-xl shadow-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-3 bg-red-100 rounded-lg">
                            <TreePine className="h-6 w-6 text-red-600" />
                          </div>
                          <h4 className="font-bold text-lg">Déforestation massive</h4>
                        </div>
                        <p className="text-gray-600 text-sm">Le Sahara avance de 5-10 km/an dans les forêts tropicales</p>
                      </div>

                      <div className="bg-white/80 p-6 rounded-xl shadow-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <Droplets className="h-6 w-6 text-blue-600" />
                          </div>
                          <h4 className="font-bold text-lg">Montée des eaux</h4>
                        </div>
                        <p className="text-gray-600 text-sm">Plus d'1 milliard de personnes devront migrer d'ici 2050</p>
                      </div>

                      <div className="bg-white/80 p-6 rounded-xl shadow-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-3 bg-green-100 rounded-lg">
                            <Wind className="h-6 w-6 text-green-600" />
                          </div>
                          <h4 className="font-bold text-lg">Dérèglement climatique</h4>
                        </div>
                        <p className="text-gray-600 text-sm">Urgence d'agir face aux changements globaux</p>
                      </div>

                      <div className="bg-white/80 p-6 rounded-xl shadow-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-3 bg-orange-100 rounded-lg">
                            <AlertTriangle className="h-6 w-6 text-orange-600" />
                          </div>
                          <h4 className="font-bold text-lg">Solutions coûteuses</h4>
                        </div>
                        <p className="text-gray-600 text-sm">Méthodes actuelles onéreuses et polluantes</p>
                      </div>
                    </div>

                    <div className="text-center pt-4">
                      <Button
                        size="lg"
                        onClick={() => handleNavigateToPage('/')}
                        className="bg-primary hover:bg-primary/90"
                      >
                        En savoir plus
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* Slide 3: Notre Solution */}
            <CarouselItem>
              <div className="h-[80vh] flex items-center justify-center p-8">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-auto">
                  <div className="p-12 space-y-8">
                    <div className="text-center space-y-4">
                      <h2 className="text-5xl font-display font-bold text-gray-900 flex items-center justify-center gap-4">
                        <Lightbulb className="h-12 w-12 text-yellow-500" />
                        Notre Solution : Gaia
                      </h2>
                      <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        Un avion 100% électrique intelligent avec batterie haute capacité, 
                        muni d'une soute pour larguer des Seedballs.
                      </p>
                    </div>

                    {/* Key Benefits */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl text-center border-2 border-green-200 shadow-lg">
                        <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                          <Zap className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">100% Écologique</h3>
                        <p className="text-green-700 text-sm">Zéro émission de gaz à effet de serre</p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl text-center border-2 border-blue-200 shadow-lg">
                        <div className="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                          <Wind className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-blue-800 mb-2">Autonome</h3>
                        <p className="text-blue-700 text-sm">Pilotage à distance et automatisé</p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl text-center border-2 border-purple-200 shadow-lg">
                        <div className="mx-auto w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                          <Leaf className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-purple-800 mb-2">Économique</h3>
                        <p className="text-purple-700 text-sm">Alternative abordable aux hélicoptères</p>
                      </div>
                    </div>

                    {/* Vision d'avenir */}
                    <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-2xl border-2 border-primary/30 text-center">
                      <div className="flex justify-center mb-4">
                        <Sparkles className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision d'Avenir</h3>
                      <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                        Avec les progrès de l'aéronautique, Gaia pourra être produit à grande échelle 
                        tout en restant écologique, notamment grâce aux futures technologies à hydrogène.
                      </p>
                    </div>

                    <div className="text-center pt-4">
                      <Button
                        size="lg"
                        onClick={() => handleNavigateToPage('/')}
                        className="bg-secondary hover:bg-secondary/90"
                      >
                        Découvrir le projet complet
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* Slide 4: Roadmap */}
            <CarouselItem>
              <div className="h-[80vh] flex items-center justify-center p-8">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-hidden">
                  <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-8 pb-6 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-secondary/5">
                      <div className="text-center space-y-3">
                        <div className="flex items-center justify-center gap-3">
                          <MapPin className="h-10 w-10 text-primary" />
                          <h2 className="text-4xl font-display font-bold text-gray-900">
                            Roadmap du Projet
                          </h2>
                        </div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                          Suivez les étapes clés du développement de Gaia
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-auto p-8">
                      {roadmapItems.length > 0 ? (
                        <div className="space-y-4 max-w-5xl mx-auto">
                          {/* Progress Overview */}
                          {(() => {
                            const completedCount = roadmapItems.filter(item => item.status === 'completed').length;
                            const inProgressCount = roadmapItems.filter(item => item.status === 'in-progress').length;
                            const totalCount = roadmapItems.length;
                            const progressPercentage = Math.round(((completedCount + inProgressCount * 0.5) / totalCount) * 100);
                            
                            return (
                              <div className="mb-6 p-5 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-sm font-semibold text-gray-700">Progression globale</span>
                                  <span className="text-2xl font-bold text-primary">{progressPercentage}%</span>
                                </div>
                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                                    style={{ width: `${progressPercentage}%` }}
                                  ></div>
                                </div>
                                <div className="flex items-center justify-center gap-6 mt-3 text-xs">
                                  <span className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                    {completedCount} terminé{completedCount > 1 ? 's' : ''}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                    {inProgressCount} en cours
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                                    {totalCount - completedCount - inProgressCount} planifié{totalCount - completedCount - inProgressCount > 1 ? 's' : ''}
                                  </span>
                                </div>
                              </div>
                            );
                          })()}

                          {/* Roadmap Items - Show ALL items in scrollable view */}
                          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
                            {roadmapItems.map((item, index) => (
                              <div key={item.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {index + 1}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                      <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                                      <Badge className={`text-xs px-2 py-0.5 ${
                                        item.status === 'completed' ? 'bg-green-500' :
                                        item.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-500'
                                      }`}>
                                        {item.status === 'completed' ? '✓ Terminé' :
                                         item.status === 'in-progress' ? '⚡ En cours' : '📅 Planifié'}
                                      </Badge>
                                      <div className="flex items-center text-xs text-gray-500 ml-auto">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {item.timeline}
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                    {item.content && (
                                      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100">
                                        <p className="line-clamp-2">
                                          {item.content.replace(/<[^>]*>/g, '').substring(0, 150)}
                                          {item.content.length > 150 && '...'}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="text-center text-sm text-gray-600 pt-2 bg-primary/5 p-3 rounded-lg">
                            <CheckCircle2 className="inline h-4 w-4 mr-1 text-primary" />
                            Affichage de {roadmapItems.length} étape{roadmapItems.length > 1 ? 's' : ''} au total
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-16">
                          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-xl text-gray-600 font-medium">Roadmap en cours de chargement...</p>
                          <p className="text-sm text-gray-500 mt-2">Les données de la roadmap seront bientôt disponibles</p>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-200 bg-gray-50/50">
                      <Button
                        size="lg"
                        onClick={() => handleNavigateToPage('/roadmap')}
                        className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg"
                      >
                        <MapPin className="mr-2 h-5 w-5" />
                        Voir la roadmap complète
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* Slide 5: L'Équipe */}
            <CarouselItem>
              <div className="h-[80vh] flex items-center justify-center p-8">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-auto">
                  <div className="p-12 space-y-8">
                    <div className="text-center space-y-4">
                      <h2 className="text-5xl font-display font-bold text-gray-900 flex items-center justify-center gap-4">
                        <Users className="h-12 w-12 text-primary" />
                        Notre Équipe
                      </h2>
                      <p className="text-2xl text-gray-600">
                        Une équipe passionnée d'étudiants de Terminale SI
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {[
                        { name: 'Nathan LIENARD', role: 'Développement Technique', desc: 'Câblage et conception aéronautique' },
                        { name: 'Constant MOREAU', role: 'Systèmes internes et externes', desc: 'Conception et développement technique' },
                        { name: 'Hugues DUCHANOY', role: 'Modélisation 3D', desc: 'Architecture et intégration' },
                        { name: 'Yanis EL-KFEL', role: 'Physique et Communication', desc: 'Bases de calculs physiques' },
                        { name: 'Aloys GROUET', role: 'Optimisation 3D', desc: 'Affinement et détails 3D' },
                      ].map((member, index) => (
                        <div key={index} className="bg-white/80 p-6 rounded-xl shadow-lg border border-gray-200 text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h3>
                          <Badge variant="secondary" className="mb-2">{member.role}</Badge>
                          <p className="text-sm text-gray-600">{member.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-center text-white shadow-xl">
                      <h3 className="text-2xl font-bold mb-2">Lycée Saint-Joseph Dijon</h3>
                      <p className="text-lg mb-1">Projet de Terminale - Sciences de l'Ingénieur</p>
                      <p className="text-white/90">Période d'exécution : Juin 2025 - Juin 2026</p>
                    </div>

                    <div className="text-center pt-4">
                      <Button
                        size="lg"
                        onClick={() => handleNavigateToPage('/')}
                        className="bg-primary hover:bg-primary/90"
                      >
                        En savoir plus sur l'équipe
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* Slide 6: Partenaires */}
            <CarouselItem>
              <div className="h-[80vh] flex items-center justify-center p-8">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-auto">
                  <div className="p-12 space-y-8">
                    <div className="text-center space-y-4">
                      <h2 className="text-5xl font-display font-bold text-gray-900 flex items-center justify-center gap-4">
                        <Heart className="h-12 w-12 text-red-500" />
                        Nos Partenaires
                      </h2>
                      <p className="text-2xl text-gray-600">
                        Ils soutiennent notre mission de reforestation
                      </p>
                    </div>

                    {sponsors.length > 0 ? (
                      <div className="grid grid-cols-3 gap-6">
                        {sponsors.slice(0, 6).map((sponsor) => (
                          <div key={sponsor.id} className="bg-white/80 p-6 rounded-xl shadow-lg border border-gray-200">
                            {sponsor.logo_url && (
                              <div className="w-full h-24 flex items-center justify-center mb-4 bg-gray-50 rounded-lg">
                                <img
                                  src={sponsor.logo_url}
                                  alt={sponsor.name}
                                  className="max-h-20 max-w-full object-contain"
                                />
                              </div>
                            )}
                            <h3 className="font-bold text-lg text-gray-900 text-center mb-2">{sponsor.name}</h3>
                            <Badge variant="secondary" className="w-full justify-center mb-2">
                              {sponsor.category}
                            </Badge>
                            <p className="text-sm text-gray-600 text-center line-clamp-2">{sponsor.description}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-xl text-gray-600 mb-6">Nous recherchons nos premiers partenaires</p>
                        <p className="text-gray-500">Devenez pionnier de cette révolution écologique !</p>
                      </div>
                    )}

                    {/* Pack Sponsor Info */}
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl border-2 border-primary/20 text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Pack Sponsor - À partir de 50€</h3>
                      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                        <div className="flex items-start gap-3">
                          <div className="text-green-600 text-xl">✓</div>
                          <div>
                            <p className="font-semibold">Promotion Réseaux Sociaux</p>
                            <p className="text-sm text-gray-600">Via SkyX International</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="text-green-600 text-xl">✓</div>
                          <div>
                            <p className="font-semibold">Logo sur l'Avion</p>
                            <p className="text-sm text-gray-600">Visibilité exceptionnelle</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-4">
                      <Button
                        size="lg"
                        onClick={() => handleNavigateToPage('/partenaires')}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        <Heart className="mr-2 h-5 w-5" />
                        Devenir Partenaire
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* Slide 7: Documentation */}
            <CarouselItem>
              <div className="h-[80vh] flex items-center justify-center p-8">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-hidden">
                  <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-8 pb-6 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-secondary/5">
                      <div className="text-center space-y-3">
                        <div className="flex items-center justify-center gap-3">
                          <BookOpen className="h-10 w-10 text-primary" />
                          <h2 className="text-4xl font-display font-bold text-gray-900">
                            Documentation Technique
                          </h2>
                        </div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                          Spécifications, technologies et architecture du système
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-auto p-8">
                      {docSections.length > 0 ? (
                        <div className="space-y-4 max-w-5xl mx-auto">
                          {/* Show ALL documentation sections in scrollable view */}
                          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
                            {docSections.map((section, index) => (
                              <div key={section.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {index + 1}
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2 flex-wrap">
                                      {section.title}
                                      <Badge variant="secondary" className="text-xs">
                                        {section.type === 'rich' ? '📝 Rich' : 
                                         section.type === 'accordion' ? '📋 Accordion' :
                                         section.type === 'table' ? '📊 Table' :
                                         section.type === 'callout' ? '💡 Callout' :
                                         section.type === 'checklist' ? '✅ Checklist' : '📄 Text'}
                                      </Badge>
                                    </h3>
                                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-100">
                                      <p className="line-clamp-3 leading-relaxed">
                                        {section.content.replace(/<[^>]*>/g, '').replace(/\n+/g, ' ').substring(0, 250)}
                                        {section.content.length > 250 && '...'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="text-center text-sm text-gray-600 pt-2 bg-primary/5 p-3 rounded-lg">
                            <BookOpen className="inline h-4 w-4 mr-1 text-primary" />
                            Affichage de {docSections.length} section{docSections.length > 1 ? 's' : ''} au total
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-md text-center">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                              <BookOpen className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-base font-bold text-blue-900 mb-2">Documentation Complète</h3>
                            <p className="text-sm text-blue-700">
                              Spécifications techniques et guide d'utilisation détaillé
                            </p>
                          </div>

                          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-md text-center">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Zap className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-base font-bold text-green-900 mb-2">Technologies Utilisées</h3>
                            <p className="text-sm text-green-700">
                              React, TypeScript, Supabase, IoT et Intelligence Artificielle
                            </p>
                          </div>

                          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-md text-center">
                            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                              <TreePine className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-base font-bold text-purple-900 mb-2">Impact Environnemental</h3>
                            <p className="text-sm text-purple-700">
                              Solution 100% écologique avec zéro émission
                            </p>
                          </div>

                          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 shadow-md text-center">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-base font-bold text-orange-900 mb-2">Innovation</h3>
                            <p className="text-sm text-orange-700">
                              Technologie de pointe combinant drones et IA
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Info Box */}
                      <div className="mt-6 bg-gradient-to-r from-primary/10 to-secondary/10 p-5 rounded-xl border border-primary/20 text-center max-w-5xl mx-auto">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          La documentation contient tous les détails techniques, les spécifications du drone, 
                          l'architecture du système, et les résultats de nos tests en conditions réelles.
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-200 bg-gray-50/50">
                      <Button
                        size="lg"
                        onClick={() => handleNavigateToPage('/documentation')}
                        className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg"
                      >
                        <BookOpen className="mr-2 h-5 w-5" />
                        Consulter la documentation complète
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* Slide 8: Galerie Technique / Développement */}
            <CarouselItem>
              <div className="h-[80vh] flex items-center justify-center p-8">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-auto">
                  <div className="p-12 space-y-8">
                    <div className="text-center space-y-4">
                      <h2 className="text-5xl font-display font-bold text-gray-900 flex items-center justify-center gap-4">
                        <Camera className="h-12 w-12 text-primary" />
                        Galerie Technique
                      </h2>
                      <p className="text-2xl text-gray-600">
                        Nos prototypes et développements en cours
                      </p>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-3 gap-6">
                      {/* Image 1 - Transmission camera */}
                      <div className="bg-white/80 rounded-xl shadow-lg border border-gray-200 overflow-hidden group">
                        <div className="aspect-video overflow-hidden bg-gray-100">
                          <img
                            src="/gallery/IMG_20251219_085053.jpg"
                            alt="Transmission caméra vidéo"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Camera className="h-5 w-5 text-primary" />
                            <h3 className="font-bold text-gray-900">Système Vidéo</h3>
                          </div>
                          <p className="text-sm text-gray-600">Transmission caméra vidéo embarquée</p>
                        </div>
                      </div>

                      {/* Image 2 - SOLIDWORKS design */}
                      <div className="bg-white/80 rounded-xl shadow-lg border border-gray-200 overflow-hidden group">
                        <div className="aspect-video overflow-hidden bg-gray-100">
                          <img
                            src="/gallery/IMG_20251219_085234.jpg"
                            alt="Système de largage de graines"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Cpu className="h-5 w-5 text-primary" />
                            <h3 className="font-bold text-gray-900">Design 3D</h3>
                          </div>
                          <p className="text-sm text-gray-600">Système de largage - SOLIDWORKS</p>
                        </div>
                      </div>

                      {/* Image 3 - Backend */}
                      <div className="bg-white/80 rounded-xl shadow-lg border border-gray-200 overflow-hidden group">
                        <div className="aspect-video overflow-hidden bg-gray-100">
                          <img
                            src="/gallery/IMG_20251219_085708.jpg"
                            alt="Backend du site web"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="h-5 w-5 text-primary" />
                            <h3 className="font-bold text-gray-900">Backend Web</h3>
                          </div>
                          <p className="text-sm text-gray-600">Infrastructure technique du site</p>
                        </div>
                      </div>

                      {/* Image 4 - Type aile */}
                      <div className="bg-white/80 rounded-xl shadow-lg border border-gray-200 overflow-hidden group">
                        <div className="aspect-video overflow-hidden bg-gray-100">
                          <img
                            src="/gallery/type_aile2.png"
                            alt="Conception de l'aile"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Wind className="h-5 w-5 text-primary" />
                            <h3 className="font-bold text-gray-900">Aérodynamique</h3>
                          </div>
                          <p className="text-sm text-gray-600">Conception et type d'aile</p>
                        </div>
                      </div>

                      {/* Image 5 - Screenshots */}
                      <div className="bg-white/80 rounded-xl shadow-lg border border-gray-200 overflow-hidden group">
                        <div className="aspect-video overflow-hidden bg-gray-100">
                          <img
                            src="/gallery/Capture d'écran (23).png"
                            alt="Interface de développement"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            <h3 className="font-bold text-gray-900">Interface</h3>
                          </div>
                          <p className="text-sm text-gray-600">Développement de l'interface</p>
                        </div>
                      </div>

                      {/* Image 6 - Screenshot 2 */}
                      <div className="bg-white/80 rounded-xl shadow-lg border border-gray-200 overflow-hidden group">
                        <div className="aspect-video overflow-hidden bg-gray-100">
                          <img
                            src="/gallery/Capture d'écran (27).png"
                            alt="Tests et validation"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <TreePine className="h-5 w-5 text-primary" />
                            <h3 className="font-bold text-gray-900">Tests</h3>
                          </div>
                          <p className="text-sm text-gray-600">Validation et tests techniques</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-2xl border-2 border-primary/20 text-center">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Notre équipe travaille activement sur tous les aspects du projet : conception 3D, 
                        systèmes embarqués, développement web, et tests en conditions réelles.
                      </p>
                    </div>

                    <div className="text-center pt-4">
                      <Button
                        size="lg"
                        onClick={() => handleNavigateToPage('/gallery')}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Image className="mr-2 h-5 w-5" />
                        Voir toute la galerie
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* Slide 9: Contact & Conclusion */}
            <CarouselItem>
              <div className="h-[80vh] flex items-center justify-center p-8">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl flex items-center justify-center">
                  <div className="text-center space-y-10 p-12">
                    <div className="space-y-6">
                      <div className="inline-block animate-scale-in">
                        <TreePine className="h-20 w-20 text-primary mx-auto mb-4" />
                      </div>
                      <h2 className="text-5xl md:text-6xl font-display font-bold text-gray-900">
                        Rejoignez l'Aventure Gaia
                      </h2>
                      <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Ensemble, construisons un avenir plus vert et durable pour notre planète
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
                      <Button
                        size="lg"
                        onClick={() => handleNavigateToPage('/')}
                        className="text-xl px-10 py-6 bg-primary hover:bg-primary/90 shadow-xl"
                      >
                        <Home className="mr-3 h-6 w-6" />
                        Retour à l'accueil
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => handleNavigateToPage('/partenaires')}
                        className="text-xl px-10 py-6 border-2 shadow-xl"
                      >
                        <Heart className="mr-3 h-6 w-6" />
                        Devenir Partenaire
                      </Button>
                    </div>

                    <div className="pt-8 space-y-3">
                      <p className="text-gray-600 text-lg">
                        <Mail className="inline h-5 w-5 mr-2" />
                        Contactez-nous pour plus d'informations
                      </p>
                      <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-primary to-secondary">
                        Lycée Saint-Joseph Dijon - Terminale SI
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="left-4 h-12 w-12 bg-white/90 backdrop-blur-sm hover:bg-white border-2" />
          <CarouselNext className="right-4 h-12 w-12 bg-white/90 backdrop-blur-sm hover:bg-white border-2" />
        </Carousel>
      </div>

      {/* Footer Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-50 p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-center space-x-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index + 1
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Aller à la slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-white/60 text-sm">
              Utilisez les flèches ← → ou Espace pour naviguer • Échap pour quitter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
