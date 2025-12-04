// Direct Supabase Storage access without authentication
// Using the correct Supabase Storage API instead of S3 API
import { createClient } from '@supabase/supabase-js';

// Supabase configuration from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://mvtlxvxywbdjkzcouyrn.storage.supabase.co/storage/v1/s3';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12dGx4dnh5d2Jkamt6Y291eXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MjA0MTUsImV4cCI6MjA3MTE5NjQxNX0.wlMC3yJCrCLOqPyCV71A5BzwcXoJcC84ygJKTGbEdao';

// Create Supabase client with explicit auth configuration
// This ensures proper session persistence and token refresh across tab switches
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // Use localStorage for session storage to persist across tabs and browser closes
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

export interface S3File {
  key: string;
  size: number;
  lastModified: Date;
  url?: string;
}

export class S3Manager {
  private bucketName = 'global';
  private serviceAvailable: boolean | null = null;

  // Check if Supabase service is available and get bucket info
  private async checkServiceAvailability(): Promise<boolean> {
    if (this.serviceAvailable !== null) {
      return this.serviceAvailable;
    }

    try {
      // Get list of buckets to check service availability
      const { data: buckets, error } = await supabase.storage.listBuckets();
      this.serviceAvailable = error === null;
      
      if (!this.serviceAvailable) {
        console.warn('Supabase Storage service is not available:', error?.message);
      } else {
        // Log bucket information for debugging
        console.log('Available buckets:', buckets?.map(b => ({
          name: b.name,
          id: b.id,
          public: b.public,
          created_at: b.created_at
        })));
        
        // Check if our target bucket exists and is public
        const targetBucket = buckets?.find(b => b.name === this.bucketName);
        if (targetBucket) {
          console.log(`Target bucket '${this.bucketName}' info:`, {
            id: targetBucket.id,
            public: targetBucket.public,
            created_at: targetBucket.created_at
          });
        } else {
          console.warn(`Target bucket '${this.bucketName}' not found in bucket list`);
        }
      }
      
      return this.serviceAvailable;
    } catch (error) {
      console.warn('Supabase Storage service check failed:', error);
      this.serviceAvailable = false;
      return false;
    }
  }

  // Health check method to verify bucket accessibility
  async checkBucketHealth(): Promise<{ healthy: boolean; error?: string; serviceOffline?: boolean }> {
    try {
      console.log(`Checking health of bucket: ${this.bucketName}`);
      
      // First check if service is available
      const serviceAvailable = await this.checkServiceAvailability();
      if (!serviceAvailable) {
        return { 
          healthy: false, 
          serviceOffline: true,
          error: 'Supabase Storage service is currently unavailable. Please try again later or use demo mode.' 
        };
      }
      
      // Try to list files to check if bucket exists and is accessible
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .list('', { limit: 10 });

      if (error) {
        console.error('Bucket health check failed:', error);
        return { 
          healthy: false, 
          error: `Bucket '${this.bucketName}' is not accessible: ${error.message}` 
        };
      }

      // Log detailed information about what the API returned
      console.log(`Bucket '${this.bucketName}' health check - raw response:`, {
        itemCount: data?.length || 0,
        items: data?.map(item => ({
          name: item.name,
          id: item.id,
          created_at: item.created_at,
          metadata: item.metadata
        }))
      });

      console.log(`Bucket '${this.bucketName}' is healthy and accessible`);
      return { healthy: true };
    } catch (error) {
      console.error('Unexpected error during bucket health check:', error);
      return { 
        healthy: false, 
        serviceOffline: true,
        error: `Unexpected error checking bucket health: ${String(error)}` 
      };
    }
  }

  // Maximum depth for recursive folder traversal to prevent stack overflow
  private static readonly MAX_RECURSION_DEPTH = 10;

  // Recursively list all files from a path, including files in subfolders
  // In Supabase Storage, the list() method returns FileObject items.
  // Files have an 'id' property (UUID string), while folders have id = null.
  private async listFilesRecursively(path: string = '', currentDepth: number = 0): Promise<S3File[]> {
    // Prevent excessive recursion in deeply nested folder structures
    if (currentDepth >= S3Manager.MAX_RECURSION_DEPTH) {
      console.warn(`Maximum recursion depth (${S3Manager.MAX_RECURSION_DEPTH}) reached at path: ${path}`);
      return [];
    }

    console.log(`Listing files at path: '${path}' (depth: ${currentDepth})`);
    
    const { data, error } = await supabase.storage
      .from(this.bucketName)
      .list(path, {
        limit: 1000,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) {
      console.error(`Supabase storage error at path '${path}':`, error);
      throw new Error(`Failed to list files: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.log(`No items found at path: '${path}'`);
      return [];
    }

    console.log(`Found ${data.length} items at path '${path}':`, data.map(item => ({
      name: item.name,
      id: item.id,
      metadata: item.metadata
    })));

    const files: S3File[] = [];
    
    for (const item of data) {
      // Skip placeholder files that Supabase creates for empty folders
      if (item.name === '.emptyFolderPlaceholder') {
        console.log(`Skipping placeholder file: ${item.name}`);
        continue;
      }
      
      // Build the full path for this item
      const fullPath = path ? `${path}/${item.name}` : item.name;
      
      // In Supabase Storage API:
      // - Files have an 'id' property that is a non-null UUID string
      // - Folders have id = null
      // We check if id is a truthy string value (not null, undefined, or empty)
      const isFile = typeof item.id === 'string' && item.id.length > 0;
      
      console.log(`Item '${item.name}': id='${item.id}', isFile=${isFile}`);
      
      if (isFile) {
        // This is a file - add it to the list
        files.push({
          key: fullPath,
          size: item.metadata?.size || 0,
          lastModified: new Date(item.created_at || item.updated_at || Date.now()),
        });
        console.log(`Added file: ${fullPath}`);
      } else {
        // This is a folder - recursively list its contents
        console.log(`Found folder: ${fullPath}, listing contents (depth: ${currentDepth + 1})...`);
        const subFiles = await this.listFilesRecursively(fullPath, currentDepth + 1);
        files.push(...subFiles);
      }
    }
    
    return files;
  }

  async listFiles(): Promise<S3File[]> {
    try {
      console.log(`Attempting to list files from bucket: ${this.bucketName}`);
      const files = await this.listFilesRecursively('');

      // Sort files by lastModified date (newest first)
      files.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
      
      console.log(`Successfully retrieved ${files.length} files`);
      return files;
    } catch (error) {
      console.error('Error listing files:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Unexpected error while listing files: ${String(error)}`);
    }
  }

  async uploadFile(file: File, customFileName?: string): Promise<string> {
    try {
      const fileName = customFileName || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${file.name}`;
      console.log(`Attempting to upload file: ${fileName} to bucket: ${this.bucketName}`);
      console.log(`File type: ${file.type || 'application/octet-stream'}, Size: ${file.size} bytes`);
      
      const { error } = await supabase.storage
        .from(this.bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          // Explicitly set content type to support any file format
          // Use the file's native type or fall back to binary stream
          contentType: file.type || 'application/octet-stream'
        });

      if (error) {
        console.error('Supabase storage upload error:', error);
        throw new Error(`Failed to upload file: ${error.message}`);
      }
      
      console.log(`Successfully uploaded file: ${fileName}`);
      return fileName;
    } catch (error) {
      console.error('Error uploading file:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Unexpected error while uploading file: ${String(error)}`);
    }
  }

  async deleteFile(key: string): Promise<void> {
    try {
      console.log(`Attempting to delete file: ${key} from bucket: ${this.bucketName}`);
      const { error } = await supabase.storage
        .from(this.bucketName)
        .remove([key]);

      if (error) {
        console.error('Supabase storage delete error:', error);
        throw new Error(`Failed to delete file: ${error.message}`);
      }
      
      console.log(`Successfully deleted file: ${key}`);
    } catch (error) {
      console.error('Error deleting file:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Unexpected error while deleting file: ${String(error)}`);
    }
  }

  async getFileUrl(key: string): Promise<string> {
    try {
      console.log(`Attempting to generate URL for file: ${key} from bucket: ${this.bucketName}`);
      
      // Use signed URL for all cases to ensure proper access control
      // This works for both public and private buckets
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .createSignedUrl(key, 3600); // 1 hour

      if (error) {
        console.error('Supabase storage URL generation error:', error);
        // If signed URL fails, fall back to public URL (for public buckets)
        console.log('Falling back to public URL...');
        const { data: publicData } = supabase.storage
          .from(this.bucketName)
          .getPublicUrl(key);
        
        if (publicData?.publicUrl) {
          console.log(`Generated public URL for file: ${key}`);
          return publicData.publicUrl;
        }
        throw new Error(`Failed to generate file URL: ${error.message}`);
      }
      
      console.log(`Successfully generated signed URL for file: ${key}`);
      return data.signedUrl;
    } catch (error) {
      console.error('Error generating file URL:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Unexpected error while generating file URL: ${String(error)}`);
    }
  }

  async replaceFile(oldKey: string, newFile: File): Promise<void> {
    try {
      console.log(`Attempting to replace file: ${oldKey} with new file in bucket: ${this.bucketName}`);
      console.log(`New file type: ${newFile.type || 'application/octet-stream'}, Size: ${newFile.size} bytes`);
      
      // Upload new file with the same key (this replaces the existing file)
      const { error } = await supabase.storage
        .from(this.bucketName)
        .upload(oldKey, newFile, {
          cacheControl: '3600',
          upsert: true, // This allows replacing existing files
          // Explicitly set content type to support any file format
          contentType: newFile.type || 'application/octet-stream'
        });

      if (error) {
        console.error('Supabase storage replace error:', error);
        throw new Error(`Failed to replace file: ${error.message}`);
      }
      
      console.log(`Successfully replaced file: ${oldKey}`);
    } catch (error) {
      console.error('Error replacing file:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Unexpected error while replacing file: ${String(error)}`);
    }
  }
}

// Export singleton instance
export const s3Manager = new S3Manager();
