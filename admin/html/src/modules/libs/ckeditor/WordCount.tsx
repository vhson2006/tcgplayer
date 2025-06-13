import { WordCount } from '@ckeditor/ckeditor5-word-count';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      WordCount
    ],
    wordCount: {
      onUpdate: (stats: any) => {
        // Prints the current content statistics.
        // console.log( `Characters: ${ stats.characters }\nWords: ${ stats.words }` );
      }
    },
  }
}

export default tranform