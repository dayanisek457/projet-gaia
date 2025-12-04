import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { likesService } from '@/lib/supabase-likes';
import { useToast } from '@/hooks/use-toast';

const LikeSection = () => {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const { toast } = useToast();

  // Load initial like count
  useEffect(() => {
    const loadLikeCount = async () => {
      try {
        const count = await likesService.getLikeCount();
        setLikeCount(count);
      } catch (error) {
        console.error('Error loading like count:', error);
      }
    };

    loadLikeCount();

    // Subscribe to real-time updates
    const subscription = likesService.subscribeToChanges((newCount) => {
      setLikeCount(newCount);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Check if user has already liked (using localStorage for simplicity)
  useEffect(() => {
    const hasUserLiked = localStorage.getItem('projet-gaia-liked') === 'true';
    setHasLiked(hasUserLiked);
  }, []);

  const handleLike = async () => {
    if (hasLiked || isLiking) return;

    setIsLiking(true);
    try {
      const newCount = await likesService.incrementLike();
      setLikeCount(newCount);
      setHasLiked(true);
      localStorage.setItem('projet-gaia-liked', 'true');
      
      toast({
        title: "Merci pour votre soutien ! 💚",
        description: "Votre like a été comptabilisé pour le projet Gaia.",
      });
    } catch (error) {
      console.error('Error liking project:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background via-primary/3 to-background relative overflow-hidden">
      {/* Elegant background decoration */}
      <div className="absolute inset-0 bg-gradient-cinematic opacity-40"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          {/* Section title with elegant animation */}
          <div className="animate-scale-in">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 tracking-tight">
              Soutenez le projet Gaia
            </h2>
            <p className="text-xl text-foreground/75 mb-10 leading-relaxed">
              Votre soutien nous motive à continuer notre mission de reforestation intelligente
            </p>
          </div>

          {/* Like counter and button with glass morphism */}
          <div className="animate-scale-in-delayed backdrop-elegant rounded-3xl p-10 shadow-2xl border border-white/50 hover-lift" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col items-center space-y-8">
              {/* Like count display with enhanced styling */}
              <div className="text-center">
                <div className="text-7xl font-black font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3 drop-shadow-lg">
                  {likeCount.toLocaleString()}
                </div>
                <div className="text-2xl text-foreground/80 font-semibold">
                  {likeCount === 0 ? 'Aucun like' : likeCount === 1 ? 'personne soutient' : 'personnes soutiennent'} le projet
                </div>
              </div>

              {/* Enhanced like button */}
              <Button
                onClick={handleLike}
                disabled={hasLiked || isLiking}
                size="lg"
                className={`btn-professional group px-10 py-5 text-xl rounded-2xl font-semibold transition-all duration-300 shadow-xl ${
                  hasLiked 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white cursor-default' 
                    : 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl'
                }`}
              >
                <Heart 
                  className={`mr-3 h-7 w-7 transition-all duration-300 ${
                    hasLiked 
                      ? 'fill-white text-white animate-pulse' 
                      : 'group-hover:fill-white group-hover:scale-125'
                  }`} 
                />
                {isLiking ? 'Envoi en cours...' : hasLiked ? 'Merci pour votre soutien !' : 'J\'aime ce projet'}
              </Button>

              {hasLiked && (
                <p className="text-base text-foreground/70 font-medium animate-fade-in-up">
                  Vous avez déjà soutenu ce projet. Merci ! 💚
                </p>
              )}
            </div>
          </div>

          {/* Additional message with fade-in */}
          <div className="animate-fade-in-up mt-10" style={{ animationDelay: '0.6s' }}>
            <p className="text-base text-foreground/60 italic font-medium">
              Chaque like compte dans notre mission pour un avenir plus vert
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LikeSection;