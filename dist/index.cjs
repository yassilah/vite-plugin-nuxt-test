var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_path = require("path");
var import_nuxt = require("nuxt");
var import_pkg_types = require("pkg-types");
var import_unplugin = __toESM(require("unimport/unplugin"), 1);
var import_plugin_vue = __toESM(require("@vitejs/plugin-vue"), 1);
function pathsToAlias(paths) {
  return Object.fromEntries(
    Object.entries(paths).map(([key, value]) => [
      key,
      (0, import_path.resolve)(__dirname, value[0])
    ])
  );
}
function getTsConfig(buildDir) {
  return __async(this, null, function* () {
    return yield (0, import_pkg_types.readTSConfig)((0, import_path.join)(buildDir, "tsconfig.json"));
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
    const nuxt = yield (0, import_nuxt.loadNuxt)(opts);
    const buildDir = nuxt.options.buildDir;
    return [
      (0, import_plugin_vue.default)(),
      import_unplugin.default.vite({
        presets: [
          {
            package: (0, import_path.join)(buildDir, "imports.d.ts")
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
