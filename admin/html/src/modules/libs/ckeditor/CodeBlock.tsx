import { CodeBlock } from '@ckeditor/ckeditor5-code-block';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      CodeBlock
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'codeBlock',
      ]
    },
    codeBlock: {
      languages: [
          // Do not render the CSS class for the plain text code blocks.
          { language: 'plaintext', label: 'Plain text', class: '' },

          // Use the "php-code" class for PHP code blocks.
          { language: 'php', label: 'PHP', class: 'php-code' },

          // Use the "js" class for JavaScript code blocks.
          // Note that only the first ("js") class will determine the language of the block when loading data.
          { language: 'javascript', label: 'JavaScript', class: 'js javascript js-code' },

          // Python code blocks will have the default "language-python" CSS class.
          { language: 'python', label: 'Python' }
      ]
    },
  }
}

export default tranform