const typescript = require('rollup-plugin-typescript');

module.exports = {
  input: './src/browser.ts',
  output: {
    name: 'KintoneConfigHelper',
    file: 'dist/kintone-config-helper.js',
    format: 'umd'
  },
  plugins: [
    typescript()
  ]
}