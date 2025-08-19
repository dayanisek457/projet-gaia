import AWS from 'aws-sdk';

export const s3Config = {
  endpoint: 's3.de.tebi.io',
  region: 'us-east-1',
  accessKeyId: 'fiaeCPxljXoyZiga',
  secretAccessKey: 'iaI2q5eoaR87QEAIXhTVQlXsLE8UF88qcsuRbBvS',
  bucketName: 'gaia'
};

export const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint(s3Config.endpoint),
  region: s3Config.region,
  accessKeyId: s3Config.accessKeyId,
  secretAccessKey: s3Config.secretAccessKey,
  s3ForcePathStyle: true
});