import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
// import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';

const tranform = (config: any) => {

  return {
    ...config,
    plugins:[
      ...config.plugins,
      Paragraph, /**render <p> tag */
      Autoformat, /** for input typing auto markdown */
      // CloudServices, /** for licnese pro */
      PasteFromOffice, /**transform word format  */
      TextTransformation /** auto transform some text to nice  */
    ],
  }
}

export default tranform