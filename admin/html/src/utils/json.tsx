export const jsonParse = (str: any) => {
  try {
    return str ? JSON.parse(str) : ''
  } catch (e) {
    try {
      return str ? JSON.parse(`"${str}"`) : ''
    } catch (er) {
      return ''
    }
  }
}