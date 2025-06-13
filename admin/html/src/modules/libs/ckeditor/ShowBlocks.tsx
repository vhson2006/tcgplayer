import { ShowBlocks } from '@ckeditor/ckeditor5-show-blocks';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      ShowBlocks
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'showBlocks',
      ]
    },
  }
}

export default tranform