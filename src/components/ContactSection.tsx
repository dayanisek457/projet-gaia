
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, FileText } from 'lucide-react';
import ContactPopup from './ContactPopup';
import { exportDocumentationToPDF } from '@/utils/pdfExport';

const ContactSection = () => {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  const handlePartnerClick = () => {
    setIsContactPopupOpen(true);
  };

  const handleDownloadDocumentation = () => {
    exportDocumentationToPDF();
  };
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Elegant background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/6 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/6 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-scale-in">
            <h2 className="text-section-title mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Contact & Informations
            </h2>
            <p className="text-body max-w-2xl mx-auto text-foreground/80">
              Intéressé par notre projet Gaia ? Contactez-nous pour en savoir plus 
              sur notre solution de reforestation innovante et les opportunités de partenariat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Contact Info with enhanced styling */}
            <Card className="border-primary/30 hover-lift backdrop-elegant animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <Mail className="h-6 w-6 text-primary" />
                  <span>Informations de Contact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-start space-x-4 p-3 rounded-xl hover:bg-primary/5 transition-colors duration-300">
                  <MapPin className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold text-lg">Lycée Saint-Joseph</p>
                    <p className="text-muted-foreground">Dijon, France</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-3 rounded-xl hover:bg-primary/5 transition-colors duration-300">
                  <Phone className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold text-lg">06.67.69.09.78</p>
                    <p className="text-muted-foreground">Yanis EL-KFEL</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-3 rounded-xl hover:bg-primary/5 transition-colors duration-300">
                  <FileText className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold text-lg">Type de Projet</p>
                    <p className="text-muted-foreground">Terminale - Sciences de l'Ingénieur</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Call to Action with gradient background */}
          <Card className="bg-gradient-primary text-white text-center animate-scale-in-delayed shadow-2xl border-0 overflow-hidden relative" style={{ animationDelay: '0.4s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-white text-3xl md:text-4xl mb-3 font-bold">Rejoignez la Mission Gaia</CardTitle>
              <p className="text-white/85 text-lg">Partenaires, sponsors et organisations engagées</p>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-white/90 text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
                Ensemble, construisons un avenir plus vert pour notre planète. 
                Découvrez comment Gaia peut transformer la reforestation mondiale 
                et valoriser votre engagement environnemental.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center mb-8">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="group bg-white text-primary hover:bg-white/95 font-semibold px-8 py-4 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl"
                  onClick={handleDownloadDocumentation}
                >
                  <span className="mr-2 text-xl">📋</span>
                  Télécharger la Documentation
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-white/15 border-2 border-white/40 text-white hover:bg-white/25 hover:border-white/60 group backdrop-blur-md font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl"
                  onClick={handlePartnerClick}
                >
                  <span className="mr-2 text-xl">🤝</span>
                  Devenir Partenaire
                </Button>
              </div>
              
              {/* Enhanced Contact CTA */}
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                <p className="text-white text-base mb-3">
                  <strong className="text-lg">Email:</strong> contact@projet-gaia.com
                </p>
                <p className="text-white/80 text-sm mb-1">
                  Lycée Saint-Joseph Dijon
                </p>
                <p className="text-white/80 text-sm">
                  Projet SI Terminale 2025-2026 | www.projet-gaia.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <ContactPopup
        isOpen={isContactPopupOpen}
        onClose={() => setIsContactPopupOpen(false)}
        type="partner"
      />
    </section>
  );
};

export default ContactSection;
