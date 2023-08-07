import { buildConfig } from 'payload/config';
import path from 'path';
// import Examples from './collections/Examples';
import Users from './collections/Users';
import FormBuilder from '@payloadcms/plugin-form-builder';
import { S3Client } from '@aws-sdk/client-s3';
import s3Upload from 'payload-s3-upload'
import Media from './collections/Upload';


export default buildConfig({
  // serverURL: 'http://localhost:3000',
  serverURL: 'https://rage-payload-cms.vercel.app',
  admin: {
    user: Users.slug,
  },
  
  collections: [
    Users,
    Media
    
    // Add Collections here
    // Examples,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    FormBuilder({
      fields: {
        payment: false,
      },
    }),
    s3Upload(new S3Client({
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      },
      
    })),
  ],
})
