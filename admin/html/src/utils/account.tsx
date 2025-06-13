import { secrets } from 'commons/config'
import CryptoJS from 'crypto-js'

export const loginCheck = () => {
  try {
    const token: any = localStorage.getItem("refresh") || ''
    if (token && new Date().getTime() < JSON.parse(window.atob(token.split('.')[1]))?.exp * 1000) {
      return true
    }
    return false
  } catch(e) {
    return false
  }
}

export const sessionCheck = () => {
  try {
    const token: any = localStorage.getItem("token") || ''
    if (token && new Date().getTime() < JSON.parse(window.atob(token.split('.')[1]))?.exp * 1000) {
      return true
    }
    return false
  } catch(e) {
    return false
  }
}

export const encryptPermission = (permission: any) => {
  try {
    const message = JSON.stringify({ ...JSON.parse(permission), time: new Date().getTime()});
    return CryptoJS.AES.encrypt(message, secrets.GUARD).toString();
  } catch(e) {
    console.log(e)
    return ''
  }
}

export const decryptPermission = (encrypted: string) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encrypted, secrets.GUARD).toString(CryptoJS.enc.Utf8);
    const { time, ...others } = JSON.parse(decrypted.toString());
    return others
  } catch(e) {
    console.log(e)
    return {}
  }
}
