// Supabase service for roadmap operations
import { supabase } from './s3-direct';

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  timeline: string;
  files: string[];
  status: 'completed' | 'in-progress' | 'planned';
  createdAt: string;
  updatedAt: string;
}

export interface RoadmapItemDB {
  id: string;
  title: string;
  description: string;
  content: string | null;
  image_url: string | null;
  attached_files: string[];
  entry_date: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  timeline: string | null;
  status: string;
}

class RoadmapService {
  private tableName = 'roadmap_entries';

  // Convert database record to frontend interface
  private dbToFrontend(dbItem: RoadmapItemDB): RoadmapItem {
    return {
      id: dbItem.id,
      title: dbItem.title,
      description: dbItem.description,
      timeline: dbItem.timeline || 'Non spécifié',
      files: dbItem.attached_files || [],
      status: (dbItem.status as 'completed' | 'in-progress' | 'planned') || 'planned',
      createdAt: dbItem.created_at,
      updatedAt: dbItem.updated_at
    };
  }

  // Convert frontend interface to database record
  private frontendToDb(item: Omit<RoadmapItem, 'id' | 'createdAt' | 'updatedAt'>): Partial<RoadmapItemDB> {
    return {
      title: item.title,
      description: item.description,
      timeline: item.timeline,
      status: item.status,
      attached_files: item.files,
      is_published: true, // Items created from admin should be published
      updated_at: new Date().toISOString()
    };
  }

  // Get all roadmap items
  async getAllItems(): Promise<RoadmapItem[]> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: true });

      if (error) throw error;

      return data ? data.map(item => this.dbToFrontend(item)) : [];
    } catch (error) {
      console.error('Error fetching roadmap items:', error);
      throw error;
    }
  }

  // Create a new roadmap item
  async createItem(item: Omit<RoadmapItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<RoadmapItem> {
    try {
      const dbItem = this.frontendToDb(item);
      
      const { data, error } = await supabase
        .from(this.tableName)
        .insert(dbItem)
        .select()
        .single();

      if (error) throw error;

      return this.dbToFrontend(data);
    } catch (error) {
      console.error('Error creating roadmap item:', error);
      throw error;
    }
  }

  // Update an existing roadmap item
  async updateItem(id: string, item: Partial<Omit<RoadmapItem, 'id' | 'createdAt'>>): Promise<RoadmapItem> {
    try {
      const dbItem = this.frontendToDb(item as Omit<RoadmapItem, 'id' | 'createdAt' | 'updatedAt'>);
      
      const { data, error } = await supabase
        .from(this.tableName)
        .update(dbItem)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return this.dbToFrontend(data);
    } catch (error) {
      console.error('Error updating roadmap item:', error);
      throw error;
    }
  }

  // Delete a roadmap item
  async deleteItem(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting roadmap item:', error);
      throw error;
    }
  }

  // Subscribe to real-time changes
  subscribeToChanges(callback: (items: RoadmapItem[]) => void) {
    const subscription = supabase
      .channel('roadmap-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all changes (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: this.tableName,
          filter: 'is_published=eq.true'
        },
        async () => {
          // Fetch updated data when changes occur
          try {
            const items = await this.getAllItems();
            callback(items);
          } catch (error) {
            console.error('Error fetching updated roadmap items:', error);
          }
        }
      )
      .subscribe();

    return subscription;
  }
}

// Export singleton instance
export const roadmapService = new RoadmapService();