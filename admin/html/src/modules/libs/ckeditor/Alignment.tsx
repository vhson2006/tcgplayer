import { Alignment } from '@ckeditor/ckeditor5-alignment';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      Alignment
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'alignment',
      ]
    }
  }
}

export default tranform