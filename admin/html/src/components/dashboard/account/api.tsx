import { common } from "commons/config"

export const fetchProfile = () => {
  return {
    status: common.CORRECT,
    data: {
      name: 'Nguyen Van A',
      avatar: '/logo192.png'
    }
  }
}