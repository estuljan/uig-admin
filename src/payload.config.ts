// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, type CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const Words: CollectionConfig = {
  slug: 'words',
  admin: {
    useAsTitle: 'word_uyghur',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'word_uyghur',
      type: 'text',
      required: true,
      label: 'Uyghur Word',
    },
    {
      name: 'word_english',
      type: 'text',
      required: true,
      label: 'English Translation',
    },
    {
      name: 'word_turkish',
      type: 'text',
      label: 'Turkish Translation',
    },
  ],
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Words, Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
