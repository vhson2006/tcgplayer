import generateSitemap from 'sitemap-ts'

const supportLanguages = {
  "vi": 'vi',
  "en": 'en',
}

const route = [
  '/',
  '/authentication',
  '/authentication/register',
  // '/dashboard',
  // '/dashboard/notification',
  // '/dashboard/organisation',
  // '/dashboard/organisation/role',
  // '/dashboard/announce',
  // '/dashboard/announce/generate',
  // '/dashboard/business',
  // '/dashboard/business/order',
  // '/dashboard/customer',
  // '/dashboard/customer/voucher',
  // '/dashboard/setting',
  // '/dashboard/setting/category',
  // '/dashboard/setting/email',
  // '/dashboard/setting/media',
  // '/dashboard/setting/comment',
  // '/dashboard/setting/access-code',
  // '/dashboard/account',
]

const dynamicRoutes = [
  ...Object.keys(supportLanguages).reduce((list, current) => {
    return [
      ...list,
      ...route.map(r => `/${current}${r}`)
    ]
  }, route),
]

generateSitemap({
  hostname: 'https://admin.shanovina.com',
  dynamicRoutes: dynamicRoutes,
  generateRobotsTxt: false,
  outDir: 'build'
})