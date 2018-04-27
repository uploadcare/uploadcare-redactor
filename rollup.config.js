import jscc from "rollup-plugin-jscc";
import license from "rollup-plugin-license";

const widgetVersion = '3.x';

const getPlugins = redactorVer => [
  jscc({
    values: {
      _REDACTOR_TARGET: redactorVer,
      _WIDGET_VERSION: widgetVersion
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
    plugins: getPlugins(2),
    output: {
      file: "dist/uploadcare.redactor2.js",
      format: "iife"
    }
  }
];
