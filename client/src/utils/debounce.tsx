export const debounce = (fn: Function, ms: number) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      //@ts-ignore
      fn(...args);
    }, ms);
  };
};