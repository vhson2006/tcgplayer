import { supportLanguages, supportKeyRoute, common } from "commons/config";

export const getHelmetInformation = (endpoint: string) => {
  const path = endpoint.split('/').filter(e => e);
  if (Array.isArray(path) && path.length > 0 && Object.keys(supportLanguages).includes(path[0])) {
    path.shift();
  }

  let data = {
    title: 'meta.title',
    description: 'meta.description',
    socialImage: '/logo192.png',
  }
  switch (`/${path.filter(e => supportKeyRoute.includes(e)).join('/')}`) {
    case '/':
      data = {
        title: 'meta.title',
        description: 'meta.description',
        socialImage: '/logo192.png',
      }
      break;
    case '/authentication':
      data = {
        title: 'meta.title.authentication',
        description: 'meta.description.authentication',
        socialImage: '/logo192.png',
      }
      break;
    case '/authentication/register':
      data = {
        title: 'meta.title.authentication.register',
        description: 'meta.description.authentication.register',
        socialImage: '/logo192.png',
      }
      break;
    case '/dashboard':
      data = {
        title: 'meta.title.dashboard',
        description: 'meta.description.dashboard',
        socialImage: '/logo192.png',
      }
      break;
    case '/dashboard/notification':
      data = {
        title: 'meta.title.dashboard.notification',
        description: 'meta.description.dashboard.notification',
        socialImage: '/logo192.png',
      }
      break;
    case '/dashboard/organisation':
      data = {
        title: 'meta.title.dashboard.organisation',
        description: 'meta.description.dashboard.organisation',
        socialImage: '/logo192.png',
      }
      break;
    case '/dashboard/organisation/role':
      data = {
        title: 'meta.title.dashboard.organisation.role',
        description: 'meta.description.dashboard.organisation.role',
        socialImage: '/logo192.png',
      }
      break;
    case '/dashboard/announce':
      data = {
        title: 'meta.title.dashboard.announce',
        description: 'meta.description.dashboard.announce',
        socialImage: '/logo192.png',
      }
      break;
    case '/dashboard/announce/generate':
      data = {
        title: 'meta.title.dashboard.announce.generate',
        description: 'meta.description.dashboard.announce.generate',
        socialImage: '/logo192.png',
      }
      break;
    case '/dashboard/business':
      data = {
        title: 'meta.title.dashboard.business',
        description: 'meta.description.dashboard.business',
        socialImage: '/logo192.png',
      }
      break;
    case '/dashboard/business/order':
      data = {
        title: 'meta.title.dashboard.business.order',
        description: 'meta.description.dashboard.business.order',
        socialImage: '/logo192.png',
      }
      break;
    case '/dashboard/customer':
      data = {
        title: 'meta.title.dashboard.customer',
        description: 'meta.description.dashboard.customer',
        socialImage: '/logo192.png',
      }
      break;
    case '/dashboard/customer/voucher':
      data = {
        title: 'meta.title.dashboard.customer.voucher',
        description: 'meta.description.dashboard.customer.voucher',
        socialImage: '/logo192.png',
      }
      break;
    case '/dashboard/setting':
      data = {
        title: 'meta.title.dashboard.setting',
        description: 'meta.description.dashboard.setting',
        socialImage: '/logo192.png',
      }
      break;
    case '/dashboard/setting/category':
      data = {
        title: 'meta.title.dashboard.setting.category',
        description: 'meta.description.dashboard.setting.category',
        socialImage: '/logo192.png',
      }
      break;
    case '/dashboard/setting/email':
      data = {
        title: 'meta.title.dashboard.setting.email',
        description: 'meta.description.dashboard.setting.email',
        socialImage: '/logo192.png',
      }
      break;
    case '/dashboard/setting/media':
      data = {
        title: 'meta.title.dashboard.setting.media',
        description: 'meta.description.dashboard.setting.media',
        socialImage: '/logo192.png',
      }
      break;
    case '/dashboard/setting/comment':
      data = {
        title: 'meta.title.dashboard.setting.comment',
        description: 'meta.description.dashboard.setting.comment',
        socialImage: '/logo192.png',
      }
      break;
    case '/dashboard/setting/access-code':
      data = {
        title: 'meta.title.dashboard.setting.access-code',
        description: 'meta.description.dashboard.setting.access-code',
        socialImage: '/logo192.png',
      }
      break;
    case '/dashboard/account':
      data = {
        title: 'meta.title.dashboard.account',
        description: 'meta.description.dashboard.account',
        socialImage: '/logo192.png',
      }
      break;
    default: 
      break;
  }
  return {
    status: common.CORRECT,
    data
  }
}