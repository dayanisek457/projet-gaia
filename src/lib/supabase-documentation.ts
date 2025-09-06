// Supabase service for documentation operations
import { supabase } from './s3-direct';

export interface DocSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'rich' | 'accordion' | 'table' | 'callout' | 'checklist';
  data?: any;
  order: number;
  isPublished: boolean;
}

export interface DocSectionDB {
  id: string;
  section_id: string;
  title: string;
  content: string;
  type: string;
  data: any;
  order_index: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

class DocumentationService {
  private tableName = 'documentation_sections';

  // Convert database record to frontend interface
  private dbToFrontend(dbItem: DocSectionDB): DocSection {
    return {
      id: dbItem.section_id,
      title: dbItem.title,
      content: dbItem.content,
      type: dbItem.type as DocSection['type'],
      data: dbItem.data || {},
      order: dbItem.order_index,
      isPublished: dbItem.is_published
    };
  }

  // Convert frontend interface to database record
  private frontendToDb(item: DocSection): Partial<DocSectionDB> {
    return {
      section_id: item.id,
      title: item.title,
      content: item.content,
      type: item.type,
      data: item.data || {},
      order_index: item.order,
      is_published: item.isPublished,
      updated_at: new Date().toISOString()
    };
  }

  // Get all documentation sections
  async getAllSections(): Promise<DocSection[]> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;

      return data ? data.map(item => this.dbToFrontend(item)) : [];
    } catch (error) {
      console.error('Error fetching documentation sections:', error);
      throw error;
    }
  }

  // Get only published sections
  async getPublishedSections(): Promise<DocSection[]> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (error) throw error;

      return data ? data.map(item => this.dbToFrontend(item)) : [];
    } catch (error) {
      console.error('Error fetching published documentation sections:', error);
      throw error;
    }
  }

  // Create a new documentation section
  async createSection(section: Omit<DocSection, 'id'>): Promise<DocSection> {
    try {
      const newSection: DocSection = {
        ...section,
        id: Date.now().toString() // Use same ID generation as current code
      };
      
      const dbItem = this.frontendToDb(newSection);
      
      const { data, error } = await supabase
        .from(this.tableName)
        .insert(dbItem)
        .select()
        .single();

      if (error) throw error;

      return this.dbToFrontend(data);
    } catch (error) {
      console.error('Error creating documentation section:', error);
      throw error;
    }
  }

  // Update an existing documentation section
  async updateSection(section: DocSection): Promise<DocSection> {
    try {
      const dbItem = this.frontendToDb(section);
      
      const { data, error } = await supabase
        .from(this.tableName)
        .update(dbItem)
        .eq('section_id', section.id)
        .select()
        .single();

      if (error) throw error;

      return this.dbToFrontend(data);
    } catch (error) {
      console.error('Error updating documentation section:', error);
      throw error;
    }
  }

  // Delete a documentation section
  async deleteSection(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq('section_id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting documentation section:', error);
      throw error;
    }
  }

  // Bulk save sections (for reordering)
  async saveSections(sections: DocSection[]): Promise<DocSection[]> {
    try {
      // Update all sections with new order
      const promises = sections.map((section, index) => 
        this.updateSection({ ...section, order: index + 1 })
      );
      
      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      console.error('Error saving documentation sections:', error);
      throw error;
    }
  }

  // Subscribe to real-time changes
  subscribeToChanges(callback: (sections: DocSection[]) => void) {
    const subscription = supabase
      .channel('documentation-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all changes (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: this.tableName
        },
        async () => {
          // Fetch updated data when changes occur
          try {
            const sections = await this.getAllSections();
            callback(sections);
          } catch (error) {
            console.error('Error fetching updated documentation sections:', error);
          }
        }
      )
      .subscribe();

    return subscription;
  }
}

// Export singleton instance
export const documentationService = new DocumentationService();