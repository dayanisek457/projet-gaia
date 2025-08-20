import RoadmapCreator from '@/components/RoadmapCreator';

const RoadmapTest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Test Création Roadmap</h1>
          <p className="text-muted-foreground">
            Test des fonctionnalités de création d'éléments roadmap avec upload de fichiers
          </p>
        </div>
        <RoadmapCreator />
      </div>
    </div>
  );
};

export default RoadmapTest;