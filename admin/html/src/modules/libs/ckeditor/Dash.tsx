const tranform = (config: any) => {
  const { toolbar } = config;

  return {
    ...config,
    
    toolbar: {
      ...config.toolbar,
      items: [
        ...toolbar.items,
        '|',
      ]
    },
  }
}

export default tranform