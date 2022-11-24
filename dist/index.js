var __async = (__this, __arguments, generator) => {
  return new Promise((resolve2, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve2(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
import { join, resolve } from "path";
import { loadNuxt } from "nuxt";
import { readTSConfig } from "pkg-types";
import AutoImport from "unimport/unplugin";
import Vue from "@vitejs/plugin-vue";
function pathsToAlias(paths) {
  return Object.fromEntries(
    Object.entries(paths).map(([key, value]) => [
      key,
      resolve(__dirname, value[0])
    ])
  );
}
function getTsConfig(buildDir) {
  return __async(this, null, function* () {
    return yield readTSConfig(join(buildDir, "tsconfig.json"));
  });
}
function getTsConfigPaths(buildDir) {
  return __async(this, null, function* () {
    const { compilerOptions } = yield getTsConfig(buildDir);
    return compilerOptions == null ? void 0 : compilerOptions.paths;
  });
}
function getAlias(buildDir) {
  return __async(this, null, function* () {
    return pathsToAlias(yield getTsConfigPaths(buildDir));
  });
}
function src_default() {
  return __async(this, arguments, function* (opts = {}) {
    const nuxt = yield loadNuxt(opts);
    const buildDir = nuxt.options.buildDir;
    return [
      Vue(),
      AutoImport.vite({
        presets: [
          {
            package: join(buildDir, "imports.d.ts")
          }
        ]
      }),
      {
        name: "nuxt:vitest",
        config() {
          return __async(this, null, function* () {
            return {
              resolve: {
                alias: yield getAlias(buildDir)
              },
              test: {
                deps: {
                  inline: ["nuxt/dist"]
                }
              }
            };
          });
        }
      }
    ];
  });
}
export {
  src_default as default
};
