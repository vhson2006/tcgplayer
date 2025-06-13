const defined = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
  'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];
const MAX_LENGTH_SUPPORT = 6;
export const stringToPoint = (str: string): number => {
  try {
    str = str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'_');
    str = str.toLowerCase();
    
    let result = 0;
    for (let i = 0; i < Math.min(str.length, MAX_LENGTH_SUPPORT); i++) {
      result = result + Math.pow(defined.findIndex((p: any) => p === str.charAt(i)), str.length - i) 
    }
  
    return result
  } catch (e) {
    return 0
  }
}

export const removeSpecialChar = (str: string): string => {
  try {
    return str.replace(/[^a-zA-Z ]/g, "")
  } catch (e) {
    return ''
  }
}