import { 
  S3Client, 
  ListObjectsV2Command, 
  PutObjectCommand, 
  DeleteObjectCommand, 
  GetObjectCommand,
  HeadBucketCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// S3 configuration as per Supabase documentation
export const s3Config = {
  endpoint: 'https://mvtlxvxywbdjkzcouyrn.storage.supabase.co/storage/v1/s3',
  region: 'eu-west-3',
  accessKeyId: '2ed84c6059ce258fb86db0af4f01c7a8',
  secretAccessKey: '717335f769f526d68e4f4de5c4fabd551e9344b2df13125c4fa6602c56995f18',
  bucketName: 'global'
};

// Create S3 client with proper configuration
export const s3Client = new S3Client({
  endpoint: s3Config.endpoint,
  region: s3Config.region,
  credentials: {
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey
  },
  forcePathStyle: true
});

export interface S3File {
  key: string;
  size: number;
  lastModified: Date;
  url?: string;
}

export class S3Manager {
  private bucketName = s3Config.bucketName;

  /**
   * Check if the S3 bucket is accessible
   */
  async checkBucketHealth(): Promise<{ healthy: boolean; error?: string }> {
    try {
      console.log(`Checking health of bucket: ${this.bucketName}`);
      
      const command = new HeadBucketCommand({
        Bucket: this.bucketName
      });
      
      await s3Client.send(command);
      console.log(`Bucket '${this.bucketName}' is healthy and accessible`);
      return { healthy: true };
    } catch (error) {
      console.error('Bucket health check failed:', error);
      return { 
        healthy: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * List all files in the bucket
   */
  async listFiles(): Promise<S3File[]> {
    try {
      console.log(`Listing files from bucket: ${this.bucketName}`);
      
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName
      });
      
      const response = await s3Client.send(command);
      
      const files: S3File[] = (response.Contents || []).map(obj => ({
        key: obj.Key || '',
        size: obj.Size || 0,
        lastModified: obj.LastModified || new Date()
      }));
      
      // Sort by last modified date (newest first)
      files.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
      
      console.log(`Successfully retrieved ${files.length} files`);
      return files;
    } catch (error) {
      console.error('Error listing files:', error);
      throw new Error(`Failed to list files: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Upload a file to the bucket
   */
  async uploadFile(file: File, customFileName?: string): Promise<string> {
    try {
      const fileName = customFileName || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${file.name}`;
      console.log(`Uploading file: ${fileName} to bucket: ${this.bucketName}`);
      console.log(`File type: ${file.type || 'application/octet-stream'}, Size: ${file.size} bytes`);
      
      // Convert File to Buffer for S3
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: file.type || 'application/octet-stream',
        ContentLength: file.size
      });
      
      await s3Client.send(command);
      
      console.log(`Successfully uploaded file: ${fileName}`);
      return fileName;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Delete a file from the bucket
   */
  async deleteFile(key: string): Promise<void> {
    try {
      console.log(`Deleting file: ${key} from bucket: ${this.bucketName}`);
      
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key
      });
      
      await s3Client.send(command);
      
      console.log(`Successfully deleted file: ${key}`);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error(`Failed to delete file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get a presigned URL for downloading a file
   */
  async getFileUrl(key: string): Promise<string> {
    try {
      console.log(`Generating presigned URL for file: ${key}`);
      
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key
      });
      
      // Generate presigned URL valid for 1 hour
      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      
      console.log(`Successfully generated URL for file: ${key}`);
      return url;
    } catch (error) {
      console.error('Error generating file URL:', error);
      throw new Error(`Failed to generate file URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Replace an existing file with a new one
   */
  async replaceFile(oldKey: string, newFile: File): Promise<void> {
    try {
      console.log(`Replacing file: ${oldKey} with new file in bucket: ${this.bucketName}`);
      console.log(`New file type: ${newFile.type || 'application/octet-stream'}, Size: ${newFile.size} bytes`);
      
      // Convert File to Buffer for S3
      const arrayBuffer = await newFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Upload with the same key (this replaces the existing file)
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: oldKey,
        Body: buffer,
        ContentType: newFile.type || 'application/octet-stream',
        ContentLength: newFile.size
      });
      
      await s3Client.send(command);
      
      console.log(`Successfully replaced file: ${oldKey}`);
    } catch (error) {
      console.error('Error replacing file:', error);
      throw new Error(`Failed to replace file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export singleton instance
export const s3Manager = new S3Manager();