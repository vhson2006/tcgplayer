import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      FindAndReplace
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'findAndReplace',
      ]
    }
  }
}

export default tranform