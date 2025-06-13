import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      MediaEmbed
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'mediaEmbed', 
      ]
    },
  }
}

export default tranform