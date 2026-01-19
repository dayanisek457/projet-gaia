import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';

const PhysicsCalculator = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Calculateur Physique</h1>
        <p className="text-muted-foreground">
          Effectuez des calculs aérodynamiques en temps réel avec le tableau de bord Gaia
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>Tableau de Bord Gaia - Calculs Aérodynamiques</span>
          </CardTitle>
          <CardDescription>
            Modifiez les paramètres et voyez les résultats instantanément
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <iframe
            src="/Gaia Dashboard - Fixed.html"
            className="w-full border-0 rounded-b-lg"
            style={{ height: 'calc(100vh - 250px)', minHeight: '800px' }}
            title="Calculateur Physique Gaia"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PhysicsCalculator;
