import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      SourceEditing
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'sourceEditing', 
      ]
    },
  }
}

export default tranform