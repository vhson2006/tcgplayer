import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      Indent,
      IndentBlock
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'outdent', 'indent',
      ]
    },
    indentBlock: {
      classes: [
          'custom-block-indent-a', // First step - smallest indentation.
          'custom-block-indent-b',
          'custom-block-indent-c'  // Last step - biggest indentation.
      ]
  }
  }
}

export default tranform