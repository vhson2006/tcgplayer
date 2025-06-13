import { ButtonGroup } from "@chakra-ui/react"
import { PopoverSelect } from "commons/languages/PopoverSelect"
import { useRouter } from "next/router";
import { FaRegUser } from "react-icons/fa"
import { FiLogIn, FiLogOut } from "react-icons/fi"
import { TbUserPlus } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { IoInformationCircleOutline } from "react-icons/io5";
import { actions } from "components/auth/slice";
import { loginCheck } from "utils/account";

const UserMenu = (props: any) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(actions.SET_PERMISSION(undefined))
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
    localStorage.removeItem('permission')
    router.push('/')
  }
  
  const outside = [
    {
      name: 'button#login',
      href: '/auth/login',
      icon: <FiLogIn />
    },
    {
      name: 'button#register',
      href: '/auth/register',
      icon: <TbUserPlus />
    }
  ]
  const inside = [
    {
      name: 'menu#user#profile',
      href: '/profile',
      icon: <IoInformationCircleOutline />
    },
    {
      name: 'menu#user#logout',
      href: '',
      onClick: () => logout(),
      icon: <FiLogOut />
    }
  ];

  const renderUserMenu = () => {
    return loginCheck() ? inside : outside
  }
  
  return (
    <ButtonGroup spacing="8" display='flex'>
      <PopoverSelect 
        icon={<FaRegUser />} 
        items={renderUserMenu().map((item: any) => ({
          name: item.name,
          href: item.href,
          icon: item.icon,
          onClick: item.onClick
        })) 
        } 
      />
    </ButtonGroup> 
  )
}

export default UserMenu