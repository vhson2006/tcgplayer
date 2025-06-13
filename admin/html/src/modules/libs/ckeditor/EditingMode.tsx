import { StandardEditingMode, RestrictedEditingMode } from '@ckeditor/ckeditor5-restricted-editing';

const tranform = (config: any, mode = true) => {
  const { toolbar } = config;

  return {
    ...config,
    plugins:[
      ...config.plugins,
      mode ? RestrictedEditingMode : StandardEditingMode,
    ],
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        mode ? 'restrictedEditingException' : 'restrictedEditing'
      ]
    }
  }
}

export default tranform