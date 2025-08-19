import { S3Client } from '@aws-sdk/client-s3';

export const s3Config = {
  endpoint: 's3.de.tebi.io',
  region: 'us-east-1',
  accessKeyId: 'fiaeCPxljXoyZiga',
  secretAccessKey: 'iaI2q5eoaR87QEAIXhTVQlXsLE8UF88qcsuRbBvS',
  bucketName: 'gaia'
};

export const s3Client = new S3Client({
  endpoint: `https://${s3Config.endpoint}`,
  region: s3Config.region,
  credentials: {
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey
  },
  forcePathStyle: true
});