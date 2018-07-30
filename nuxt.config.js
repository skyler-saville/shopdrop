module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Home | ShopDrop Delivery Service',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
      // { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css' }
    ],
    script: [
      // { href: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js' }
    ]
  },
  plugins: ['~plugins/vuetify.js'],
  /*
  ** Global CSS
  */
  css: [
    {
      src: '~assets/css/app.styl'
    },
    {
      src: '~/assets/css/main.css',
      lang: 'css',
      rel: 'stylesheet'
    }
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'vuetify'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  },
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ]
}
