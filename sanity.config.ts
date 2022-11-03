import { createConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { markdownSchema } from 'sanity-plugin-markdown'

export default createConfig({
  name: 'default',
  title: 'Sanity demo',
  projectId: 'ireq7z47',
  dataset: 'production',
  plugins: [deskTool(), markdownSchema()],
  schema: {
    types: [
      {
        name: 'post',
        type: 'document',
        title: 'Post',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string'
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title'
            }
          },
          {
            name: 'content',
            title: 'Content',
            type: 'markdown'
          },
          {
            name: 'date',
            title: 'Date',
            type: 'datetime'
          },
          {
            name: 'img',
            title: 'Image',
            type: 'image'
          }
        ]
      }
    ]
  }
})
