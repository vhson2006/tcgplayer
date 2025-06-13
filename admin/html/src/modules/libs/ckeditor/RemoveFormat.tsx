import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      RemoveFormat
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'removeFormat',
      ]
    }
  }
}

export default tranform