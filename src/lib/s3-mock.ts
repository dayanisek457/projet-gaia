// Mock S3 manager for demonstration purposes
// This simulates the S3 functionality when network restrictions prevent real API calls

export interface S3File {
  key: string;
  size: number;
  lastModified: Date;
  url?: string;
}

export class MockS3Manager {
  private mockFiles: S3File[] = [
    {
      key: 'gaia-prototype-design.pdf',
      size: 2547623,
      lastModified: new Date('2025-01-20T10:30:00Z'),
    },
    {
      key: 'drone-specifications.docx', 
      size: 456789,
      lastModified: new Date('2025-01-19T15:45:00Z'),
    },
    {
      key: 'aerodynamic-tests.png',
      size: 1234567,
      lastModified: new Date('2025-01-18T09:20:00Z'),
    },
    {
      key: 'seedball-system.jpg',
      size: 987654,
      lastModified: new Date('2025-01-17T14:10:00Z'),
    }
  ];

  async listFiles(): Promise<S3File[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.mockFiles];
  }

  async uploadFile(file: File): Promise<void> {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newFile: S3File = {
      key: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${file.name}`,
      size: file.size,
      lastModified: new Date(),
    };
    
    this.mockFiles.unshift(newFile); // Add to beginning of array
  }

  async deleteFile(key: string): Promise<void> {
    // Simulate delete delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.mockFiles.findIndex(f => f.key === key);
    if (index > -1) {
      this.mockFiles.splice(index, 1);
    }
  }

  async getFileUrl(key: string): Promise<string> {
    // Simulate URL generation
    await new Promise(resolve => setTimeout(resolve, 200));
    return `https://mvtlxvxywbdjkzcouyrn.storage.supabase.co/storage/v1/object/sign/global/${key}?token=mock-token`;
  }

  async replaceFile(oldKey: string, newFile: File): Promise<void> {
    // Simulate replace delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const index = this.mockFiles.findIndex(f => f.key === oldKey);
    if (index > -1) {
      this.mockFiles[index] = {
        key: oldKey,
        size: newFile.size,
        lastModified: new Date(),
      };
    }
  }
}

// Export singleton instance for mock
export const mockS3Manager = new MockS3Manager();