import { S3Client } from '@aws-sdk/client-s3';

export const s3Config = {
  endpoint: 'mvtlxvxywbdjkzcouyrn.storage.supabase.co/storage/v1/s3',
  region: 'eu-west-3',
  accessKeyId: 'a87613fccd8ea6a418ecd766c5f682e5',
  secretAccessKey: '844e8fd8463e1f7e93bd4f095268911335e283e8c4db44212c8f2045af16388e',
  bucketName: 'global'
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