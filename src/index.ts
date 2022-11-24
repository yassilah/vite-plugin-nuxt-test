import { join, resolve } from 'path'
import { loadNuxt } from 'nuxt'
import { readTSConfig } from 'pkg-types'
import AutoImport from 'unimport/unplugin'
import Vue from '@vitejs/plugin-vue'
import type { LoadNuxtOptions } from '@nuxt/kit'

/**
 * Turn tsconfig paths into aliases.
 */
function pathsToAlias(paths: Record<string, string[]>) {
    return Object.fromEntries(
        Object.entries(paths).map(([key, value]) => [
            key,
            resolve(__dirname, value[0])
        ])
    )
}

/**
 * Get the tsconfig from Nuxt.
 */
async function getTsConfig(buildDir: string) {
    return await readTSConfig(join(buildDir, 'tsconfig.json'))
}

/**
 * Get the paths from Nuxt's tsconfig.
 */
async function getTsConfigPaths(buildDir: string) {
    const { compilerOptions } = await getTsConfig(buildDir)
    return compilerOptions?.paths as Record<string, string[]>
}

/**
 * Get the list of aliases.
 */
async function getAlias(buildDir: string) {
    return pathsToAlias(await getTsConfigPaths(buildDir))
}

/**
 * Nuxt Vitest Plugin
 */
export default async function (opts: LoadNuxtOptions = {}) {
    const nuxt = await loadNuxt(opts)
    const buildDir = nuxt.options.buildDir

    return [
        Vue(),
        AutoImport.vite({
            presets: [
                {
                    package: join(buildDir, 'imports.d.ts')
                }
            ]
        }),
        {
            name: 'nuxt:vitest',
            async config() {
                return {
                    resolve: {
                        alias: await getAlias(buildDir)
                    },
                    test: {
                        deps: {
                            inline: ['nuxt/dist']
                        }
                    }
                }
            }
        }
    ]
}
