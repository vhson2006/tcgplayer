import { secrets } from 'commons/consts'
import CryptoJS from 'crypto-js'
import { jsonParse } from './json'

export const loginCheck = () => {
  try {
    const token: any = localStorage.getItem("refresh") || ''
    if (token && new Date().getTime() < jsonParse(window.atob(token.split('.')[1]))?.exp * 1000) {
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
    if (token && new Date().getTime() < jsonParse(window.atob(token.split('.')[1]))?.exp * 1000) {
      return true
    }
    return false
  } catch(e) {
    return false
  }
}

export const encryptPermission = (permission: any) => {
  try {
    const message = JSON.stringify({ ...jsonParse(permission), time: new Date().getTime()});
    return CryptoJS.AES.encrypt(message, secrets.GUARD).toString();
  } catch(e) {
    console.log(e)
    return ''
  }
}

export const decryptPermission = (encrypted: string) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encrypted, secrets.GUARD).toString(CryptoJS.enc.Utf8);
    const { time, ...others } = jsonParse(decrypted.toString());
    return others
  } catch(e) {
    console.log(e)
    return {}
  }
}
