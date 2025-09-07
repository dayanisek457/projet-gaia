import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

interface LoginProps {
  onLogin: (credentials: { email: string; password: string }) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate authentication check
    if (email === 'contact@projet-gaia.com' && password === 'admin') {
      try {
        // Store auth state in localStorage
        localStorage.setItem('gaia-auth', JSON.stringify({
          email,
          authenticated: true,
          timestamp: Date.now()
        }));
        
        toast.success('Connexion réussie !');
        onLogin({ email, password });
      } catch (err) {
        setError('Erreur lors de la connexion');
      }
    } else {
      setError('Identifiants invalides. Veuillez vérifier votre email et mot de passe.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/favicon.ico" 
                alt="GAIA Logo" 
                className="h-10 w-10 object-contain" 
              />
              <span className="text-2xl font-bold">GAIA Admin</span>
            </div>
          </div>
          <p className="text-gray-600">Connexion au panneau d'administration</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Authentification</span>
            </CardTitle>
            <CardDescription className="text-center">
              Connectez-vous pour accéder au panneau d'administration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Email</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@projet-gaia.com"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Mot de passe</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  required
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-blue-800">
                <Shield className="h-4 w-4" />
                <span className="font-semibold">Accès Administrateur</span>
              </div>
              <p className="text-blue-700">
                Une fois connecté, vous aurez accès à la gestion complète du projet GAIA :
              </p>
              <ul className="text-blue-600 space-y-1 ml-4">
                <li>• Stockage S3 avec fonctionnalités CRUD</li>
                <li>• Gestion de la roadmap publique</li>
                <li>• Upload et liaison de fichiers/images</li>
                <li>• Mode démonstration intégré</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;