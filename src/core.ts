import {
  z,
  ZodDefaultDef,
  ZodFirstPartySchemaTypes,
  ZodFirstPartyTypeKind,
  ZodOptionalDef,
} from 'zod'

interface PropOptions<T = any, D = T> {
  required: boolean
  default?: () => D
  validator(value: unknown): boolean
}

interface ValidateOption {
  [key: string]: ZodFirstPartySchemaTypes
}

type PropOutType<T extends object> = {
  [Key in keyof T]: PropOptions<T[Key]>
}

export function buildProps<T extends ValidateOption>(opt: T): PropOutType<z.infer<z.ZodObject<T>>> {
  const props: Record<string, PropOptions<any>> = {}

  const keys = Object.keys(opt)

  for (const key of keys) {
    props[key] = parseDef(opt[key])
    props[key].validator = (v) => opt[key].safeParse(v).success
  }

  return props as any
}

function parseDef(schema: ZodFirstPartySchemaTypes): PropOptions {
  const def = schema._def

  const typeName = def.typeName

  if (typeName === ZodFirstPartyTypeKind.ZodDefault) {
    return parseDefaultDef(def)
  }

  if (typeName === ZodFirstPartyTypeKind.ZodOptional) {
    return parseOptionalDef(def)
  }

  const prop = {
    required: true,
  } as PropOptions

  return prop
}

function parseDefaultDef(def: ZodDefaultDef): PropOptions {
  return {
    ...parseDef(def.innerType),
    default() {
      return def.defaultValue()
    },
    required: false,
  }
}

function parseOptionalDef(def: ZodOptionalDef): PropOptions {
  return {
    ...parseDef(def.innerType),
    required: false,
  }
}
