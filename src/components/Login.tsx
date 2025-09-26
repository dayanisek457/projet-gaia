import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, User } from 'lucide-react';
import { toast } from 'sonner';
import { authService, AuthUser } from '@/lib/supabase-auth';

interface LoginProps {
  onLogin: (user: AuthUser) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTestMode = () => {
    console.log('Activating test mode');
    localStorage.setItem('admin-test-mode', 'true');
    const testUser: AuthUser = {
      email: 'test@gaia-project.com',
      id: 'test-user-123',
      role: 'admin'
    };
    toast.success('Mode test activé');
    onLogin(testUser);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { user, error: authError } = await authService.signIn(email, password);
      
      if (authError) {
        setError(authError);
        return;
      }

      if (user) {
        toast.success('Connexion réussie !');
        onLogin(user);
      } else {
        setError('Erreur de connexion inattendue');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Erreur lors de la connexion - Service indisponible');
    } finally {
      setLoading(false);
    }
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
              Connectez-vous avec votre compte Supabase
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
                  placeholder="votre@email.com"
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
              
              {/* Test Mode Button for Development */}
              <Button 
                type="button" 
                variant="outline"
                className="w-full" 
                onClick={handleTestMode}
                disabled={loading}
              >
                Mode Test (Développement)
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
                <span className="font-semibold">Authentification Supabase</span>
              </div>
              <p className="text-blue-700">
                Utilise l'authentification Supabase sécurisée pour l'accès administrateur :
              </p>
              <ul className="text-blue-600 space-y-1 ml-4">
                <li>• Connexion sécurisée avec email/mot de passe</li>
                <li>• Gestion des sessions automatique</li>
                <li>• Accès complet aux fonctionnalités admin</li>
                <li>• Stockage S3 et gestion des données</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;