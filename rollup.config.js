import jscc from "rollup-plugin-jscc";
import license from "rollup-plugin-license";
import pkg from "./package.json";
import uglify from "rollup-plugin-uglify";

const getPlugins = redactorVer => [
  jscc({
    values: {
      _REDACTOR_TARGET: redactorVer,
      _WIDGET_VERSION: pkg.widgetVersion
    }
  }),
  license({
    banner: `
      Uploadcare Redactor ${redactorVer} plugin
      Version: <%= pkg.version %>
    `
  })
];

export default [
  {
    input: "src/uploadcare.js",
    plugins: getPlugins(3),
    output: {
      file: "dist/uploadcare.redactor3.js",
      format: "iife"
    }
  },
  {
    input: "src/uploadcare.js",
    plugins: [uglify(), ...getPlugins(3)],
    output: {
      file: "dist/uploadcare.redactor3.min.js",
      format: "iife"
    }
  },
  {
    input: "src/uploadcare.js",
    plugins: getPlugins(2),
    output: {
      file: "dist/uploadcare.redactor2.js",
      format: "iife"
    }
  },
  {
    input: "src/uploadcare.js",
    plugins: [uglify(), ...getPlugins(2)],
    output: {
      file: "dist/uploadcare.redactor2.min.js",
      format: "iife"
    }
  }
];
