import { defaultLanguage } from "commons/consts"
import { callJsonApi, callPrivateJsonApi } from "utils/fetch"
import { jsonParse } from "utils/json"

export const fetchProduct = async (param: any, activedLanguage = defaultLanguage) => {
  return await callJsonApi("GET", "/api/public-product", param, activedLanguage)
}

export const detailProductBySlug = async (param: any, activedLanguage = defaultLanguage) => {
  return await callJsonApi('GET', `/api/public-product/${param}`, {}, activedLanguage)
}

export const createOrder = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('POST', `/api/public-order`, param, activedLanguage)
}

export const createOrderWithGuest = async (param: any, activedLanguage = defaultLanguage) => {
  return await callJsonApi("POST", "/api/guest-order", param, activedLanguage)
}

const filterCart = (v: any) => {
  return typeof v.id !== "undefined" 
    && typeof v.slug !== "undefined" 
    && typeof v.name !== "undefined" 
    && typeof v.description !== "undefined" 
    && typeof v.quantity !== "undefined" 
    && typeof v.image !== "undefined" 
    && typeof v.price !== "undefined" 
}
export const fetchCart = () => {
  try {
    let current = localStorage.getItem('cart');
    if (current && Array.isArray(jsonParse(current))) {
      const newData = jsonParse(current).filter(filterCart)
      localStorage.setItem('cart', JSON.stringify(newData));
      return newData
    } else {
      return []
    }
  } catch(e) {
    console.log(e);
    localStorage.removeItem('cart');
    return [];
  }
}

export const addToCart = (param: any) => {
  try {
    let current = localStorage.getItem('cart');
    if (current && Array.isArray(jsonParse(current))) {
      let currentArray = jsonParse(current).filter(filterCart);
      let index = currentArray.findIndex((e: any) => e.id === param.id);
      if (index === -1) {
        localStorage.setItem('cart', JSON.stringify([ ...currentArray, param ]));
      } else {
        currentArray[index].quantity = currentArray[index].quantity + param.quantity;
        localStorage.setItem('cart', JSON.stringify(currentArray));
      }
    } else {
      localStorage.setItem('cart', JSON.stringify([param]));
    }
  } catch(e) {
    console.log(e);
    localStorage.removeItem('cart');
  }
}

export const updateCart = (param: any) => {
  try {
    let current = localStorage.getItem('cart');
    if (current && Array.isArray(jsonParse(current))) {
      let currentArray = jsonParse(current).filter(filterCart);
      let index = currentArray.findIndex((e: any) => e.id === param.id);
      if (index !== -1) {
        currentArray[index].quantity = param.quantity;
        localStorage.setItem('cart', JSON.stringify(currentArray));
      }
    }
  } catch(e) {
    console.log(e);
    localStorage.removeItem('cart');
  }
}

export const removeItemFromCart = (id: string) => {
  try {
    let current = localStorage.getItem('cart');
    if (current && Array.isArray(jsonParse(current))) {
      let currentArray = jsonParse(current).filter(filterCart);
      let index = currentArray.findIndex((e: any) => e.id === id);
      if (index !== -1) {
        currentArray.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(currentArray));
      }
    }
  } catch(e) {
    console.log(e);
    localStorage.removeItem('cart');
  }
}

export const resetCart = () => {
  try {
    localStorage.removeItem('cart');
  } catch(e) {
    console.log(e);
  }
}