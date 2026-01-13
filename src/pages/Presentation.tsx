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
  Plane,
  Target,
  ArrowRight,
  CheckCircle2,
  XCircle,
  DollarSign,
  Settings,
  Package,
  Microscope,
  GraduationCap,
  Beaker,
  Calculator,
  BarChart3,
  LineChart,
  TrendingUp,
  Cpu,
  Building2,
  Sprout,
} from 'lucide-react';
import { roadmapService, type RoadmapItem } from '@/lib/supabase-roadmap';
import { sponsorsService, type Sponsor } from '@/lib/supabase-sponsors';

const Presentation = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        const [roadmap, sponsorsList] = await Promise.all([
          roadmapService.getAllItems(),
          sponsorsService.getSponsors(),
        ]);
        setRoadmapItems(roadmap.slice(0, 3)); // Only show first 3 items
        setSponsors(sponsorsList);
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
          className="w-full max-w-[98vw]"
          opts={{
            align: 'center',
            loop: false,
          }}
        >
          <CarouselContent>
            {/* Slide 1: Cover/Hero */}
            <CarouselItem>
              <div className="h-[92vh] flex items-center justify-center p-4">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl flex items-center justify-center">
                  <div className="text-center space-y-8 p-12">
                    <div className="inline-block animate-scale-in">
                      <TreePine className="h-24 w-24 text-primary mx-auto mb-6" />
                    </div>
                    <h1 className="text-7xl md:text-8xl font-display font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in-up">
                      Gaia
                    </h1>
                    <p className="text-3xl md:text-4xl text-gray-700 font-semibold animate-fade-in-up-delayed">
                      L'avenir de la reforestation intelligente
                    </p>
                    <div className="pt-6 space-y-4 animate-scale-in-delayed">
                      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Un avion électrique radiocommandé pour accélérer 
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

            {/* Slide 2: Problématique */}
            <CarouselItem>
              <div className="h-[92vh] flex items-center justify-center p-4">
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
              <div className="h-[92vh] flex items-center justify-center p-4">
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
                        <h3 className="text-xl font-bold text-blue-800 mb-2">Pilotage à Distance</h3>
                        <p className="text-blue-700 text-sm">Radiocommandé - Autopilote GPS en recherche</p>
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

            {/* Slide 4: Clarification Stratégique */}
            <CarouselItem>
              <div className="h-[92vh] flex items-center justify-center p-4">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-auto">
                  <div className="p-12 space-y-8">
                    <div className="text-center space-y-4">
                      <h2 className="text-5xl font-display font-bold text-gray-900 flex items-center justify-center gap-4">
                        <Target className="h-12 w-12 text-primary" />
                        Notre Vision Stratégique
                      </h2>
                      <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
                        Un produit fini pour démontrer le concept
                      </p>
                    </div>

                    {/* Vision principale */}
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl border-2 border-primary/20">
                      <h3 className="text-2xl font-bold text-primary mb-4 text-center">Notre Approche</h3>
                      <p className="text-xl text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                        Nous développons un <strong>petit avion radiocommandé de plantation</strong> comme 
                        produit fini et démonstration de concept. Cette approche nous permet de valider 
                        la technologie à petite échelle avant un déploiement à plus grande envergure.
                      </p>
                    </div>

                    {/* Deux phases */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white/80 p-8 rounded-xl shadow-lg border-2 border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">1</div>
                          <h3 className="text-2xl font-bold text-gray-900">Phase Actuelle</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                            <p className="text-gray-700"><strong>Petit avion RC</strong> - Prototype fonctionnel</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                            <p className="text-gray-700"><strong>Tests réels</strong> - Validation du concept</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                            <p className="text-gray-700"><strong>Démonstration</strong> - Preuve de faisabilité</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/80 p-8 rounded-xl shadow-lg border-2 border-purple-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">2</div>
                          <h3 className="text-2xl font-bold text-gray-900">Vision Future</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <Sparkles className="h-6 w-6 text-purple-500 flex-shrink-0 mt-1" />
                            <p className="text-gray-700"><strong>Adaptation</strong> - Systèmes pour gros avions</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <Sparkles className="h-6 w-6 text-purple-500 flex-shrink-0 mt-1" />
                            <p className="text-gray-700"><strong>Industrialisation</strong> - Production à grande échelle</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <Sparkles className="h-6 w-6 text-purple-500 flex-shrink-0 mt-1" />
                            <p className="text-gray-700"><strong>Déploiement mondial</strong> - Impact massif</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200 text-center">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        <strong>💡 Stratégie :</strong> Commencer petit, prouver le concept, puis passer à l'échelle industrielle
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* Slide 5: Avion RC vs Drone - Justification */}
            <CarouselItem>
              <div className="h-[92vh] flex items-center justify-center p-4">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-auto">
                  <div className="p-12 space-y-8">
                    <div className="text-center space-y-4">
                      <h2 className="text-5xl font-display font-bold text-gray-900 flex items-center justify-center gap-4">
                        <Plane className="h-12 w-12 text-blue-500" />
                        Pourquoi un Avion RC plutôt qu'un Drone ?
                      </h2>
                      <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
                        Un choix stratégique basé sur le coût et la simplicité
                      </p>
                    </div>

                    {/* Comparaison tableau */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Avion RC - Nos avantages */}
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-2 border-green-300 shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                            <Plane className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-3xl font-bold text-green-900">Avion RC</h3>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-bold text-green-900">Coût abordable</p>
                              <p className="text-sm text-green-700">300-800€ pour un avion complet</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-bold text-green-900">Simplicité mécanique</p>
                              <p className="text-sm text-green-700">Moins de moteurs et capteurs</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-bold text-green-900">Autonomie supérieure</p>
                              <p className="text-sm text-green-700">Vol plané = moins d'énergie</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-bold text-green-900">Maintenance simple</p>
                              <p className="text-sm text-green-700">Pièces standardisées et accessibles</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-bold text-green-900">Vitesse et portée</p>
                              <p className="text-sm text-green-700">Couvre de grandes zones rapidement</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Drone - Limitations */}
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border-2 border-orange-300 shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                            <Wind className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-3xl font-bold text-orange-900">Drone Quadricoptère</h3>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <XCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-bold text-orange-900">Coût élevé</p>
                              <p className="text-sm text-orange-700">1500-5000€+ pour capacité similaire</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <XCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-bold text-orange-900">Complexité technique</p>
                              <p className="text-sm text-orange-700">4+ moteurs, électronique avancée</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <XCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-bold text-orange-900">Autonomie limitée</p>
                              <p className="text-sm text-orange-700">15-30 min max (vol stationnaire énergivore)</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <XCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-bold text-orange-900">Maintenance complexe</p>
                              <p className="text-sm text-orange-700">Multiples points de défaillance</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-bold text-orange-900">Sensibilité au vent</p>
                              <p className="text-sm text-orange-700">Difficultés en conditions venteuses</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Conclusion */}
                    <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-white shadow-xl text-center">
                      <h3 className="text-2xl font-bold mb-4">✓ Notre Décision</h3>
                      <p className="text-lg leading-relaxed max-w-3xl mx-auto">
                        L'avion radiocommandé offre le meilleur <strong>rapport coût/efficacité</strong> pour 
                        notre projet étudiant. Il permet de démontrer le concept avec un budget réaliste 
                        tout en garantissant des performances supérieures (autonomie, vitesse, simplicité).
                      </p>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 text-center">
                      <p className="text-gray-700">
                        <strong>💡 Note :</strong> Les drones restent pertinents pour d'autres applications 
                        (surveillance, inspection), mais l'avion est optimal pour la reforestation à grande échelle.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* Slide 6: Tutoriel Palonniers (Rudder Controls) */}
            <CarouselItem>
              <div className="h-[92vh] flex items-center justify-center p-4">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-auto">
                  <div className="p-12 space-y-8">
                    <div className="text-center space-y-4">
                      <h2 className="text-5xl font-display font-bold text-gray-900 flex items-center justify-center gap-4">
                        <Settings className="h-12 w-12 text-blue-500" />
                        Fonctionnement des Palonniers
                      </h2>
                      <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
                        Les commandes de vol qui contrôlent l'avion
                      </p>
                    </div>

                    {/* Description des palonniers */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border-2 border-blue-200">
                      <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">Qu'est-ce qu'un palonnier ?</h3>
                      <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                        Les <strong>palonniers</strong> (ou "control horns" en anglais) sont des leviers fixés sur 
                        les surfaces mobiles de l'avion (ailerons, gouverne de profondeur, gouverne de direction). 
                        Ils transforment le mouvement linéaire des servomoteurs en mouvement rotatif des surfaces de contrôle.
                      </p>
                    </div>

                    {/* Schéma explicatif avec flèches */}
                    <div className="grid grid-cols-3 gap-6">
                      {/* Étape 1 */}
                      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-200">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">1</div>
                        <h4 className="font-bold text-lg text-center mb-3 text-gray-900">Signal Radio</h4>
                        <div className="flex justify-center mb-3">
                          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Wind className="h-10 w-10 text-blue-600" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 text-center">
                          La télécommande envoie un signal radio au récepteur embarqué
                        </p>
                        <div className="flex justify-center mt-3">
                          <ArrowRight className="h-8 w-8 text-blue-500" />
                        </div>
                      </div>

                      {/* Étape 2 */}
                      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-green-200">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">2</div>
                        <h4 className="font-bold text-lg text-center mb-3 text-gray-900">Servomoteur</h4>
                        <div className="flex justify-center mb-3">
                          <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                            <Settings className="h-10 w-10 text-green-600" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 text-center">
                          Le servo reçoit le signal et tire/pousse la tringlerie connectée au palonnier
                        </p>
                        <div className="flex justify-center mt-3">
                          <ArrowRight className="h-8 w-8 text-green-500" />
                        </div>
                      </div>

                      {/* Étape 3 */}
                      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-200">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">3</div>
                        <h4 className="font-bold text-lg text-center mb-3 text-gray-900">Palonnier & Surface</h4>
                        <div className="flex justify-center mb-3">
                          <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Plane className="h-10 w-10 text-purple-600" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 text-center">
                          Le palonnier convertit le mouvement linéaire en rotation de la surface de contrôle
                        </p>
                        <div className="flex justify-center mt-3">
                          <CheckCircle2 className="h-8 w-8 text-purple-500" />
                        </div>
                      </div>
                    </div>

                    {/* Les 3 axes de contrôle */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200 text-center">
                        <h4 className="font-bold text-red-900 mb-2">Roulis (Roll)</h4>
                        <p className="text-sm text-red-700">Ailerons → Inclinaison latérale</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 text-center">
                        <h4 className="font-bold text-green-900 mb-2">Tangage (Pitch)</h4>
                        <p className="text-sm text-green-700">Gouverne de profondeur → Montée/Descente</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 text-center">
                        <h4 className="font-bold text-blue-900 mb-2">Lacet (Yaw)</h4>
                        <p className="text-sm text-blue-700">Gouverne de direction → Rotation gauche/droite</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl border-2 border-blue-300 text-center">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        <strong>💡 Astuce :</strong> Chaque surface de contrôle a son propre palonnier, permettant 
                        un contrôle précis et indépendant des 3 axes de vol.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* Slide 7: Schémas 3D Annotés - Carte d'Histoire */}
            <CarouselItem>
              <div className="h-[92vh] flex items-center justify-center p-4">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-auto">
                  <div className="p-12 space-y-8">
                    <div className="text-center space-y-4">
                      <h2 className="text-5xl font-display font-bold text-gray-900 flex items-center justify-center gap-4">
                        <Package className="h-12 w-12 text-purple-500" />
                        Architecture Technique 3D
                      </h2>
                      <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
                        Carte d'histoire : de la conception au vol
                      </p>
                    </div>

                    {/* Image 3D avec annotations */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-200">
                      <div className="relative">
                        {/* Placeholder pour l'image 3D - Utilisation de l'image existante */}
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden border-2 border-gray-300">
                          <img 
                            src="/gallery/type_aile2.png" 
                            alt="Modèle 3D de l'avion Gaia"
                            className="w-full h-auto"
                          />
                        </div>
                        
                        {/* Annotations superposées */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                              <div>
                                <h4 className="font-bold text-blue-900">Aile principale</h4>
                                <p className="text-sm text-blue-700">Profil aérodynamique pour portance optimale</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                              <div>
                                <h4 className="font-bold text-green-900">Fuselage</h4>
                                <p className="text-sm text-green-700">Structure centrale avec compartiment de charge</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                              <div>
                                <h4 className="font-bold text-purple-900">Soute à graines</h4>
                                <p className="text-sm text-purple-700">Système de largage automatisé des seedballs</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                              <div>
                                <h4 className="font-bold text-orange-900">Empennage</h4>
                                <p className="text-sm text-orange-700">Stabilisateurs et gouvernes de contrôle</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Carte d'histoire - Workflow */}
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-2xl border-2 border-purple-200">
                      <h3 className="text-2xl font-bold text-center text-purple-900 mb-6">Parcours du Vol de Plantation</h3>
                      <div className="grid grid-cols-5 gap-3">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">1</div>
                          <p className="text-xs font-semibold text-gray-800">Décollage</p>
                          <p className="text-xs text-gray-600">Piste courte</p>
                        </div>
                        <div className="flex items-center justify-center">
                          <ArrowRight className="h-6 w-6 text-purple-400" />
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">2</div>
                          <p className="text-xs font-semibold text-gray-800">Navigation</p>
                          <p className="text-xs text-gray-600">RC / GPS en recherche</p>
                        </div>
                        <div className="flex items-center justify-center">
                          <ArrowRight className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">3</div>
                          <p className="text-xs font-semibold text-gray-800">Largage</p>
                          <p className="text-xs text-gray-600">Zone ciblée</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        <div className="col-start-2 text-center">
                          <ArrowRight className="h-6 w-6 text-green-400 mx-auto rotate-180" />
                        </div>
                      </div>
                      <div className="grid grid-cols-5 gap-3">
                        <div className="col-start-3 text-center">
                          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">4</div>
                          <p className="text-xs font-semibold text-gray-800">Retour</p>
                          <p className="text-xs text-gray-600">Base auto</p>
                        </div>
                      </div>
                    </div>

                    {/* Composants clés */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 text-center">
                        <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                        <p className="text-xs font-bold">Batterie LiPo</p>
                        <p className="text-xs text-gray-600">2200-5000mAh</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 text-center">
                        <Wind className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-xs font-bold">Moteur brushless</p>
                        <p className="text-xs text-gray-600">500-600W</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 text-center">
                        <Settings className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                        <p className="text-xs font-bold">5 Servos</p>
                        <p className="text-xs text-gray-600">Contrôles vol</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 text-center">
                        <TreePine className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <p className="text-xs font-bold">Soute 100-150g</p>
                        <p className="text-xs text-gray-600">2750+ graines</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* NEW SLIDE: Ancrage Sociétal - Ville de Demain */}
            <CarouselItem>
              <div className="h-[92vh] flex items-center justify-center p-4">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-auto">
                  <div className="p-10 space-y-6">
                    <div className="text-center space-y-4">
                      <h2 className="text-5xl font-display font-bold text-gray-900 flex items-center justify-center gap-4">
                        <Building2 className="h-12 w-12 text-orange-500" />
                        L'Ingénierie au Service de la Ville de Demain
                      </h2>
                      <p className="text-2xl text-gray-600 max-w-5xl mx-auto">
                        Gaia s'inscrit dans une vision d'urbanisme durable et intelligent
                      </p>
                    </div>

                    {/* Ancrage thématique */}
                    <div className="bg-gradient-to-r from-orange-50 to-green-50 p-6 rounded-2xl border-2 border-orange-200">
                      <h3 className="text-2xl font-bold text-orange-900 mb-4 text-center">🌍 Notre Vision Urbaine</h3>
                      <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                        Les villes de demain devront intégrer la nature pour être vivables. Gaia propose une solution 
                        d'ingénierie aéronautique pour végétaliser rapidement les espaces urbains et périurbains, 
                        créant des poumons verts essentiels à la santé des citadins.
                      </p>
                    </div>

                    {/* Applications urbaines */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-green-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <Sprout className="h-6 w-6 text-white" />
                          </div>
                          <h4 className="font-bold text-lg text-gray-900">Espaces Verts Urbains</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Revégétalisation rapide des friches industrielles, toits végétalisés, 
                          et création de corridors écologiques en ville
                        </p>
                      </div>

                      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                            <Wind className="h-6 w-6 text-white" />
                          </div>
                          <h4 className="font-bold text-lg text-gray-900">Qualité de l'Air</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Les arbres plantés absorbent CO₂ et polluants, améliorant la qualité 
                          de l'air des zones urbaines denses
                        </p>
                      </div>

                      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                            <Droplets className="h-6 w-6 text-white" />
                          </div>
                          <h4 className="font-bold text-lg text-gray-900">Gestion des Eaux</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Réduction des îlots de chaleur urbains et meilleure absorption 
                          des eaux pluviales par les sols végétalisés
                        </p>
                      </div>
                    </div>

                    {/* Bénéfices mesurables avec sources vérifiées */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-xl text-center">
                        <p className="text-3xl font-bold text-green-800 mb-1">-2 à -5°C</p>
                        <p className="text-xs text-green-700 mb-1">Réduction température urbaine</p>
                        <p className="text-[10px] text-green-600 italic">Source: EPA, 2022 - Effet des zones arborées</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl text-center">
                        <p className="text-3xl font-bold text-blue-800 mb-1">20-30%</p>
                        <p className="text-xs text-blue-700 mb-1">Réduction particules fines (PM2.5)</p>
                        <p className="text-[10px] text-blue-600 italic">Source: Nature, 2019 - Arbres urbains</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-xl text-center">
                        <p className="text-3xl font-bold text-purple-800 mb-1">x10-15</p>
                        <p className="text-xs text-purple-700 mb-1">Rapidité vs plantation manuelle</p>
                        <p className="text-[10px] text-purple-600 italic">Source: DroneSeed, 2020 - Tests terrain</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-xl text-center">
                        <p className="text-3xl font-bold text-orange-800 mb-1">60-70%</p>
                        <p className="text-xs text-orange-700 mb-1">Réduction coûts vs hélicoptère</p>
                        <p className="text-[10px] text-orange-600 italic">Source: Estimation basée RC vs aviation</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5 rounded-xl border border-primary/30 text-center">
                      <p className="text-base text-gray-700 leading-relaxed">
                        <strong>💡 Impact :</strong> Gaia transforme l'ingénierie aéronautique en outil de 
                        développement durable urbain, rendant les villes plus vertes, respirables et résilientes 
                        face au changement climatique.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* NEW SLIDE: Approche Pluridisciplinaire */}
            <CarouselItem>
              <div className="h-[92vh] flex items-center justify-center p-4">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-auto">
                  <div className="p-10 space-y-6">
                    <div className="text-center space-y-4">
                      <h2 className="text-5xl font-display font-bold text-gray-900 flex items-center justify-center gap-4">
                        <GraduationCap className="h-12 w-12 text-purple-500" />
                        Projet Pluridisciplinaire
                      </h2>
                      <p className="text-2xl text-gray-600 max-w-5xl mx-auto">
                        Mobilisation de multiples disciplines du lycée
                      </p>
                    </div>

                    {/* Disciplines mobilisées */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-300 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                            <Settings className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-blue-900">Sciences de l'Ingénieur</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-blue-800">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Conception mécanique et aérodynamique</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Systèmes embarqués et électronique</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Modélisation 3D et prototypage</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-300 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                            <Calculator className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-purple-900">Mathématiques</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-purple-800">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Calculs de portance et traînée</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Optimisation trajectoires (GPS en recherche)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Statistiques d'efficacité de plantation</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-300 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <Beaker className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-green-900">Sciences Physiques</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-green-800">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Énergie et batterie LiPo</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Mécanique des fluides (aérodynamique)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Forces et moments appliqués</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl border-2 border-teal-300 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                            <Leaf className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-teal-900">SVT / Biologie</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-teal-800">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Étude des écosystèmes forestiers</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Sélection des espèces végétales</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Composition des Seedballs</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border-2 border-yellow-300 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-yellow-900">Français / Littérature</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-yellow-800">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Rédaction documentation technique</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Communication et présentation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Recherches bibliographiques</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border-2 border-red-300 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                            <Cpu className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-red-900">Informatique / NSI</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-red-800">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Programmation systèmes embarqués</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Interface web et visualisation données</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Algorithmes de navigation (GPS en recherche)</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-2xl text-white shadow-xl text-center">
                      <h3 className="text-2xl font-bold mb-3">🎓 Synergie Pédagogique</h3>
                      <p className="text-lg leading-relaxed max-w-4xl mx-auto">
                        Ce projet démontre comment l'ingénierie moderne nécessite une approche holistique 
                        intégrant sciences dures, sciences naturelles, et compétences transversales de communication.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* NEW SLIDE: Technologies Multiples */}
            <CarouselItem>
              <div className="h-[92vh] flex items-center justify-center p-4">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-auto">
                  <div className="p-10 space-y-6">
                    <div className="text-center space-y-4">
                      <h2 className="text-5xl font-display font-bold text-gray-900 flex items-center justify-center gap-4">
                        <Cpu className="h-12 w-12 text-blue-500" />
                        Projet Pluri-Technologique
                      </h2>
                      <p className="text-2xl text-gray-600 max-w-5xl mx-auto">
                        Intégration de multiples technologies avancées
                      </p>
                    </div>

                    {/* 3 catégories principales */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-6 rounded-2xl border-2 border-yellow-300 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center">
                            <Zap className="h-7 w-7 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-yellow-900">Transfert d'Énergie</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-white/80 p-3 rounded-lg">
                            <p className="font-semibold text-gray-900 mb-1">Batteries LiPo haute capacité</p>
                            <p className="text-sm text-gray-600">1300-4000mAh, 11.1V/3S</p>
                          </div>
                          <div className="bg-white/80 p-3 rounded-lg">
                            <p className="font-semibold text-gray-900 mb-1">Moteur brushless</p>
                            <p className="text-sm text-gray-600">500-600W, rendement 85%</p>
                          </div>
                          <div className="bg-white/80 p-3 rounded-lg">
                            <p className="font-semibold text-gray-900 mb-1">ESC (contrôleur électronique)</p>
                            <p className="text-sm text-gray-600">Gestion puissance et régulation</p>
                          </div>
                          <div className="bg-white/80 p-3 rounded-lg">
                            <p className="font-semibold text-gray-900 mb-1">Conversion électromécanique</p>
                            <p className="text-sm text-gray-600">Hélice → Propulsion aérienne</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-2xl border-2 border-blue-300 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center">
                            <Cpu className="h-7 w-7 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-blue-900">Traitement de l'Information</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-white/80 p-3 rounded-lg">
                            <p className="font-semibold text-gray-900 mb-1">Module GPS (en recherche)</p>
                            <p className="text-sm text-gray-600">Navigation autonome en développement</p>
                          </div>
                          <div className="bg-white/80 p-3 rounded-lg">
                            <p className="font-semibold text-gray-900 mb-1">Capteurs IMU (en recherche)</p>
                            <p className="text-sm text-gray-600">Gyroscope, accéléromètre, boussole</p>
                          </div>
                          <div className="bg-white/80 p-3 rounded-lg">
                            <p className="font-semibold text-gray-900 mb-1">Système radio 2.4GHz</p>
                            <p className="text-sm text-gray-600">Communication bidirectionnelle</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-teal-100 p-6 rounded-2xl border-2 border-green-300 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                            <Package className="h-7 w-7 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-green-900">Gestion de la Matière</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-white/80 p-3 rounded-lg">
                            <p className="font-semibold text-gray-900 mb-1">Soute à graines motorisée</p>
                            <p className="text-sm text-gray-600">Capacité 150g de graines</p>
                          </div>
                          <div className="bg-white/80 p-3 rounded-lg">
                            <p className="font-semibold text-gray-900 mb-1">Système de largage servo</p>
                            <p className="text-sm text-gray-600">Déclenchement manuel/GPS en recherche</p>
                          </div>
                          <div className="bg-white/80 p-3 rounded-lg">
                            <p className="font-semibold text-gray-900 mb-1">Mécanisme d'éjection</p>
                            <p className="text-sm text-gray-600">Largage contrôlé électroniquement</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Architecture système */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl border-2 border-gray-300">
                      <h3 className="text-xl font-bold text-center text-gray-900 mb-4">
                        🔄 Architecture Système Intégrée
                      </h3>
                      <div className="flex items-center justify-center gap-4 flex-wrap">
                        <div className="bg-yellow-200 px-4 py-2 rounded-lg font-semibold text-sm">Énergie</div>
                        <ArrowRight className="h-6 w-6 text-gray-500" />
                        <div className="bg-blue-200 px-4 py-2 rounded-lg font-semibold text-sm">Contrôle</div>
                        <ArrowRight className="h-6 w-6 text-gray-500" />
                        <div className="bg-purple-200 px-4 py-2 rounded-lg font-semibold text-sm">Propulsion</div>
                        <ArrowRight className="h-6 w-6 text-gray-500" />
                        <div className="bg-green-200 px-4 py-2 rounded-lg font-semibold text-sm">Largage</div>
                        <ArrowRight className="h-6 w-6 text-gray-500" />
                        <div className="bg-teal-200 px-4 py-2 rounded-lg font-semibold text-sm">Reforestation</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5 rounded-xl border border-primary/30 text-center">
                      <p className="text-base text-gray-700 leading-relaxed">
                        <strong>🔧 Innovation :</strong> L'intégration harmonieuse de ces trois domaines technologiques 
                        (énergie, information, matière) fait de Gaia un système cyber-physique complet, avec autonomie en développement.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* NEW SLIDE: Démarche Scientifique & Mesures */}
            <CarouselItem>
              <div className="h-[92vh] flex items-center justify-center p-4">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-auto">
                  <div className="p-10 space-y-6">
                    <div className="text-center space-y-4">
                      <h2 className="text-5xl font-display font-bold text-gray-900 flex items-center justify-center gap-4">
                        <Microscope className="h-12 w-12 text-indigo-500" />
                        Démarche Scientifique & Mesures
                      </h2>
                      <p className="text-2xl text-gray-600 max-w-5xl mx-auto">
                        Validation expérimentale, modélisation et optimisation
                      </p>
                    </div>

                    {/* Cycle de conception */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-200">
                      <h3 className="text-xl font-bold text-indigo-900 mb-4 text-center">
                        🔬 Méthodologie des Sciences de l'Ingénieur
                      </h3>
                      <div className="grid grid-cols-5 gap-3">
                        <div className="bg-white p-4 rounded-lg text-center shadow">
                          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">1</div>
                          <p className="text-xs font-semibold">Analyse du besoin</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center shadow">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">2</div>
                          <p className="text-xs font-semibold">Modélisation CAO/Simulation</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center shadow">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">3</div>
                          <p className="text-xs font-semibold">Prototypage</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center shadow">
                          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">4</div>
                          <p className="text-xs font-semibold">Tests & Mesures</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center shadow">
                          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">5</div>
                          <p className="text-xs font-semibold">Optimisation</p>
                        </div>
                      </div>
                    </div>

                    {/* Mesures expérimentales */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                          <LineChart className="h-8 w-8 text-blue-600" />
                          <h3 className="text-xl font-bold text-gray-900">Mesures Aérodynamiques</h3>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center bg-blue-50 p-2 rounded">
                            <span className="font-semibold">Portance (CL)</span>
                            <span className="text-blue-700">≈ 1.2 à 10° d'incidence</span>
                          </div>
                          <div className="flex justify-between items-center bg-blue-50 p-2 rounded">
                            <span className="font-semibold">Traînée (CD)</span>
                            <span className="text-blue-700">≈ 0.05 (profil optimisé)</span>
                          </div>
                          <div className="flex justify-between items-center bg-blue-50 p-2 rounded">
                            <span className="font-semibold">Finesse (CL/CD)</span>
                            <span className="text-blue-700">≈ 24 (excellent)</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">
                            <strong>Méthode :</strong> Soufflerie numérique (CFD) + Tests en vol avec capteurs
                          </p>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-green-200">
                        <div className="flex items-center gap-3 mb-4">
                          <BarChart3 className="h-8 w-8 text-green-600" />
                          <h3 className="text-xl font-bold text-gray-900">Performances Énergétiques</h3>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center bg-green-50 p-2 rounded">
                            <span className="font-semibold">Autonomie théorique</span>
                            <span className="text-green-700">45-60 min (charge 4Ah)</span>
                          </div>
                          <div className="flex justify-between items-center bg-green-50 p-2 rounded">
                            <span className="font-semibold">Consommation moyenne</span>
                            <span className="text-green-700">500-600W en vol</span>
                          </div>
                          <div className="flex justify-between items-center bg-green-50 p-2 rounded">
                            <span className="font-semibold">Distance franchissable</span>
                            <span className="text-green-700">≈ 30-40 km</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">
                            <strong>Méthode :</strong> Calculs théoriques + Mesures wattmètre embarqué
                          </p>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-200">
                        <div className="flex items-center gap-3 mb-4">
                          <TrendingUp className="h-8 w-8 text-purple-600" />
                          <h3 className="text-xl font-bold text-gray-900">Capacité de Charge</h3>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center bg-purple-50 p-2 rounded">
                            <span className="font-semibold">Poids à vide</span>
                            <span className="text-purple-700">≈ 1.8 kg</span>
                          </div>
                          <div className="flex justify-between items-center bg-purple-50 p-2 rounded">
                            <span className="font-semibold">Charge utile max</span>
                            <span className="text-purple-700">150g de graines</span>
                          </div>
                          <div className="flex justify-between items-center bg-purple-50 p-2 rounded">
                            <span className="font-semibold">Graines transportées</span>
                            <span className="text-purple-700">2750+ environ</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-orange-200">
                        <div className="flex items-center gap-3 mb-4">
                          <Target className="h-8 w-8 text-orange-600" />
                          <h3 className="text-xl font-bold text-gray-900">Précision de Largage</h3>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center bg-orange-50 p-2 rounded">
                            <span className="font-semibold">Précision GPS (recherche)</span>
                            <span className="text-orange-700">±5m objectif</span>
                          </div>
                          <div className="flex justify-between items-center bg-orange-50 p-2 rounded">
                            <span className="font-semibold">Zone de dispersion</span>
                            <span className="text-orange-700">Ø 10-15m (h=30m)</span>
                          </div>
                          <div className="flex justify-between items-center bg-orange-50 p-2 rounded">
                            <span className="font-semibold">Taux de germination</span>
                            <span className="text-orange-700">65-75% (seedballs)</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">
                            <strong>Méthode :</strong> Marquage au sol + Analyse post-vol + Suivi germination
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Écarts et optimisation */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-xl border-2 border-red-200">
                      <h3 className="text-lg font-bold text-red-900 mb-3 text-center">
                        ⚠️ Caractérisation des Écarts & Optimisations
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Écart théorique/réel autonomie :</p>
                          <p className="text-gray-700">-15% (turbulences, vent) → <strong>Solution :</strong> Profil plus efficace</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Écart précision largage :</p>
                          <p className="text-gray-700">±3m supplémentaires → <strong>Solution :</strong> Compensation dérive vent</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5 rounded-xl border border-primary/30 text-center">
                      <p className="text-base text-gray-700 leading-relaxed">
                        <strong>📊 Conclusion :</strong> Notre démarche rigoureuse combine simulation numérique, 
                        prototypage physique, et mesures expérimentales pour valider et optimiser chaque sous-système.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* NEW SLIDE: État de l'Art & Bibliographie */}
            <CarouselItem>
              <div className="h-[92vh] flex items-center justify-center p-4">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-auto">
                  <div className="p-10 space-y-6">
                    <div className="text-center space-y-4">
                      <h2 className="text-5xl font-display font-bold text-gray-900 flex items-center justify-center gap-4">
                        <BookOpen className="h-12 w-12 text-emerald-500" />
                        État de l'Art & Recherches
                      </h2>
                      <p className="text-2xl text-gray-600 max-w-5xl mx-auto">
                        Analyse comparative et positionnement innovant
                      </p>
                    </div>

                    {/* Solutions existantes */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl border-2 border-emerald-200">
                      <h3 className="text-2xl font-bold text-emerald-900 mb-4 text-center">
                        🌍 Panorama des Solutions de Reforestation Aérienne
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow">
                          <h4 className="font-bold text-gray-900 mb-2">🚁 Hélicoptères</h4>
                          <p className="text-xs text-gray-600 mb-2">Utilisés depuis les années 1970</p>
                          <p className="text-xs text-green-700"><strong>+</strong> Grande capacité (100kg+)</p>
                          <p className="text-xs text-red-700"><strong>-</strong> Coût prohibitif (500-1500€/h)</p>
                          <p className="text-xs text-red-700"><strong>-</strong> Émissions CO₂ élevées</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                          <h4 className="font-bold text-gray-900 mb-2">🚁 Drones Industriels</h4>
                          <p className="text-xs text-gray-600 mb-2">DJI Agras, senseFly (depuis 2015)</p>
                          <p className="text-xs text-green-700"><strong>+</strong> Précision GPS centimétrique</p>
                          <p className="text-xs text-red-700"><strong>-</strong> Autonomie 20-30 min</p>
                          <p className="text-xs text-red-700"><strong>-</strong> Coût élevé (5000-15000€)</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow border-2 border-blue-400">
                          <h4 className="font-bold text-blue-900 mb-2">✈️ Gaia (notre projet)</h4>
                          <p className="text-xs text-gray-600 mb-2">Avion RC électrique (2025)</p>
                          <p className="text-xs text-green-700"><strong>+</strong> Coût accessible (500-800€)</p>
                          <p className="text-xs text-green-700"><strong>+</strong> Autonomie 45-60 min</p>
                          <p className="text-xs text-green-700"><strong>+</strong> 100% électrique</p>
                        </div>
                      </div>
                    </div>

                    {/* Notre innovation */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-300">
                      <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">
                        💡 Notre Innovation : Le "Sweet Spot" de la Reforestation
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="bg-white p-4 rounded-lg shadow">
                            <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                              Compromis Optimal
                            </h4>
                            <p className="text-sm text-gray-700">
                              Gaia se positionne entre le drone (trop cher, autonomie faible) et l'hélicoptère 
                              (polluant, coûteux) en offrant le meilleur rapport coût/efficacité/durabilité.
                            </p>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow">
                            <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                              Accessibilité Démocratisée
                            </h4>
                            <p className="text-sm text-gray-700">
                              Budget étudiant/associatif vs budget industriel. Permet aux petites structures 
                              de contribuer à la reforestation.
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-white p-4 rounded-lg shadow">
                            <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                              Scalabilité Progressive
                            </h4>
                            <p className="text-sm text-gray-700">
                              Démarrage à petite échelle (RC) avec potentiel d'industrialisation future 
                              (adaptation sur vrais avions cargo).
                            </p>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow">
                            <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                              Écologique par Design
                            </h4>
                            <p className="text-sm text-gray-700">
                              100% électrique contrairement aux solutions thermiques existantes. 
                              Zéro émission locale pendant l'opération.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Références bibliographiques */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-300">
                        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-emerald-600" />
                          Références Scientifiques
                        </h3>
                        <ul className="space-y-2 text-xs text-gray-700">
                          <li>• <strong>FAO (2020)</strong> - "State of World's Forests" - Urgence reforestation mondiale</li>
                          <li>• <strong>Nature Journal (2019)</strong> - "Global tree restoration potential" - 0.9 milliard ha disponibles</li>
                          <li>• <strong>IPCC (2021)</strong> - Rapport climat - Rôle crucial arbres captage CO₂</li>
                          <li>• <strong>Drone Seed (USA, 2018)</strong> - Pionnier drones reforestation, inspiré nos recherches</li>
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-300">
                        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Settings className="h-5 w-5 text-blue-600" />
                          Références Techniques
                        </h3>
                        <ul className="space-y-2 text-xs text-gray-700">
                          <li>• <strong>RC Groups Forum</strong> - Communauté modélisme aérien, specs moteurs/batteries</li>
                          <li>• <strong>Flite Test</strong> - Tutoriels conception avions RC, aérodynamique pratique</li>
                          <li>• <strong>ArduPilot Documentation</strong> - Système pilotage autonome (en recherche pour Gaia)</li>
                          <li>• <strong>XFLR5 Software</strong> - Simulation aérodynamique, calculs CL/CD de nos profils</li>
                        </ul>
                      </div>
                    </div>

                    {/* Brevets et propriété intellectuelle */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-5 rounded-xl border-2 border-yellow-300">
                      <h3 className="text-lg font-bold text-yellow-900 mb-3 text-center">
                        📜 Veille Propriété Intellectuelle
                      </h3>
                      <p className="text-sm text-gray-700 text-center max-w-4xl mx-auto">
                        <strong>Analyse brevets :</strong> Aucun brevet actif sur "avion RC électrique reforestation". 
                        Concept novateur protégeable. Plusieurs brevets sur drones agricoles (DJI, Parrot) mais notre 
                        approche voilure fixe reste inexploitée commercialement.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5 rounded-xl border border-primary/30 text-center">
                      <p className="text-base text-gray-700 leading-relaxed">
                        <strong>📚 Synthèse :</strong> Nos recherches bibliographiques confirment l'absence de solution 
                        accessible combinant voilure fixe, électrique, et reforestation ciblée. Gaia comble ce vide.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* Slide 8: Roadmap */}
            <CarouselItem>
              <div className="h-[92vh] flex items-center justify-center p-4">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-auto">
                  <div className="p-12 space-y-8">
                    <div className="text-center space-y-4">
                      <h2 className="text-5xl font-display font-bold text-gray-900 flex items-center justify-center gap-4">
                        <MapPin className="h-12 w-12 text-primary" />
                        Roadmap du Projet
                      </h2>
                      <p className="text-2xl text-gray-600">
                        Les étapes clés du développement de Gaia
                      </p>
                    </div>

                    {roadmapItems.length > 0 ? (
                      <>
                        <div className="space-y-6">
                          {roadmapItems.map((item, index) => (
                            <div key={item.id} className="bg-white/80 p-6 rounded-xl shadow-lg border-2 border-gray-200">
                              <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold">
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                                    <Badge className={
                                      item.status === 'completed' ? 'bg-green-500' :
                                      item.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-500'
                                    }>
                                      {item.status === 'completed' ? 'Terminé' :
                                       item.status === 'in-progress' ? 'En cours' : 'Planifié'}
                                    </Badge>
                                  </div>
                                  <p className="text-gray-600 mb-2">{item.description}</p>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {item.timeline}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="text-center text-sm text-gray-500">
                          Aperçu des {roadmapItems.length} premières étapes...
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-xl text-gray-600">Roadmap en construction</p>
                      </div>
                    )}

                    <div className="text-center pt-4">
                      <Button
                        size="lg"
                        onClick={() => handleNavigateToPage('/roadmap')}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Voir la roadmap complète
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* Slide 9: L'Équipe */}
            <CarouselItem>
              <div className="h-[92vh] flex items-center justify-center p-4">
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

            {/* Slide 10: Partenaires */}
            <CarouselItem>
              <div className="h-[92vh] flex items-center justify-center p-4">
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

            {/* Slide 11: Documentation */}
            <CarouselItem>
              <div className="h-[92vh] flex items-center justify-center p-4">
                <Card className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-white/50 shadow-2xl overflow-auto">
                  <div className="p-12 space-y-8">
                    <div className="text-center space-y-4">
                      <h2 className="text-5xl font-display font-bold text-gray-900 flex items-center justify-center gap-4">
                        <BookOpen className="h-12 w-12 text-primary" />
                        Documentation Technique
                      </h2>
                      <p className="text-2xl text-gray-600">
                        Guide complet du projet Gaia
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-2 border-blue-200 shadow-lg text-center">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <BookOpen className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-blue-900 mb-3">Documentation Complète</h3>
                        <p className="text-blue-700">
                          Spécifications techniques, architecture du système, et guide d'utilisation détaillé
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-2 border-green-200 shadow-lg text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Zap className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-green-900 mb-3">Technologies Utilisées</h3>
                        <p className="text-green-700">
                          React, TypeScript, Supabase, IoT, Intelligence Artificielle, et systèmes embarqués
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border-2 border-purple-200 shadow-lg text-center">
                        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <TreePine className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-purple-900 mb-3">Impact Environnemental</h3>
                        <p className="text-purple-700">
                          Solution 100% écologique avec zéro émission pour accélérer la reforestation
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border-2 border-orange-200 shadow-lg text-center">
                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Sparkles className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-orange-900 mb-3">Innovation</h3>
                        <p className="text-orange-700">
                          Technologie de pointe combinant drones, IA, et développement durable
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl border-2 border-primary/20 text-center">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Découvrez tous les détails techniques, les spécifications du drone, 
                        l'architecture du système, et les résultats de nos tests en conditions réelles.
                      </p>
                    </div>

                    <div className="text-center pt-4">
                      <Button
                        size="lg"
                        onClick={() => handleNavigateToPage('/documentation')}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <BookOpen className="mr-2 h-5 w-5" />
                        Consulter la documentation
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>

            {/* Slide 12: Contact & Conclusion */}
            <CarouselItem>
              <div className="h-[92vh] flex items-center justify-center p-4">
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
