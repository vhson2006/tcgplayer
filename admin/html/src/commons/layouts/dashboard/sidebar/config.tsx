import { 
  FiBarChart2, FiBookmark, FiCodesandbox, FiFilm, 
  FiFolder, FiSettings, FiTag, FiUsers, FiUser, FiLogOut
} from "react-icons/fi";
import { MdOutlineAddBusiness, MdOutlineAutoAwesome, MdOutlineLanguage } from "react-icons/md";
import { supportLanguages } from "commons/config";
import { RiCoupon3Line, RiInformationLine, RiProductHuntLine } from "react-icons/ri";
import { FaPersonWalking } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { GoDiscussionClosed } from "react-icons/go";
import { GiNewspaper } from "react-icons/gi";
import { IoBusinessOutline } from "react-icons/io5";
import { SiOpenaccess } from "react-icons/si";
import { AiTwotoneMail } from "react-icons/ai";
import { PiUsersFour } from "react-icons/pi";

export const sidebar = (location: any, navigate: any) => {
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
    localStorage.removeItem('permission')
    navigate('/')
  }

  const switchLanguage = (lang: any) => {
    const path = location.pathname.split('/').filter((e: any) => e);
    if (Array.isArray(path) && path.length > 0 && Object.keys(supportLanguages).includes(path[0])) {
      path.shift()
    }
    navigate(`/${lang}/${path.join('/')}${location.search}`)
  }

  return [
    {
      name: 'sidebar.report',
      href: '/dashboard',
      permission: false,
      icon: <FiBarChart2/>,
      children: []
    },
    {
      name: 'sidebar.organisation',
      href: '',
      permission: ['employee', 'role'],
      icon: <IoBusinessOutline/>,
      children: [
        {
          name: 'sidebar.organisation.employee',
          href: '/dashboard/organisation',
          permission: ['employee'],
          icon: <FiUsers/>,
          children: []
        },
        {
          name: 'sidebar.organisation.role',
          href: '/dashboard/organisation/role',
          permission: ['role'],
          icon: <SiOpenaccess/>,
          children: []
        },
      ]
    },
    {
      name: 'sidebar.announce',
      href: '',
      permission: ['news', 'generate'],
      icon: <FiBookmark/>,
      children: [
        {
          name: 'sidebar.announce.news',
          href: '/dashboard/announce',
          permission: ['news'],
          icon: <GiNewspaper/>,
          children: []
        },
        {
          name: 'sidebar.announce.generate',
          href: '/dashboard/announce/generate',
          permission: ['generate'],
          icon: <MdOutlineAutoAwesome/>,
          children: []
        },
      ]
    },
    {
      name: 'sidebar.business',
      href: '',
      permission: ['product', 'order'],
      icon: <MdOutlineAddBusiness/>,
      children: [
        {
          name: 'sidebar.business.product',
          href: '/dashboard/business',
          permission: ['product'],
          icon: <RiProductHuntLine/>,
          children: []
        },
        {
          name: 'sidebar.business.order',
          href: '/dashboard/business/order',
          permission: ['order'],
          icon: <BsCart3/>,
          children: []
        },
      ]
    },
    {
      name: 'sidebar.customer',
      href: '',
      permission: ['customer', 'voucher'],
      icon: <FaPersonWalking/>,
      children: [
        {
          name: 'sidebar.customer.list',
          href: '/dashboard/customer',
          permission: ['customer'],
          icon: <PiUsersFour/>,
          children: []
        },
        {
          name: 'sidebar.customer.voucher',
          href: '/dashboard/customer/voucher',
          permission: ['voucher'],
          icon: <RiCoupon3Line />,
          children: []
        },
      ]
    },
    {
      name: 'sidebar.setting',
      href: '',
      permission: ['tag', 'category', 'email', 'media', 'comment', 'accesscode'],
      icon: <FiSettings/>,
      children: [
        {
          name: 'sidebar.setting.tag',
          href: '/dashboard/setting',
          permission: ['tag'],
          icon: <FiTag/>,
          children: []
        },
        {
          name: 'sidebar.setting.category',
          href: '/dashboard/setting/category',
          permission: ['category'],
          icon: <FiFolder/>,
          children: []
        },
        {
          name: 'sidebar.setting.email',
          href: '/dashboard/setting/email',
          permission: ['email'],
          icon: <AiTwotoneMail/>,
          children: []
        },
        {
          name: 'sidebar.setting.media',
          href: '/dashboard/setting/media',
          permission: ['media'],
          icon: <FiFilm/>,
          children: []
        },
        {
          name: 'sidebar.setting.comment',
          href: '/dashboard/setting/comment',
          permission: ['comment'],
          icon: <GoDiscussionClosed/>,
          children: []
        },
        {
          name: 'sidebar.setting.access-code',
          href: '/dashboard/setting/access-code',
          permission: ['accesscode'],
          icon: <FiCodesandbox/>,
          children: []
        },
      ]
    },
    {
      name: 'sidebar.account',
      href: '',
      permission: false,
      icon: <RiInformationLine/>,
      children: [
        // {
        //   name: 'sidebar.account.profile',
        //   href: '/dashboard/account',
        //   permission: false,
        //   icon: <FiUser/>,
        //   children: []
        // },
        {
          name: 'language.title',
          href: '',
          permission: false,
          icon: <MdOutlineLanguage/>,
          variant: 'tertiary.accent',
          children: Object.values(supportLanguages)
            .filter(f => f.key !== '/')
            .map((lang: any) => {
              
              return {
                name: lang.name,
                href: ``,
                permission: false,
                icon: lang.icon,
                onClick: () => switchLanguage(lang.key),
              }
            }) 
        },
        {
          name: 'button.logout',
          icon: <FiLogOut/>,
          permission: false,
          onClick: () => logout(),
          children: []
        },
      ]
    },
  ]
}