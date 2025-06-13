import { Style } from '@ckeditor/ckeditor5-style';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      Style
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'style',
      ]
    },
    style: {
      definitions: [
        {
          name: 'Article category',
          element: 'h3',
          classes: [ 'category' ]
      },
      {
          name: 'Info box',
          element: 'p',
          classes: [ 'info-box' ]
      },
      ]
    },
  }
}

export default tranform