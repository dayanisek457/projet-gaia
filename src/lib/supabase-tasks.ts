// Supabase service for task board operations
import { supabase } from './s3-direct';

export type TaskStatus = 'en-attente' | 'en-cours' | 'termine' | 'bloque';
export type TeamMember = 'Aloys' | 'Yanis' | 'Constant' | 'Hugues' | 'Nathan';

// Valid values for validation
const VALID_STATUSES: TaskStatus[] = ['en-attente', 'en-cours', 'termine', 'bloque'];
const VALID_MEMBERS: TeamMember[] = ['Aloys', 'Yanis', 'Constant', 'Hugues', 'Nathan'];

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: TeamMember;
  status: TaskStatus;
  deadline: string;
  created_at: string;
  updated_at: string;
}

export interface TaskDB {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: string;
  deadline: string;
  created_at: string;
  updated_at: string;
}

class TaskService {
  private tableName = 'tasks';

  /**
   * Validates if a status value is a valid TaskStatus
   */
  private isValidStatus(status: string): status is TaskStatus {
    return VALID_STATUSES.includes(status as TaskStatus);
  }

  /**
   * Validates if a member value is a valid TeamMember
   */
  private isValidMember(member: string): member is TeamMember {
    return VALID_MEMBERS.includes(member as TeamMember);
  }

  /**
   * Convert database record to frontend interface with validation
   */
  private dbToFrontend(dbItem: TaskDB): Task {
    // Validate and default status if invalid
    const status = this.isValidStatus(dbItem.status) ? dbItem.status : 'en-attente';
    // Validate and default assignee if invalid
    const assignee = this.isValidMember(dbItem.assignee) ? dbItem.assignee : 'Aloys';

    return {
      id: dbItem.id,
      title: dbItem.title,
      description: dbItem.description,
      assignee,
      status,
      deadline: dbItem.deadline,
      created_at: dbItem.created_at,
      updated_at: dbItem.updated_at
    };
  }

  /**
   * Convert frontend interface to database record
   */
  private frontendToDb(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Partial<TaskDB> {
    return {
      title: task.title,
      description: task.description,
      assignee: task.assignee,
      status: task.status,
      deadline: task.deadline,
      updated_at: new Date().toISOString()
    };
  }

  /**
   * Get all tasks from the database
   */
  async getAllTasks(): Promise<Task[]> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data ? data.map(item => this.dbToFrontend(item)) : [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  // Get tasks by assignee
  async getTasksByAssignee(assignee: TeamMember): Promise<Task[]> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('assignee', assignee)
        .order('deadline', { ascending: true });

      if (error) throw error;

      return data ? data.map(item => this.dbToFrontend(item)) : [];
    } catch (error) {
      console.error('Error fetching tasks by assignee:', error);
      throw error;
    }
  }

  // Get tasks by status
  async getTasksByStatus(status: TaskStatus): Promise<Task[]> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('status', status)
        .order('deadline', { ascending: true });

      if (error) throw error;

      return data ? data.map(item => this.dbToFrontend(item)) : [];
    } catch (error) {
      console.error('Error fetching tasks by status:', error);
      throw error;
    }
  }

  // Create a new task
  async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
    try {
      const dbTask = this.frontendToDb(task);

      const { data, error } = await supabase
        .from(this.tableName)
        .insert(dbTask)
        .select()
        .single();

      if (error) throw error;

      return this.dbToFrontend(data);
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  // Update an existing task
  async updateTask(id: string, task: Partial<Omit<Task, 'id' | 'created_at'>>): Promise<Task> {
    try {
      const updateData: Partial<TaskDB> = {
        updated_at: new Date().toISOString()
      };

      if (task.title !== undefined) updateData.title = task.title;
      if (task.description !== undefined) updateData.description = task.description;
      if (task.assignee !== undefined) updateData.assignee = task.assignee;
      if (task.status !== undefined) updateData.status = task.status;
      if (task.deadline !== undefined) updateData.deadline = task.deadline;

      const { data, error } = await supabase
        .from(this.tableName)
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return this.dbToFrontend(data);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  // Delete a task
  async deleteTask(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  // Subscribe to real-time changes
  subscribeToChanges(callback: (tasks: Task[]) => void) {
    const subscription = supabase
      .channel('tasks-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: this.tableName
        },
        async () => {
          try {
            const tasks = await this.getAllTasks();
            callback(tasks);
          } catch (error) {
            console.error('Error fetching updated tasks:', error);
          }
        }
      )
      .subscribe();

    return subscription;
  }
}

// Export singleton instance
export const taskService = new TaskService();

// Export team members list for UI components
export const TEAM_MEMBERS: TeamMember[] = ['Aloys', 'Yanis', 'Constant', 'Hugues', 'Nathan'];

// Export status list for UI components
export const TASK_STATUSES: { value: TaskStatus; label: string; color: string }[] = [
  { value: 'en-attente', label: 'En attente', color: 'bg-gray-100 text-gray-800' },
  { value: 'en-cours', label: 'En cours', color: 'bg-blue-100 text-blue-800' },
  { value: 'termine', label: 'Terminé', color: 'bg-green-100 text-green-800' },
  { value: 'bloque', label: 'Bloqué', color: 'bg-red-100 text-red-800' }
];
