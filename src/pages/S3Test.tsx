import S3Dashboard from '@/components/S3Dashboard';

const S3Test = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Test S3 Direct</h1>
          <p className="text-muted-foreground">
            Test page for direct S3 file upload functionality
          </p>
        </div>
        <S3Dashboard />
      </div>
    </div>
  );
};

export default S3Test;