import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import S3Dashboard from '@/components/S3Dashboard';
import S3DashboardDemo from '@/components/S3DashboardDemo';
import RoadmapManager from '@/components/RoadmapManager';
import DocumentationManager from '@/components/DocumentationManager';
import Login from '@/components/Login';
import { Settings, Database, Shield, TestTube, LogOut, FileText } from 'lucide-react';
import { toast } from 'sonner';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [useDemoMode, setUseDemoMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    // Check if user is already authenticated
    const authData = localStorage.getItem('gaia-auth');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        const hoursSinceAuth = (Date.now() - parsed.timestamp) / (1000 * 60 * 60);
        
        if (parsed.authenticated && hoursSinceAuth < 24) { // 24 hours session
          setIsAuthenticated(true);
          setCurrentUser({ email: parsed.email });
        } else {
          // Session expired
          localStorage.removeItem('gaia-auth');
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
        localStorage.removeItem('gaia-auth');
      }
    }
  }, []);

  const handleLogin = (credentials: { email: string; password: string }) => {
    setIsAuthenticated(true);
    setCurrentUser({ email: credentials.email });
  };

  const handleLogout = () => {
    localStorage.removeItem('gaia-auth');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab('dashboard');
    toast.success('Déconnexion réussie');
  };

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Settings },
    { id: 's3', label: 'Gestion S3', icon: Database },
    { id: 'roadmap', label: 'Roadmap', icon: Shield },
    { id: 'documentation', label: 'Documentation', icon: FileText },
  ];

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
              <Button
                onClick={() => setUseDemoMode(!useDemoMode)}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <TestTube className="h-4 w-4" />
                <span>{useDemoMode ? 'Mode Réel' : 'Mode Demo'}</span>
              </Button>
              <div className="text-sm text-right">
                <span className="text-muted-foreground">Connecté en tant que:</span>
                <p className="font-medium">{currentUser?.email}</p>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                size="sm"
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Déconnexion</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Mode Banner */}
      {useDemoMode && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
          <div className="container mx-auto">
            <div className="flex items-center space-x-2 text-yellow-800">
              <TestTube className="h-4 w-4" />
              <span className="font-medium">Mode Démonstration Activé</span>
              <span>- Utilise des données simulées pour montrer les fonctionnalités S3</span>
            </div>
          </div>
        </div>
      )}

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
                Interface d'administration du projet GAIA avec stockage S3 direct
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>Stockage S3</span>
                  </CardTitle>
                  <CardDescription>
                    Gestion directe des fichiers sur Supabase S3
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Endpoint:</span>
                      <code className="text-xs bg-muted px-1 rounded">supabase.co/s3</code>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Bucket:</span>
                      <code className="text-xs bg-muted px-1 rounded">global</code>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Region:</span>
                      <code className="text-xs bg-muted px-1 rounded">eu-west-3</code>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Mode:</span>
                      <Badge variant={useDemoMode ? "secondary" : "default"}>
                        {useDemoMode ? "Démo" : "Réel"}
                      </Badge>
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
                    <span>Roadmap</span>
                  </CardTitle>
                  <CardDescription>
                    Création et gestion de la roadmap
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Statut:</span>
                      <Badge variant="default">Actif</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fichiers liés:</span>
                      <span className="text-xs">S3 intégré</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Upload:</span>
                      <Badge variant="default">Fonctionnel</Badge>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setActiveTab('roadmap')} 
                    className="w-full mt-4"
                    size="sm"
                  >
                    Gérer roadmap
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Documentation</span>
                  </CardTitle>
                  <CardDescription>
                    Éditeur avancé de documentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sections:</span>
                      <Badge variant="default">Éditables</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Types:</span>
                      <span className="text-xs">Tableaux, accordéons...</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fonctionnalités:</span>
                      <Badge variant="default">Avancées</Badge>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setActiveTab('documentation')} 
                    className="w-full mt-4"
                    size="sm"
                  >
                    Gérer documentation
                  </Button>
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
                    <p>✅ S3 configuré</p>
                    <p>✅ Upload fonctionnel</p>
                    <p>✅ Interface admin active</p>
                    <p>✅ Roadmap intégrée</p>
                    <p>✅ Documentation avancée</p>
                    <p>✅ Mode démo disponible</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Instructions d'utilisation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Mode Réel (par défaut)</h4>
                  <p className="text-blue-800 text-sm">
                    Utilise l'API Supabase réelle avec vos identifiants. Nécessite une connectivité réseau appropriée.
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Mode Démonstration</h4>
                  <p className="text-green-800 text-sm">
                    Utilise des données simulées pour démontrer les fonctionnalités CRUD complètes. Parfait pour les tests et présentations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 's3' && (
          useDemoMode ? <S3DashboardDemo /> : <S3Dashboard />
        )}
        
        {activeTab === 'roadmap' && (
          <RoadmapManager />
        )}

        {activeTab === 'documentation' && (
          <DocumentationManager />
        )}
      </main>
    </div>
  );
};

export default Admin;