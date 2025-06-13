export const pipe = (...fns: any) => (x: any) => fns.reduce((v: any, f: any) => f(v), x);
export const wait = async (time: any) => await new Promise(r => setTimeout(r, time));
export const targetBelongToSource = (source: any, target: any) => target.every((v: any) => source.includes(v))
export const targetHaveValueInSource = (source: any, target: any) => target.find((v: any) => source.includes(v))
export const uniqueArray = (array: any) => array.filter((item: any, idx: any) => array.indexOf(item) == idx)
export const arrayDifference = (arr1: any, arr2: any) => arr1.filter((x: any) => !arr2.includes(x));
export const arrayIntersection = (arr1: any, arr2: any) => arr1.filter((x: any) => arr2.includes(x));

export const sliceIntoChunks = (arr: Array<any>, chunkSize: number) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

export const makeArray = (n: number) => Array.from(Array(n).keys())