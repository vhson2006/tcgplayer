import { SpecialCharacters, SpecialCharactersEssentials } from '@ckeditor/ckeditor5-special-characters';

function SpecialCharactersEmoji( editor: any ) {
  editor.plugins.get( 'SpecialCharacters' ).addItems( 'Emoji', [
      { title: 'smiley face', character: '😊' },
      { title: 'rocket', character: '🚀' },
      { title: 'wind blowing face', character: '🌬️' },
      { title: 'floppy disk', character: '💾' },
      { title: 'heart', character: '❤️' }
  ], { label: 'Emoticons' } );
}

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      SpecialCharacters, SpecialCharactersEssentials, SpecialCharactersEmoji
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'specialCharacters', 
      ]
    }
  }
}

export default tranform