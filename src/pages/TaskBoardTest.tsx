import TaskBoard from '@/components/TaskBoard';

const TaskBoardTest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Test Tableau des Tâches</h1>
          <p className="text-muted-foreground">
            Test des fonctionnalités CRUD du tableau des tâches pour l'équipe
          </p>
        </div>
        <TaskBoard />
      </div>
    </div>
  );
};

export default TaskBoardTest;
