import { AiOutlineImport, AiOutlineSave } from "react-icons/ai";
import { CiCircleList, CiSearch } from "react-icons/ci";
import { FiEdit2, FiLogIn } from "react-icons/fi";
import { HiOutlineEye } from "react-icons/hi";
import { IoMdClose, IoIosArrowRoundBack } from "react-icons/io";
import { IoCheckmarkOutline, IoAddOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { TbReplace } from "react-icons/tb";

export const setting: any = {
  cancel: {
    variant: 'outline',
    icon: <IoMdClose/>,
    text: 'button.cancel',
  },
  confirm: {
    variant: 'primary',
    icon: <IoCheckmarkOutline/>,
    text: 'button.confirm',
  },
  add: {
    variant: 'outline',
    icon: <IoAddOutline/>,
    text: 'button.add',
  },
  download: {
    variant: 'outline',
    icon: <MdOutlineFileDownload/>,
    text: 'button.download',
  },
  import: {
    variant: 'outline',
    icon: <AiOutlineImport/>,
    text: 'button.import',
  },
  massChange: {
    variant: 'outline',
    icon: <TbReplace/>,
    text: 'button.massChange',
  },
  search: {
    variant: 'primary',
    icon: <CiSearch/>,
    text: 'button.search',
  },
  edit: {
    variant: 'primary',
    icon: <FiEdit2/>,
    text: 'button.edit',
  },
  back: {
    variant: 'outline',
    icon: <IoIosArrowRoundBack/>,
    text: 'button.back',
  },
  view: {
    variant: 'outline',
    icon: <HiOutlineEye />,
    text: 'button.view',
  },
  save: {
    variant: 'primary',
    icon: <AiOutlineSave/>,
    text: 'button.save',
  },
  list: {
    variant: 'outline',
    icon: <CiCircleList/>,
    text: 'button.list',
  },
  login: {
    variant: 'primary',
    icon: <FiLogIn/>,
    text: 'button.login',
  }
}