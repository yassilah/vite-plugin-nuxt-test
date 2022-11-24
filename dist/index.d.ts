import * as vite from 'vite';
import { LoadNuxtOptions } from '@nuxt/kit';

/**
 * Nuxt Vitest Plugin
 */
declare function export_default(opts?: LoadNuxtOptions): Promise<(vite.Plugin | {
    name: string;
    config(): Promise<{
        resolve: {
            alias: {
                [k: string]: string;
            };
        };
        test: {
            deps: {
                inline: string[];
            };
        };
    }>;
})[]>;

export { export_default as default };
