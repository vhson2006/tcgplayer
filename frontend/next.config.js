const nextTranslate = require('next-translate-plugin')

module.exports = {
  ...nextTranslate({
    webpack: (config, { isServer, webpack }) => {
      return config;
    }
  }),
  env: {
    api: process.env.NEXT_PUBLIC_API_URL,
    web: process.env.NEXT_PUBLIC_WEB,
    google: process.env.GOOGLE_MAP,
    ga: process.env.GOOGLE_ANALYTICS
  }
}
