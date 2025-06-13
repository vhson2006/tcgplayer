import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      BlockQuote
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'blockQuote',
      ]
    },
  }
}

export default tranform