import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from '@ckeditor/ckeditor5-basic-styles';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      Code, Bold, Italic, Underline, Strikethrough, Subscript, Superscript,
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'bold', 'italic', 'underline', 'strikethrough', /*'code'*/, 'subscript', 'superscript', 
      ]
    }
  }
}

export default tranform