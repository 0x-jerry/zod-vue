# Zod Vue

Made validate vue props easier.

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
  })
)

console.log(props)
```
