import { supabase } from './s3-direct';

export interface Autosave {
  id: string;
  entity_type: 'roadmap' | 'documentation' | 'task' | 'sponsor';
  entity_id: string | null; // null for new/unsaved entities
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export type EntityType = 'roadmap' | 'documentation' | 'task' | 'sponsor';

export interface CreateAutosaveDto {
  entity_type: EntityType;
  entity_id: string | null;
  content: string;
}

class AutosaveService {
  /**
   * Save or update an autosave entry
   */
  async saveAutosave(data: CreateAutosaveDto): Promise<Autosave | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Check if an autosave already exists for this entity
      let query = supabase
        .from('autosaves')
        .select('*')
        .eq('entity_type', data.entity_type)
        .eq('user_id', user.id);
      
      // Handle entity_id - use is null check for null values
      if (data.entity_id === null) {
        query = query.is('entity_id', null);
      } else {
        query = query.eq('entity_id', data.entity_id);
      }
      
      const { data: existing } = await query.maybeSingle();

      if (existing) {
        // Update existing autosave (updated_at is automatically set by trigger)
        const { data: updated, error } = await supabase
          .from('autosaves')
          .update({
            content: data.content
          })
          .eq('id', existing.id)
          .select()
          .single();

        if (error) throw error;
        return updated;
      } else {
        // Create new autosave
        const { data: created, error } = await supabase
          .from('autosaves')
          .insert({
            entity_type: data.entity_type,
            entity_id: data.entity_id,
            content: data.content,
            user_id: user.id
          })
          .select()
          .single();

        if (error) throw error;
        return created;
      }
    } catch (error) {
      console.error('Error saving autosave:', error);
      return null;
    }
  }

  /**
   * Get autosave for a specific entity
   */
  async getAutosave(entityType: EntityType, entityId: string | null): Promise<Autosave | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      let query = supabase
        .from('autosaves')
        .select('*')
        .eq('entity_type', entityType)
        .eq('user_id', user.id);
      
      // Handle entity_id - use is null check for null values
      if (entityId === null) {
        query = query.is('entity_id', null);
      } else {
        query = query.eq('entity_id', entityId);
      }
      
      const { data, error } = await query.maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting autosave:', error);
      return null;
    }
  }

  /**
   * Delete autosave for a specific entity
   */
  async deleteAutosave(entityType: EntityType, entityId: string | null): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      let query = supabase
        .from('autosaves')
        .delete()
        .eq('entity_type', entityType)
        .eq('user_id', user.id);
      
      // Handle entity_id - use is null check for null values
      if (entityId === null) {
        query = query.is('entity_id', null);
      } else {
        query = query.eq('entity_id', entityId);
      }
      
      const { error } = await query;

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting autosave:', error);
      return false;
    }
  }

  /**
   * Delete all autosaves for a specific entity type and user
   */
  async deleteAllAutosaves(entityType: EntityType): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('autosaves')
        .delete()
        .eq('entity_type', entityType)
        .eq('user_id', user.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting all autosaves:', error);
      return false;
    }
  }

  /**
   * Get all autosaves for current user
   */
  async getAllAutosaves(): Promise<Autosave[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('autosaves')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting all autosaves:', error);
      return [];
    }
  }
}

export const autosaveService = new AutosaveService();
