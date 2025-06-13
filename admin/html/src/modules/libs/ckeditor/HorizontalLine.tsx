import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      HorizontalLine
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'horizontalLine',
      ]
    }
  }
}

export default tranform