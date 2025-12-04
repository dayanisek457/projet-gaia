import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, User, Building, MessageSquare } from 'lucide-react';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'sponsor' | 'partner';
}

const ContactPopup = ({ isOpen, onClose, type }: ContactPopupProps) => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with pre-filled content
    const subject = type === 'sponsor' 
      ? 'Demande de sponsoring - Projet Gaia'
      : 'Demande de partenariat - Projet Gaia';
    
    const body = `Bonjour,

Je suis intéressé(e) par ${type === 'sponsor' ? 'sponsoriser' : 'devenir partenaire de'} votre projet Gaia.

Mes informations de contact :
- Nom : ${formData.name}
- Organisation : ${formData.organization}
- Email : ${formData.email}
- Téléphone : ${formData.phone}

Message :
${formData.message}

Cordialement,
${formData.name}`;

    const mailtoLink = `mailto:contact@projet-gaia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
    
    // Reset form and close popup
    setFormData({
      name: '',
      organization: '',
      email: '',
      phone: '',
      message: ''
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-primary" />
            <span>
              {type === 'sponsor' ? 'Devenir Sponsor' : 'Devenir Partenaire'}
            </span>
          </DialogTitle>
          <DialogDescription>
            Remplissez le formulaire ci-dessous pour nous contacter directement par email.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>Nom *</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Votre nom"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organization" className="flex items-center space-x-1">
                <Building className="h-4 w-4" />
                <span>Organisation</span>
              </Label>
              <Input
                id="organization"
                value={formData.organization}
                onChange={(e) => handleInputChange('organization', e.target.value)}
                placeholder="Votre organisation"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>Email *</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="votre.email@exemple.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>Téléphone</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+33 1 23 45 67 89"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span>Message</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder={`Parlez-nous de votre intérêt pour ${type === 'sponsor' ? 'sponsoriser' : 'un partenariat avec'} le projet Gaia...`}
              rows={4}
            />
          </div>
          
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2 text-sm text-primary mb-2">
              <Mail className="h-4 w-4" />
              <span className="font-semibold">Contact direct :</span>
            </div>
            <p className="text-sm text-muted-foreground">
              En cliquant sur "Envoyer", votre client email par défaut s'ouvrira avec un email pré-rempli 
              à destination de <strong>contact@projet-gaia.com</strong>
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!formData.name || !formData.email}
            >
              <Mail className="mr-2 h-4 w-4" />
              Envoyer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactPopup;