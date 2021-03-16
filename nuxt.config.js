const { meets } = require('./events')

const title = 'We Are DODO! 🚀🚀'
const description = 'Do what you want to Do! 두두는 미루고 미루던 개인 프로젝트를 끝내기 위한 12시간 해커톤입니다. 두두는 디자이너와 개발자가 해야지 해야지 하다가 시작도 못한 개인 프로젝트를 끝내기 위해 밤을 샜던 3월의 어느 날 시작되었습니다. 개인 블로그, 사이드 프로젝트, 외주 작업, 스터디 등 바쁜 일상에 치여 미루던 일들 누구나 하나쯤은 있잖아요? 구체적이고 완벽한 결과물, 끝내야겠다는 강력한 의지는 필요없습니다. 한 달에 열두시간, 미루던 일 하나 끝내는 해커톤 두두와 함께해요-!'
const link = 'https://alwaysdodo.com'

module.exports = {
  head: {
    title,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: description },
      { name: "msapplication-TileColor", content: "#7457eb" },
      { name: "theme-color", content: "#ffffff" },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'ko_KR' },
      { property: 'og:site_name', content: '두두' },
      { property: 'og:url', content: link },
      { property: 'og:image', content: '' }
    ],
    link: [
      { rel: "apple-touch-icon", sizes: "120x120", href: "/apple-touch-icon.png" },
      { rel: "icon", type: "image/gif", sizes: "32x32", href: "/favicon.gif" },
      { rel: "icon", type: "image/gif", sizes: "16x16", href: "/favicon.gif" },
      { rel: 'shortcut icon', href: 'https://alwaysdodo.com/favicon.ico' },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
      { rel: "stylesheet", type: "text/css", href: "//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css" },
    ],
  },
  css: [
    "~/assets/fonts/campton/campton.css",
    "~/assets/scss/home.scss",
  ],
  loading: { color: "#3B8070" },
  modules: [
    '@nuxtjs/feed',
  ],
  feed: [
    // A default feed configuration object
    {
      path: '/feed.xml', // The route to your feed.
      create(feed) {
        feed.options = {
          title,
          description,
          link,
        }
        meets.forEach(meet => {
          feed.addItem({
            title: meet.title,
            description: `<img src="${meet.image}" />`,
          })
        })
      }, // The create function (see below)
      cacheTime: 1000 * 60 * 15, // How long should the feed be cached
      type: 'rss2', // Can be: rss2, atom1, json1
      data: ['Some additional data'] // Will be passed as 2nd argument to `create` function
    }
  ],
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    },
  },
}
