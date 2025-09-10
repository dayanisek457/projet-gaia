// Supabase service for project likes operations
import { supabase } from './s3-direct';

export interface ProjectLikes {
  id: string;
  totalLikes: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectLikesDB {
  id: string;
  total_likes: number;
  created_at: string;
  updated_at: string;
}

class LikesService {
  private tableName = 'project_likes';

  // Convert database record to frontend interface
  private dbToFrontend(dbItem: ProjectLikesDB): ProjectLikes {
    return {
      id: dbItem.id,
      totalLikes: dbItem.total_likes,
      createdAt: dbItem.created_at,
      updatedAt: dbItem.updated_at
    };
  }

  // Get current like count
  async getLikeCount(): Promise<number> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('total_likes')
        .single();

      if (error) throw error;

      return data.total_likes;
    } catch (error) {
      console.error('Error fetching like count:', error);
      return 0; // Return 0 as fallback
    }
  }

  // Get full like record
  async getLikeRecord(): Promise<ProjectLikes | null> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .single();

      if (error) throw error;

      return this.dbToFrontend(data);
    } catch (error) {
      console.error('Error fetching like record:', error);
      return null;
    }
  }

  // Increment like count
  async incrementLike(): Promise<number> {
    try {
      // First get current count
      const currentRecord = await this.getLikeRecord();
      if (!currentRecord) {
        throw new Error('No like record found');
      }

      const newCount = currentRecord.totalLikes + 1;

      // Update the count
      const { data, error } = await supabase
        .from(this.tableName)
        .update({ total_likes: newCount })
        .eq('id', currentRecord.id)
        .select('total_likes')
        .single();

      if (error) throw error;

      return data.total_likes;
    } catch (error) {
      console.error('Error incrementing like count:', error);
      throw error;
    }
  }

  // Subscribe to real-time changes
  subscribeToChanges(callback: (likes: number) => void) {
    const subscription = supabase
      .channel('likes-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: this.tableName
        },
        async (payload) => {
          // Extract the new like count from the payload
          const newLikeCount = (payload.new as ProjectLikesDB).total_likes;
          callback(newLikeCount);
        }
      )
      .subscribe();

    return subscription;
  }
}

// Export singleton instance
export const likesService = new LikesService();