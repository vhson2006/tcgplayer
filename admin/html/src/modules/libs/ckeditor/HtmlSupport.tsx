import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support';

const tranform = (config: any) => {

  return {
    ...config,
    plugins:[
      ...config.plugins,
      GeneralHtmlSupport
    ],
    htmlSupport: {
      allow: [
        {
          name: /.*/,
          attributes: true,
          classes: true,
          styles: true
        }
      ]
    },
  }
}

export default tranform