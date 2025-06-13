import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Context } from '@ckeditor/ckeditor5-core';
import { pipe } from 'utils/array';
import transformCommon from './Common';
import transformWordCount from './WordCount';
import transformHtmlSupport from './HtmlSupport';
import transformDash from './Dash';
import transformEssentials from './Essentials';
import tranformHeading from './Heading';
import tranformFont from './Font';
import tranformBasicStyle from './BasicStyle';
import tranformList from './List';
import tranformIndent from './Indent';
import tranformAlignment from './Alignment';
import tranformLink from './Link';
import tranformImage from './Image';
import tranformTable from './Table';
import transformMedia from './Media';
import transformBlogQuote from './BlogQuote';
import transformHtmlEmbed from './HtmlEmbed';
import transformSourceEditing from './SourceEditing';
import transformSpecialCharacters from './SpecialCharacters';
import transformCodeBlock from './CodeBlock';
import transformStyle from './Style';
import transformRemoveFormat from './RemoveFormat';
import transformSelectAll from './SelectAll';
import transformFindAndReplace from './FindAndReplace';
import transformHorizontalLine from './HorizontalLine';
import transformShowBlocks from './ShowBlocks';
import './style.css';

const CKEditorComponent = (props: any) => {
  const { referent, data } = props;
  const configDefault = {
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'en',
    plugins: [],
    toolbar: {
      items: [],
      shouldNotGroupWhenFull: true
    },
  }

  return (
    <div style={{width: '100%'}}>
      <CKEditorContext context={ Context }>
        {/* <h2>Using the CKEditor&nbsp;5 context feature in React</h2> */}
        <CKEditor
          ref={referent}
          editor={ ClassicEditor }
          config={
            pipe(
              transformCommon,
              transformHtmlSupport,
              transformWordCount,
              tranformHeading,
              tranformFont,
              tranformBasicStyle,
              transformSpecialCharacters,
              transformDash, /** '|' characters */ 
              tranformList,
              // tranformIndent,
              tranformAlignment,
              tranformLink,
              tranformImage,
              // tranformTable,
              // transformMedia,
              // transformBlogQuote,
              // transformCodeBlock,            
              transformDash, /** '|' characters */ 
              transformShowBlocks,
              transformSelectAll,
              transformRemoveFormat,
              transformFindAndReplace,
              transformEssentials,
              // transformStyle,
              transformHorizontalLine,
              // transformHtmlEmbed,
              transformSourceEditing,
            )(configDefault)
          }
          data={data}
          onReady={
            editor => {
              // You can store the "editor" and use when it is needed.
              // console.log( 'Editor1 is ready to use!', editor.getData() );
            } 
          }
        />
      </CKEditorContext>
    </div>
  )
}

export default CKEditorComponent;
