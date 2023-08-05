import { S3UploadCollectionConfig } from 'payload-s3-upload';

const Media: S3UploadCollectionConfig = {
  slug: 'media',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  upload: {
    staticURL: '/assets',
    staticDir: 'assets',
    disableLocalStorage: true,
    s3: {
      bucket: 'rage-payload-cms',
      prefix: 'images/', // files will be stored in bucket folder images/xyz
    },
    adminThumbnail: ({ doc }) =>
      `https://rage-payload-cms.s3.us-east-1.amazonaws.com/images/${doc.filename}`,
  },
  // create a field to access uploaded files in s3 from payload api
  fields: [
    {
      name: 'url',
      type: 'text',
      access: {
        create: () => true,
      },
      admin: {
        disabled: true,
      },
      hooks: {
        afterRead: [
          ({ data: doc }) =>
            `https://rage-payload-cms.s3.us-east-1.amazonaws.com/images/${doc.filename}`,
        ],
      },
    },
    {
        name: 'alt',
        label: 'Alt Text',
        type: 'text',
      },
  ],
};

export default Media;