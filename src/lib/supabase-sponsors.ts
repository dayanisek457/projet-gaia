import { supabase } from './s3-direct';

export interface Sponsor {
  id: string;
  name: string;
  description: string;
  logo_url: string | null;
  image_url: string | null;
  website_url: string | null;
  category: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CreateSponsorDto {
  name: string;
  description: string;
  logo_url?: string | null;
  image_url?: string | null;
  website_url?: string | null;
  category: string;
  display_order?: number;
}

export interface UpdateSponsorDto {
  name?: string;
  description?: string;
  logo_url?: string | null;
  image_url?: string | null;
  website_url?: string | null;
  category?: string;
  display_order?: number;
}

class SupabaseSponsorsService {
  private tableName = 'sponsors';

  // Get all sponsors
  async getSponsors(): Promise<Sponsor[]> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching sponsors:', error);
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('Error in getSponsors:', error);
      throw error;
    }
  }

  // Get sponsor by ID
  async getSponsor(id: string): Promise<Sponsor | null> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching sponsor:', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error in getSponsor:', error);
      throw error;
    }
  }

  // Create new sponsor
  async createSponsor(sponsor: CreateSponsorDto): Promise<Sponsor> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .insert([{
          ...sponsor,
          display_order: sponsor.display_order || 0,
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating sponsor:', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error in createSponsor:', error);
      throw error;
    }
  }

  // Update sponsor
  async updateSponsor(id: string, updates: UpdateSponsorDto): Promise<Sponsor> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating sponsor:', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error in updateSponsor:', error);
      throw error;
    }
  }

  // Delete sponsor
  async deleteSponsor(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting sponsor:', error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error in deleteSponsor:', error);
      throw error;
    }
  }

  // Get sponsors by category
  async getSponsorsByCategory(category: string): Promise<Sponsor[]> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('category', category)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching sponsors by category:', error);
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('Error in getSponsorsByCategory:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const sponsorsService = new SupabaseSponsorsService();
