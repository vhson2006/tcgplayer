import { SelectAll } from '@ckeditor/ckeditor5-select-all';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      SelectAll
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'selectAll',
      ]
    }
  }
}

export default tranform