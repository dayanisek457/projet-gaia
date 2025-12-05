import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Heart, Mail, Euro, Instagram, Plane, CheckCircle2 } from 'lucide-react';
import { Sponsor, sponsorsService } from '@/lib/supabase-sponsors';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactPopup from '@/components/ContactPopup';

const Partenaires = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [contactType, setContactType] = useState<'sponsor' | 'partner'>('partner');

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
    } finally {
      setLoading(false);
    }
  };

  // Group sponsors by category
  const sponsorsByCategory = sponsors.reduce((acc, sponsor) => {
    if (!acc[sponsor.category]) {
      acc[sponsor.category] = [];
    }
    acc[sponsor.category].push(sponsor);
    return acc;
  }, {} as Record<string, Sponsor[]>);

  const handlePartnerClick = () => {
    setContactType('partner');
    setIsContactPopupOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 via-secondary/10 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-foreground">
                Nos Partenaires
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Découvrez les organisations qui soutiennent le projet Gaia et contribuent 
                à notre mission de révolutionner la reforestation mondiale.
              </p>
              <Button
                size="lg"
                onClick={handlePartnerClick}
                className="font-display font-semibold px-8 py-4 text-lg rounded-xl"
              >
                <Heart className="mr-2 h-5 w-5" />
                Devenir Partenaire
              </Button>
            </div>
          </div>
        </section>

        {/* Pack Sponsor Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-foreground">
                  Offre de Partenariat
                </h2>
                <p className="text-xl text-muted-foreground">
                  Rejoignez l'aventure Gaia et donnez de la visibilité à votre entreprise
                </p>
              </div>

              <Card className="overflow-hidden border-2 border-primary/20 shadow-xl">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 md:p-12">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-primary text-primary-foreground rounded-full p-4">
                      <Euro className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
                    Pack Sponsor
                  </h3>
                  <p className="text-center text-2xl md:text-3xl font-bold text-primary mb-2">
                    À partir de 50€
                  </p>
                  <p className="text-center text-muted-foreground mb-8">
                    par entreprise
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <Card className="bg-background/80 backdrop-blur">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 bg-primary/10 rounded-full p-3">
                            <Instagram className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg mb-2 flex items-center">
                              <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                              Promotion sur les Réseaux Sociaux
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Votre entreprise sera mise en avant sur Instagram grâce à notre partenaire 
                              <strong className="text-primary"> SkyX International</strong> (@skyx_intl)
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-background/80 backdrop-blur">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 bg-primary/10 rounded-full p-3">
                            <Plane className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg mb-2 flex items-center">
                              <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                              Logo sur l'Avion
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Votre logo sera affiché sur notre avion, offrant une visibilité exceptionnelle 
                              à votre entreprise sponsor lors de nos vols et événements
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-10 text-center">
                    <Button
                      size="lg"
                      onClick={handlePartnerClick}
                      className="font-display font-semibold px-10 py-6 text-xl rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <Heart className="mr-3 h-6 w-6" />
                      Je suis intéressé(e)
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                      Contactez-nous pour en savoir plus sur le Pack Sponsor
                    </p>
                  </div>
                </div>
              </Card>

              <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-center text-sm text-muted-foreground">
                  <strong className="text-foreground">Pourquoi devenir sponsor ?</strong><br />
                  En soutenant le projet Gaia, vous contribuez à un avenir plus vert tout en donnant 
                  une visibilité unique à votre entreprise. Votre engagement sera reconnu et valorisé 
                  auprès de notre communauté et lors de nos événements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors Grid Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : sponsors.length === 0 ? (
              <Card className="max-w-2xl mx-auto">
                <CardContent className="py-20 text-center">
                  <Mail className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Premiers Partenaires Recherchés</h3>
                  <p className="text-muted-foreground mb-6">
                    Nous recherchons activement nos premiers partenaires pour soutenir le projet Gaia.
                    Devenez pionnier de cette révolution écologique !
                  </p>
                  <Button onClick={handlePartnerClick}>
                    <Heart className="mr-2 h-4 w-4" />
                    Nous Contacter
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-16">
                {Object.entries(sponsorsByCategory).map(([category, categorySponsors]) => (
                  <div key={category}>
                    <h2 className="text-3xl font-display font-bold mb-8 text-center">
                      {category}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {categorySponsors.map((sponsor) => (
                        <Card key={sponsor.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                          {sponsor.image_url && (
                            <div className="w-full h-48 overflow-hidden bg-muted">
                              <img
                                src={sponsor.image_url}
                                alt={sponsor.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-2xl mb-2">{sponsor.name}</CardTitle>
                                <Badge variant="secondary" className="mb-2">
                                  {sponsor.category}
                                </Badge>
                              </div>
                              {sponsor.logo_url && (
                                <div className="ml-4 flex-shrink-0">
                                  <img
                                    src={sponsor.logo_url}
                                    alt={`${sponsor.name} logo`}
                                    className="w-16 h-16 object-contain"
                                  />
                                </div>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <CardDescription className="text-base leading-relaxed">
                              {sponsor.description}
                            </CardDescription>
                            {sponsor.website_url && (
                              <a
                                href={sponsor.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-primary hover:underline font-medium"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Visiter le site web
                              </a>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-6">
            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-secondary text-white border-0">
              <CardContent className="py-16 text-center">
                <h2 className="text-4xl font-display font-bold mb-6">
                  Rejoignez l'Aventure Gaia
                </h2>
                <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
                  Votre organisation partage nos valeurs environnementales ? 
                  Devenez partenaire et contribuez à un avenir plus vert.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={handlePartnerClick}
                    className="font-display font-semibold px-8 py-4 text-lg rounded-xl"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Devenir Partenaire
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handlePartnerClick}
                    className="font-display font-semibold px-8 py-4 text-lg rounded-xl bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Nous Contacter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
      
      <ContactPopup
        isOpen={isContactPopupOpen}
        onClose={() => setIsContactPopupOpen(false)}
        type={contactType}
      />
    </div>
  );
};

export default Partenaires;
