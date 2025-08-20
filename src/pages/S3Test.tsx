import SupabaseStorageDashboard from '@/components/SupabaseStorageDashboard';

const S3Test = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Test Supabase Storage</h1>
          <p className="text-muted-foreground">
            Test page for file upload functionality with Supabase Storage
          </p>
        </div>
        <SupabaseStorageDashboard />
      </div>
    </div>
  );
};

export default S3Test;