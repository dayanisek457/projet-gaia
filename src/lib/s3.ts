import { S3Client } from '@aws-sdk/client-s3'

const s3Config = {
  endpoint: 'https://s3.de.tebi.io',
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'fiaeCPxljXoyZiga',
    secretAccessKey: 'iaI2q5eoaR87QEAIXhTVQlXsLE8UF88qcsuRbBvS',
  },
  forcePathStyle: true,
}

export const s3Client = new S3Client(s3Config)
export const BUCKET_NAME = 'gaia'