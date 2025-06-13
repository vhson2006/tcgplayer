import { Font, FontColor, FontBackgroundColor } from '@ckeditor/ckeditor5-font';

const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      Font, FontColor, FontBackgroundColor,
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        'fontColor', 'fontBackgroundColor', '|',
      ]
    },
    fontColor: {
      colors: [
          {
              color: 'hsl(0, 0%, 0%)',
              label: 'Black'
          },
          {
              color: 'hsl(0, 0%, 30%)',
              label: 'Dim grey'
          },
          {
              color: 'hsl(0, 0%, 60%)',
              label: 'Grey'
          },
          {
              color: 'hsl(0, 0%, 90%)',
              label: 'Light grey'
          },
          {
              color: 'hsl(0, 0%, 100%)',
              label: 'White',
              hasBorder: true
          },
      ]
    },
    fontBackgroundColor: {
      colors: [
          {
              color: 'hsl(0, 75%, 60%)',
              label: 'Red'
          },
          {
              color: 'hsl(30, 75%, 60%)',
              label: 'Orange'
          },
          {
              color: 'hsl(60, 75%, 60%)',
              label: 'Yellow'
          },
          {
              color: 'hsl(90, 75%, 60%)',
              label: 'Light green'
          },
          {
              color: 'hsl(120, 75%, 60%)',
              label: 'Green'
          },
      ]
    },
  }
}

export default tranform