import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { LogIn } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (user: any) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin`
        }
      });

      if (error) {
        throw error;
      }

      // The redirect will handle the rest
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img 
              src="/favicon.ico" 
              alt="GAIA Logo" 
              className="h-8 w-8 object-contain" 
            />
            <span className="text-xl font-bold">GAIA Admin</span>
          </div>
          <CardTitle>Accès Administrateur</CardTitle>
          <CardDescription>
            Connectez-vous avec Google pour accéder au panneau d'administration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2"
            size="lg"
          >
            <LogIn className="h-4 w-4" />
            <span>{loading ? 'Connexion...' : 'Se connecter avec Google'}</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;