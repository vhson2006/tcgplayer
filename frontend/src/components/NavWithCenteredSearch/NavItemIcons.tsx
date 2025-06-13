import { AiOutlineUser } from 'react-icons/ai'
import { RiHeartLine, RiSearchLine, RiShoppingCartLine } from 'react-icons/ri'
import { TbUserPlus } from 'react-icons/tb'

export const items = {
  register: {
    label: 'button#register',
    icon: TbUserPlus,
    href: '/auth/register',
  },
  user: {
    label: 'button#login',
    icon: AiOutlineUser,
    href: '/auth/login',
  },
  cart: {
    label: 'button#cart',
    icon: RiShoppingCartLine,
    href: '#',
  },
  search: {
    label: 'button#search',
    icon: RiSearchLine,
    href: '#',
  },
}
