import { supabase } from './supabase';

export interface StorageFile {
  Key: string;
  LastModified: Date;
  Size: number;
  StorageClass: string;
}

export class SupabaseStorageAdapter {
  private bucketName: string;

  constructor(bucketName: string = 'global') {
    this.bucketName = bucketName;
  }

  async listFiles(): Promise<StorageFile[]> {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .list('', {
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) throw error;

      return (data || []).map(file => ({
        Key: file.name,
        LastModified: new Date(file.created_at),
        Size: file.metadata?.size || 0,
        StorageClass: 'STANDARD'
      }));
    } catch (error) {
      console.error('Error fetching files:', error);
      throw error;
    }
  }

  async uploadFile(file: File): Promise<void> {
    try {
      const { error } = await supabase.storage
        .from(this.bucketName)
        .upload(file.name, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async deleteFile(fileName: string): Promise<void> {
    try {
      const { error } = await supabase.storage
        .from(this.bucketName)
        .remove([fileName]);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  async getDownloadUrl(fileName: string): Promise<string> {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .createSignedUrl(fileName, 300); // 5 minutes

      if (error) throw error;
      return data.signedUrl;
    } catch (error) {
      console.error('Error generating download URL:', error);
      throw error;
    }
  }

  async replaceFile(fileName: string, file: File): Promise<void> {
    try {
      // Delete the old file first
      await this.deleteFile(fileName);
      
      // Upload the new file with the same name
      const { error } = await supabase.storage
        .from(this.bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error replacing file:', error);
      throw error;
    }
  }
}

export const storageAdapter = new SupabaseStorageAdapter('global');