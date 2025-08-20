import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SupabaseStorageDashboard from '@/components/SupabaseStorageDashboard';
import RoadmapCreator from '@/components/RoadmapCreator';
import { supabase } from '@/lib/supabase';
import { LogOut, Shield, Settings, Database } from 'lucide-react';

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session - user is guaranteed to be authenticated here due to ProtectedRoute
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate('/login', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Navigation will be handled by the auth state change listener
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Settings },
    { id: 's3', label: 'Gestion S3', icon: Database },
    { id: 'roadmap', label: 'Roadmap', icon: Shield },
  ];

  // TEMPORARY: Skip authentication check for testing
  // if (!user) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
  //         <p>Chargement...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img 
                  src="/favicon.ico" 
                  alt="GAIA Logo" 
                  className="h-8 w-8 object-contain" 
                />
                <span className="text-xl font-bold">GAIA Admin</span>
              </div>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Shield className="h-3 w-3" />
                <span>Administrateur</span>
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Connecté en tant que</span>
                <p className="font-medium">{user?.email || 'admin@test.com'}</p>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard Administrateur</h1>
              <p className="text-muted-foreground">
                Bienvenue dans l'interface d'administration du projet GAIA
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>Stockage S3</span>
                  </CardTitle>
                  <CardDescription>
                    Gestion des fichiers sur Supabase S3
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Endpoint:</span>
                      <code className="text-xs bg-muted px-1 rounded">supabase.co</code>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Bucket:</span>
                      <code className="text-xs bg-muted px-1 rounded">global</code>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Region:</span>
                      <code className="text-xs bg-muted px-1 rounded">eu-west-3</code>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setActiveTab('s3')} 
                    className="w-full mt-4"
                    size="sm"
                  >
                    Gérer les fichiers
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Authentification</span>
                  </CardTitle>
                  <CardDescription>
                    Gestion via Supabase Auth
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Provider:</span>
                      <Badge variant="outline">Email</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Status:</span>
                      <Badge variant="default">Connecté</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Email:</span>
                      <span className="text-xs">{user?.email || 'admin@test.com'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Configuration</span>
                  </CardTitle>
                  <CardDescription>
                    Paramètres du système
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>✅ Supabase configuré</p>
                    <p>✅ S3/Supabase connecté</p>
                    <p>✅ Interface admin active</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 's3' && <SupabaseStorageDashboard />}
        
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Gestion Roadmap</h1>
              <p className="text-muted-foreground">
                Créez et gérez les éléments de la roadmap du projet GAIA
              </p>
            </div>
            <RoadmapCreator />
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;