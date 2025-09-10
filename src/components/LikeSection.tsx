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
    <section className="py-16 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-gradient-cinematic opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          {/* Section title */}
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 tracking-tight">
              Soutenez le projet Gaia
            </h2>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              Votre soutien nous motive à continuer notre mission de reforestation intelligente
            </p>
          </div>

          {/* Like counter and button */}
          <div className="animate-fade-in-up bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col items-center space-y-6">
              {/* Like count display */}
              <div className="text-center">
                <div className="text-6xl font-black font-display text-primary mb-2">
                  {likeCount.toLocaleString()}
                </div>
                <div className="text-xl text-foreground/80 font-medium">
                  {likeCount === 0 ? 'Aucun like' : likeCount === 1 ? 'personne soutient' : 'personnes soutiennent'} le projet
                </div>
              </div>

              {/* Like button */}
              <Button
                onClick={handleLike}
                disabled={hasLiked || isLiking}
                size="lg"
                className={`btn-professional group px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-300 ${
                  hasLiked 
                    ? 'bg-green-500 hover:bg-green-600 text-white cursor-default' 
                    : 'bg-primary hover:bg-primary/90 text-white hover:scale-105'
                }`}
              >
                <Heart 
                  className={`mr-3 h-6 w-6 transition-all duration-300 ${
                    hasLiked 
                      ? 'fill-white text-white' 
                      : 'group-hover:fill-white group-hover:scale-110'
                  }`} 
                />
                {isLiking ? 'Envoi en cours...' : hasLiked ? 'Merci pour votre soutien !' : 'J\'aime ce projet'}
              </Button>

              {hasLiked && (
                <p className="text-sm text-foreground/60">
                  Vous avez déjà soutenu ce projet. Merci ! 💚
                </p>
              )}
            </div>
          </div>

          {/* Additional message */}
          <div className="animate-fade-in-up mt-8" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-foreground/60 italic">
              Chaque like compte dans notre mission pour un avenir plus vert
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LikeSection;