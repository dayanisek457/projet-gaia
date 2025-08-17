
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, FileText } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-section-title mb-6">
              Contact & Informations
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Intéressé par notre projet GAIA ? Contactez-nous pour en savoir plus 
              sur notre solution de reforestation innovante.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Contact Info */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>Informations de Contact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Lycée Saint-Joseph</p>
                    <p className="text-muted-foreground">Dijon, France</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Chef de Projet</p>
                    <p className="text-muted-foreground">Nathan LIENARD</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Type de Projet</p>
                    <p className="text-muted-foreground">Terminale Sciences de l'Ingénieur</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Specs */}
            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-secondary" />
                  <span>Spécifications Projet</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Budget maximum</span>
                  <span className="font-semibold">300 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Début du projet</span>
                  <span className="font-semibold">Juin 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Fin prévue</span>
                  <span className="font-semibold">Juin 2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Type de financement</span>
                  <span className="font-semibold">Temps & Matériel</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-primary text-white text-center">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Rejoignez la Mission GAIA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 text-lg mb-6">
                Ensemble, construisons un avenir plus vert pour notre planète. 
                Découvrez comment GAIA peut transformer la reforestation mondiale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  Télécharger le Cahier des Charges
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Documentation Technique
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
