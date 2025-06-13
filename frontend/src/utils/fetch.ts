import { common, config, defaultLanguage, MAX_REFRESH_TIME } from "commons/consts";
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { encryptPermission, loginCheck, sessionCheck } from "./account";
import { wait } from "./array";
import notify from "./notify";

enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}
type HTTP_METHOD_TYPES = keyof typeof HTTP_METHODS

const renewToken = async (refreshToken: any, activedLanguage = defaultLanguage) => {
  try {
    const response = await fetch(`${config.API_URL}/api/customer-authentication/refresh-tokens`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'accept-language': activedLanguage,
      },
      body: JSON.stringify({
        refreshToken: refreshToken
      })
    });
    if (response?.status < StatusCodes.INTERNAL_SERVER_ERROR) {
      const refresh = await response?.json();
      if (refresh.statusCode && refresh.statusCode === StatusCodes.UNAUTHORIZED) {
        console.log('refresh token can be leaked to others')
      }
      if (refresh.statusCode && refresh.statusCode > StatusCodes.MULTIPLE_CHOICES) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        localStorage.removeItem('permission');
        window.location.assign('/');
      } else {
        localStorage.setItem('token', refresh.accessToken)
        localStorage.setItem('refresh', refresh.refreshToken)
        localStorage.setItem('permission', encryptPermission(refresh.permission))
      }
    }
  } catch (e) {
    notify.error('error#common')
  }
}

export const callJsonApi = async (type: HTTP_METHOD_TYPES, point: string, input: any, activedLanguage = defaultLanguage) => {
  let param = {
    method: type,
    headers: {
      'Content-Type': 'application/json',
      'accept-language': activedLanguage,
    }
  };
  if (input && Object.keys(input).length === 0 && Object.getPrototypeOf(input) === Object.prototype) {
    return callApi(point, param);
  };
  if (type !== 'GET') {
    param = {
      ...param,
      ...{ body: JSON.stringify(input) }
    }
  } else {
    point = `${point}?${new URLSearchParams(input).toString()}`;
  }
  
  return callApi(point, param);
}

export const callPrivateJsonApi = async (type: HTTP_METHOD_TYPES, point: string, input: any, activedLanguage = defaultLanguage): Promise<any> => {
  if (sessionCheck()) {
    const token = localStorage.getItem('token');
    let param = {
      method: type,
      headers: {
        'Content-Type': 'application/json',
        'accept-language': activedLanguage,
        'Authorization': `Bearer ${token}`
      }
    };
    if (input && Object.keys(input).length === 0 && Object.getPrototypeOf(input) === Object.prototype) {
      return callApi(point, param);
    };
    if (type !== 'GET') {
      param = {
        ...param,
        ...{ body: JSON.stringify(input) }
      }
    } else {
      point = `${point}?${new URLSearchParams(input).toString()}`;
    }
    return callApi(point, param);
  } else {
    const refreshToken = localStorage.getItem("refresh")
    if (refreshToken) {
      if (loginCheck()) {
        localStorage.removeItem("refresh")
        await renewToken(refreshToken, activedLanguage)
        return callPrivateJsonApi(type, point, input, activedLanguage)
      } else {
        // localStorage.removeItem('token');
        // localStorage.removeItem('refresh');
        // window.location.assign('/');
      }
    } else {
      await wait(MAX_REFRESH_TIME)
      return callPrivateJsonApi(type, point, input, activedLanguage)
    }
  }
}

const callApi: any = async (point: string, param: any) => {
  try {
    const result = await fetch(`${config.API_URL}${point}`, param);
    if (result.status < StatusCodes.INTERNAL_SERVER_ERROR) {
      const response = await result.json();
      if (response?.statusCode && response?.statusCode === StatusCodes.UNAUTHORIZED) {
        // localStorage.removeItem('token');
        // localStorage.removeItem('refresh');
        // window.location.assign('/');
      }
      if (response?.statusCode && response?.statusCode > StatusCodes.MULTIPLE_CHOICES) {
        return {
          status: common.INCORRECT,
          message: response?.message,
        }
      }
  
      if (response && response?.success == false) {
        return {
          status: common.INCORRECT,
          message: '',
        }
      }
      return response
    }
  
    return {
      status: common.INCORRECT,
      message: getReasonPhrase(result.status),
    }
  } catch (e) {
    notify.error('error#common')
  }
}

export const uploadFile = async (files: any, activedLanguage = defaultLanguage): Promise<any> => {
  try {
    if (sessionCheck()) {
      const token  = localStorage.getItem('token');
      const formData = new FormData();
      formData.append(`file`, files[0]);
      const inputs: any = {
        method: 'POST',
        headers: {
          // "Content-Type": undefined,
          'accept-language': activedLanguage,
          'Authorization': `Bearer ${token}`
        },
        body: formData
      };
      const result = await fetch(`${config.API_URL}/api/media/upload`, inputs);
      if (result.status < StatusCodes.INTERNAL_SERVER_ERROR) {
        const response = await result.json();
        if (response?.statusCode && response?.statusCode === StatusCodes.UNAUTHORIZED) {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh');
          window.location.assign('/');
        }
        if (response?.statusCode && response?.statusCode > StatusCodes.MULTIPLE_CHOICES) {
          return {
            status: common.INCORRECT,
            message: response?.message,
          }
        }
  
        if (response && response?.success == false) {
          return {
            status: common.INCORRECT,
            message: '',
          }
        }
  
        if (response?.status === common.INCORRECT) {
          return {
            status: common.INCORRECT,
            message: '',
          }
        }
        
        return  {
          status: common.CORRECT,
          data: files.map((f: any) => { 
            f.url = response?.url
            f.id = response?.id
            return f
           }),
        }
      }
  
      return {
        status: common.INCORRECT,
        message: getReasonPhrase(result.status),
      }
    } else {
      const refreshToken = localStorage.getItem("refresh")
      if (refreshToken) {
        if (loginCheck()) {
          localStorage.removeItem("refresh")
          await renewToken(refreshToken, activedLanguage)
          return uploadFile(files, activedLanguage)
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh');
          window.location.assign('/');
        }
      } else {
        await wait(MAX_REFRESH_TIME)
        return uploadFile(files, activedLanguage)
      }
    }
  } catch (e) {
    notify.error('error#common')
  }
}

export const uploadFiles = async (files: any, activedLanguage = defaultLanguage) => {
  try {
    if (sessionCheck()) {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      files.forEach((file: any, index: any) => {
        formData.append(`files`, file);
      });
  
      const inputs: any = {
        method: 'POST',
        headers: {
          // "Content-Type": undefined,
          'accept-language': activedLanguage,
          'Authorization': `Bearer ${token}`
        },
        body: formData
      };
      const result = await fetch(`${config.API_URL}/api/media/uploads`, inputs);  
      return  {
        status: common.CORRECT,
        data: files,
      }
    } else {
      const refreshToken = localStorage.getItem("refresh")
      if (refreshToken) {
        if (loginCheck()) {
          localStorage.removeItem("refresh")
          await renewToken(refreshToken, activedLanguage)
          return uploadFile(files, activedLanguage)
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh');
          window.location.assign('/');
        }
      } else {
        await wait(MAX_REFRESH_TIME)
        return uploadFile(files, activedLanguage)
      }
    }
  } catch (e) {
    notify.error('error#common')
  }
}

export const downloadFile = async (point: string, filename: string, activedLanguage = defaultLanguage) => {
  try {
    if (sessionCheck()) {
      const token = localStorage.getItem('token');
      let param = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'accept-language': activedLanguage,
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await fetch(`${config.API_URL}${point}`, param);
      const blob = await response?.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } else {
      const refreshToken = localStorage.getItem("refresh")
      if (refreshToken) {
        if (loginCheck()) {
          localStorage.removeItem("refresh")
          await renewToken(refreshToken, activedLanguage)
          downloadFile(point, filename, activedLanguage)
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh');
          window.location.assign('/');
        }
      } else {
        await wait(MAX_REFRESH_TIME)
        downloadFile(point, filename, activedLanguage)
      }
    }
  } catch (e) {
    notify.error('error#common')
  }
}