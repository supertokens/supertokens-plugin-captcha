import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import external from "rollup-plugin-peer-deps-external";
import { visualizer } from "rollup-plugin-visualizer";
import { createFilter } from "rollup-pluginutils";
import postcss from "postcss";
import postcssPresetEnv from "postcss-preset-env";
import postcssImport from "postcss-import";

function importCssString(opts = {}) {
  if (!opts.include) {
    opts.include = "**/*.css";
  }

  const filter = createFilter(opts.include, opts.exclude);
  const postcssInstance = postcss([
    postcssImport(),
    postcssPresetEnv(opts.postcssPresetEnv),
  ]);

  return {
    name: "css-string-import",

    async transform(code, id) {
      if (filter(id)) {
        const rendered = await postcssInstance.process(code, { from: id });

        return {
          code: `export default ${JSON.stringify(rendered.css.toString())};`,
          map: { mappings: "" },
        };
      }
    },
  };
}

export default [
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: {
      index: "frontend/lib/ts/index.ts",
    },
    plugins: [
      external(),
      resolve(),
      json(),
      commonjs({
        defaultIsModuleExports: "auto",
      }),
      typescript({ tsconfig: "./frontend/lib/tsconfig.json" }), // so Rollup can convert TypeScript to JavaScript
      importCssString(),
      visualizer(),
    ],
    output: [
      {
        dir: "frontend/lib/build",
        format: "commonjs",
        interop: "auto",
        sourcemap: false,
        chunkFileNames: (chunkInfo) => {
          const root = chunkInfo.moduleIds[chunkInfo.moduleIds.length - 1];
          const recipeMatch = root.match(
            /\/frontend\/lib\/ts\/recipe\/(\w+)\/\w+.tsx?/
          );
          if (recipeMatch) {
            return recipeMatch[1] + "-shared.js";
          }
          return chunkInfo.name + ".js";
        },
      },
    ],
  },
];
