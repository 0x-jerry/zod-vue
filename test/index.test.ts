import { z } from 'zod'
import { buildProps } from '../src'

describe('build props', () => {
  it('should working with validate', () => {
    const p = buildProps({
      num: z.number(),
      str: z.string(),
      bool: z.boolean(),
      bigInt: z.bigint(),
      array: z.array(z.number()),
    })

    // number
    expect(p.num.validator('s')).toBe(false)
    expect(p.num.validator(0)).toBe(true)

    // string
    expect(p.str.validator('s')).toBe(true)
    expect(p.str.validator(0)).toBe(false)

    // boolean
    expect(p.bool.validator('s')).toBe(false)
    expect(p.bool.validator(0)).toBe(false)
    expect(p.bool.validator(false)).toBe(true)
    expect(p.bool.validator(true)).toBe(true)

    // bit int
    expect(p.bigInt.validator('s')).toBe(false)
    expect(p.bigInt.validator(0)).toBe(false)
    expect(p.bigInt.validator(0n)).toBe(true)

    // array number
    expect(p.array.validator([])).toBe(true)
    expect(p.array.validator([1])).toBe(true)
    expect(p.array.validator(['1'])).toBe(false)
    expect(p.array.validator('1')).toBe(false)
  })

  it('should working with enum type', () => {
    const p = buildProps({
      enum: z.enum(['num', 'n2', 'n3']),
    })

    expect(p.enum.validator('s')).toBe(false)
    expect(p.enum.validator('num')).toBe(true)
  })

  it('should working with default value', () => {
    const p = buildProps({
      enum: z.enum(['num', 'n2', 'n3']).default('n3'),
    })

    expect(p.enum.default?.()).toBe('n3')
    expect(p.enum.required).toBe(false)

    expect(p.enum.validator(undefined)).toBe(true)
    expect(p.enum.validator('')).toBe(false)
    expect(p.enum.validator('n2')).toBe(true)
  })
})
