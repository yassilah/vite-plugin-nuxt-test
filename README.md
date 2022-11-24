## Nuxt + Vitest = ☀️

This is a simple plugin that will add some basic configuration for Vitest to run properly inside your Nuxt 3 application (autoimports, aliases, etc.).

### Installation

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import NuxtVitest from 'vite-plugin-nuxt-test'

export default defineConfig({
    plugins: [NuxtVitest()],
    test: {
        // Your own configuration
    }
})
```

### Usage

You may then use Vitest to test your composables without worrying about auto-imported methods.

```ts
// composables/useBar.ts
export function useBar() {
    return 'bar'
}
```



```ts
// composables/useFoo.ts
export function useFoo() {
    return useBar() + '-foo'
}
```



```ts
import { describe, test } from 'vitest'

describe('useFoo', () => {
    it ('should not need to be imported', () => {
        expect(useFoo).toBeDefined() // ✅
    })

    it ('should auto-import useBar as well', () => {
        expect(useFoo()).toBe('bar-foo') // ✅
    })
})
```
