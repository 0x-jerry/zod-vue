import { z } from 'zod'

type MapType<Arr extends any[]> = {
  [key in keyof Arr]: z.ZodType<Arr[key]>
}

export type ZodFnRaw<Parameters extends any[], Return> = z.ZodFunction<
  // @ts-ignore
  z.ZodTuple<MapType<Parameters>>,
  z.ZodType<Return>
>

export type ZodFn<
  Parameters extends any[],
  Return,
  Optional extends boolean = false
> = Optional extends true
  ? z.ZodOptional<ZodFnRaw<Parameters, Return>>
  : ZodFnRaw<Parameters, Return>

type C = z.ZodType<() => any>
