import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { taskService, type Task, type TaskStatus, type TeamMember, TEAM_MEMBERS, TASK_STATUSES } from '@/lib/supabase-tasks';
import { useAutosave } from '@/hooks/useAutosave';
import { Edit, Trash2, Plus, Calendar, User, Clock, CheckCircle2, AlertCircle, Hourglass, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { format, isPast, isToday, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TaskFormData {
  title: string;
  description: string;
  assignee: TeamMember | '';
  status: TaskStatus;
  deadline: string;
}

const initialFormData: TaskFormData = {
  title: '',
  description: '',
  assignee: '',
  status: 'en-attente',
  deadline: ''
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<TaskFormData>(initialFormData);
  const [filterMember, setFilterMember] = useState<TeamMember | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');

  // Autosave for task form
  const taskFormContent = JSON.stringify(formData);
  const { clearAutosave } = useAutosave({
    entityType: 'task',
    entityId: editingTask?.id || null,
    content: taskFormContent,
    enabled: showCreateDialog || showEditDialog,
  });

  useEffect(() => {
    loadTasks();

    // Subscribe to real-time changes
    const subscription = taskService.subscribeToChanges((updatedTasks) => {
      setTasks(updatedTasks);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      toast.error('Erreur lors du chargement des tâches');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.title || !formData.assignee || !formData.deadline) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      await taskService.createTask({
        title: formData.title,
        description: formData.description,
        assignee: formData.assignee as TeamMember,
        status: formData.status,
        deadline: formData.deadline
      });

      // Clear autosave after successful creation
      await clearAutosave();

      setShowCreateDialog(false);
      setFormData(initialFormData);
      toast.success('Tâche créée avec succès !');
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Erreur lors de la création de la tâche');
    }
  };

  const handleUpdate = async () => {
    if (!editingTask || !formData.title || !formData.assignee || !formData.deadline) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      await taskService.updateTask(editingTask.id, {
        title: formData.title,
        description: formData.description,
        assignee: formData.assignee as TeamMember,
        status: formData.status,
        deadline: formData.deadline
      });

      // Clear autosave after successful update
      await clearAutosave();

      setShowEditDialog(false);
      setEditingTask(null);
      setFormData(initialFormData);
      toast.success('Tâche mise à jour avec succès !');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Erreur lors de la mise à jour de la tâche');
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await taskService.deleteTask(taskId);
      toast.success('Tâche supprimée');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Erreur lors de la suppression de la tâche');
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await taskService.updateTask(taskId, { status: newStatus });
      toast.success('Statut mis à jour');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      assignee: task.assignee,
      status: task.status,
      deadline: task.deadline
    });
    setShowEditDialog(true);
  };

  const openCreateDialog = () => {
    setFormData(initialFormData);
    setShowCreateDialog(true);
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'termine':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'en-cours':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'en-attente':
        return <Hourglass className="h-4 w-4 text-gray-600" />;
      case 'bloque':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    const statusConfig = TASK_STATUSES.find(s => s.value === status);
    return statusConfig ? (
      <Badge className={statusConfig.color}>
        {getStatusIcon(status)}
        <span className="ml-1">{statusConfig.label}</span>
      </Badge>
    ) : null;
  };

  const getDeadlineBadge = (deadline: string) => {
    const deadlineDate = parseISO(deadline);
    const isOverdue = isPast(deadlineDate) && !isToday(deadlineDate);
    const isDueToday = isToday(deadlineDate);

    if (isOverdue) {
      return (
        <Badge className="bg-red-100 text-red-800">
          <Calendar className="h-3 w-3 mr-1" />
          En retard
        </Badge>
      );
    }
    if (isDueToday) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          <Calendar className="h-3 w-3 mr-1" />
          Aujourd'hui
        </Badge>
      );
    }
    return null;
  };

  const getMemberColor = (member: TeamMember) => {
    const colors: Record<TeamMember, string> = {
      'Aloys': 'bg-purple-100 text-purple-800',
      'Yanis': 'bg-indigo-100 text-indigo-800',
      'Constant': 'bg-cyan-100 text-cyan-800',
      'Hugues': 'bg-amber-100 text-amber-800',
      'Nathan': 'bg-emerald-100 text-emerald-800'
    };
    return colors[member] || 'bg-gray-100 text-gray-800';
  };

  // Filter tasks - memoized to avoid redundant filtering
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const memberMatch = filterMember === 'all' || task.assignee === filterMember;
      const statusMatch = filterStatus === 'all' || task.status === filterStatus;
      return memberMatch && statusMatch;
    });
  }, [tasks, filterMember, filterStatus]);

  // Group tasks by assignee - memoized
  const tasksByMember = useMemo(() => {
    return TEAM_MEMBERS.reduce((acc, member) => {
      acc[member] = filteredTasks.filter(task => task.assignee === member);
      return acc;
    }, {} as Record<TeamMember, Task[]>);
  }, [filteredTasks]);

  // Group tasks by status - memoized
  const tasksByStatus = useMemo(() => {
    return TASK_STATUSES.reduce((acc, status) => {
      acc[status.value] = filteredTasks.filter(task => task.status === status.value);
      return acc;
    }, {} as Record<TaskStatus, Task[]>);
  }, [filteredTasks]);

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="mb-3 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-sm line-clamp-2">{task.title}</h4>
          <div className="flex space-x-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => openEditDialog(task)}
            >
              <Edit className="h-3 w-3" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-600 hover:text-red-700">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                  <AlertDialogDescription>
                    Êtes-vous sûr de vouloir supprimer la tâche "{task.title}" ?
                    Cette action est irréversible.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {task.description && (
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{task.description}</p>
        )}

        <div className="flex flex-wrap gap-1 mb-2">
          <Badge className={getMemberColor(task.assignee)}>
            <User className="h-3 w-3 mr-1" />
            {task.assignee}
          </Badge>
          {getStatusBadge(task.status)}
          {getDeadlineBadge(task.deadline)}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            <Calendar className="inline h-3 w-3 mr-1" />
            {format(parseISO(task.deadline), 'dd MMM yyyy', { locale: fr })}
          </span>
          <Select
            value={task.status}
            onValueChange={(value) => handleStatusChange(task.id, value as TaskStatus)}
          >
            <SelectTrigger className="h-7 w-[110px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TASK_STATUSES.map(status => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );

  // Form content JSX - rendered inline to avoid re-mounting issues
  const renderFormContent = () => (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="task-title">Titre *</Label>
        <Input
          id="task-title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Titre de la tâche"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="task-description">Description</Label>
        <Textarea
          id="task-description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Description de la tâche"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="task-assignee">Assigné à *</Label>
          <Select
            value={formData.assignee}
            onValueChange={(value) => setFormData(prev => ({ ...prev, assignee: value as TeamMember }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              {TEAM_MEMBERS.map(member => (
                <SelectItem key={member} value={member}>
                  {member}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="task-status">Statut</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as TaskStatus }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TASK_STATUSES.map(status => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="task-deadline">Date limite *</Label>
        <Input
          id="task-deadline"
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tableau des Tâches</h1>
          <p className="text-muted-foreground">
            Gérez les tâches de l'équipe avec des deadlines et des statuts
          </p>
        </div>
        <Button onClick={openCreateDialog} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nouvelle tâche</span>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Label className="text-sm">Membre:</Label>
              <Select
                value={filterMember}
                onValueChange={(value) => setFilterMember(value as TeamMember | 'all')}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  {TEAM_MEMBERS.map(member => (
                    <SelectItem key={member} value={member}>
                      {member}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Label className="text-sm">Statut:</Label>
              <Select
                value={filterStatus}
                onValueChange={(value) => setFilterStatus(value as TaskStatus | 'all')}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  {TASK_STATUSES.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center ml-auto">
              <Badge variant="outline" className="text-sm">
                {filteredTasks.length} tâche(s)
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des tâches...</p>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="by-member" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="by-member">Par membre</TabsTrigger>
            <TabsTrigger value="by-status">Par statut</TabsTrigger>
          </TabsList>

          <TabsContent value="by-member" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {TEAM_MEMBERS.map(member => (
                <Card key={member} className="bg-gray-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {member}
                      </span>
                      <Badge variant="secondary">{tasksByMember[member]?.length || 0}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {tasksByMember[member]?.length === 0 ? (
                      <p className="text-xs text-gray-500 text-center py-4">Aucune tâche</p>
                    ) : (
                      tasksByMember[member]?.map(task => (
                        <TaskCard key={task.id} task={task} />
                      ))
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="by-status" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {TASK_STATUSES.map(status => (
                <Card key={status.value} className="bg-gray-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span className="flex items-center">
                        {getStatusIcon(status.value)}
                        <span className="ml-2">{status.label}</span>
                      </span>
                      <Badge variant="secondary">{tasksByStatus[status.value]?.length || 0}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {tasksByStatus[status.value]?.length === 0 ? (
                      <p className="text-xs text-gray-500 text-center py-4">Aucune tâche</p>
                    ) : (
                      tasksByStatus[status.value]?.map(task => (
                        <TaskCard key={task.id} task={task} />
                      ))
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle tâche</DialogTitle>
            <DialogDescription>
              Ajoutez une nouvelle tâche au tableau
            </DialogDescription>
          </DialogHeader>
          {renderFormContent()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleCreate}
              disabled={!formData.title || !formData.assignee || !formData.deadline}
            >
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier la tâche</DialogTitle>
            <DialogDescription>
              Modifiez les informations de cette tâche
            </DialogDescription>
          </DialogHeader>
          {renderFormContent()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleUpdate}
              disabled={!formData.title || !formData.assignee || !formData.deadline}
            >
              Mettre à jour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskBoard;
