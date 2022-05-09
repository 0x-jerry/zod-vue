# Zod Vue

[![npm (scoped)](https://img.shields.io/npm/v/zod-vue?style=for-the-badge)](https://www.npmjs.com/package/zod-vue)
[![Codecov](https://img.shields.io/codecov/c/gh/0x-jerry/zod-vue?style=for-the-badge)](https://codecov.io/gh/0x-jerry/zod-vue)

Made validate vue props easier.

## Installation

```sh
pnpm i zod-vue zod
```

## Usage

```ts
import { z } from 'zod'
import { buildProps } from 'zod-vue'

const props = defineProps(
  buildProps({
    num: z.number(),
    str: z.string().optional(),
    bool: z.boolean().default(true),
    array: z.array(z.number()).default(() => [1]),
    fn: z.function(z.tuple([z.number()]), z.boolean()),
    customFn: z.function() as ZodFn<[number], boolean>,
  })
)

console.log(props)
```
