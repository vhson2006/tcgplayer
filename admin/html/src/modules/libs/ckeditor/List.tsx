import { List } from '@ckeditor/ckeditor5-list';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      List
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'bulletedList', 'numberedList'
      ]
    }
  }
}

export default tranform