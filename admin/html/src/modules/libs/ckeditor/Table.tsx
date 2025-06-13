import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      Table, TableToolbar
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'insertTable'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells'
      ]
  },
  }
}

export default tranform