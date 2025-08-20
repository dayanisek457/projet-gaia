// Direct Supabase Storage access without authentication
// Using the correct Supabase Storage API instead of S3 API
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = 'https://mvtlxvxywbdjkzcouyrn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12dGx4dnh5d2Jkamt6Y291eXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MjA0MTUsImV4cCI6MjA3MTE5NjQxNX0.wlMC3yJCrCLOqPyCV71A5BzwcXoJcC84ygJKTGbEdao';

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface S3File {
  key: string;
  size: number;
  lastModified: Date;
  url?: string;
}

export class S3Manager {
  private bucketName = 'global';

  async listFiles(): Promise<S3File[]> {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .list('', {
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) throw error;

      return (data || []).map(file => ({
        key: file.name,
        size: file.metadata?.size || 0,
        lastModified: new Date(file.created_at),
      }));
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  async uploadFile(file: File): Promise<void> {
    try {
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${file.name}`;
      
      const { error } = await supabase.storage
        .from(this.bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async deleteFile(key: string): Promise<void> {
    try {
      const { error } = await supabase.storage
        .from(this.bucketName)
        .remove([key]);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  async getFileUrl(key: string): Promise<string> {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .createSignedUrl(key, 3600); // 1 hour

      if (error) throw error;
      return data.signedUrl;
    } catch (error) {
      console.error('Error generating file URL:', error);
      throw error;
    }
  }

  async replaceFile(oldKey: string, newFile: File): Promise<void> {
    try {
      // Upload new file with the same key (this replaces the existing file)
      const { error } = await supabase.storage
        .from(this.bucketName)
        .upload(oldKey, newFile, {
          cacheControl: '3600',
          upsert: true // This allows replacing existing files
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error replacing file:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const s3Manager = new S3Manager();