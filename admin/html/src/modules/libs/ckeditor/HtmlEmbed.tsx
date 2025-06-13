import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      HtmlEmbed
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'htmlEmbed',
      ]
    },
    htmlEmbed: {
      showPreviews: true
    },
  }
}

export default tranform