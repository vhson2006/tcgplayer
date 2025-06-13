import { Essentials } from '@ckeditor/ckeditor5-essentials';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      Essentials
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'undo', 'redo',
      ]
    }
  }
}

export default tranform