import { Heading } from '@ckeditor/ckeditor5-heading';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      Heading
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'heading',
      ]
    }
  }
}

export default tranform