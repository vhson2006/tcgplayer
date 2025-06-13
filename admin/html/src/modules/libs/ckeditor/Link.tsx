import { Link, AutoLink } from '@ckeditor/ckeditor5-link';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      Link, AutoLink
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'link',
      ]
    },
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
              download: 'file'
          }
        }
      }
    },
  }
}

export default tranform