import { Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, ImageInsert } from '@ckeditor/ckeditor5-image';
import { LinkImage } from '@ckeditor/ckeditor5-link';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      Image, 
      ImageToolbar, 
      ImageCaption, ImageStyle, ImageResize, 
      ImageInsert,
      LinkImage
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'insertImage', 
      ]
    },
    
    image: {
      toolbar: [
          'imageStyle:block',
          'imageStyle:side',
          '|',
          'toggleImageCaption',
          'imageTextAlternative',
          '|',
          'linkImage'
      ],
      // insert: {
      //     // If this setting is omitted, the editor defaults to 'block'.
      //     // See explanation below.
      //     type: 'auto'
      // }
    }
  }
}

export default tranform