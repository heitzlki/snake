export const adjust = (n: any) => (f: any) => (xs: any) =>
  mapi((x: any) => (i: any) => i == n ? f(x) : x)(xs);

export const dropFirst = (xs: any) => xs.slice(1);

export const dropLast = (xs: any) => xs.slice(0, xs.length - 1);

export const id = (x: any) => x;

export const k = (x: any) => (_: any) => x;

export const map = (f: any) => (xs: any) => xs.map(f);

export const mapi = (f: any) => (xs: any) =>
  xs.map((x: any, i: number) => f(x)(i));

export const merge = (o1: any) => (o2: any) => Object.assign({}, o1, o2);

export const mod = (x: any) => (y: any) => ((y % x) + x) % x; // http://bit.ly/2oF4mQ7

export const objOf = (k: any) => (v: any) => ({ [k]: v });
export const pipe =
  (...fns: any) =>
  (x: any) =>
    [...fns].reduce((acc, f) => f(acc), x);

export const prop = (k: any) => (o: Array<any>) => o[k];

export const range = (n: any) => (m: any) =>
  Array.apply(null, Array(m - n)).map((_: any, i: number) => n + i);

export const rep = (c: any) => (n: any) => map(k(c))(range(0)(n));

export const rnd = (min: number) => (max: number) =>
  Math.floor(Math.random() * max) + min;

export const spec = (o: any) => (x: any) =>
  Object.keys(o)
    .map((k) => objOf(k)(o[k](x)))
    .reduce((acc, o) => Object.assign(acc, o));
