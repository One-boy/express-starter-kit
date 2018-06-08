/**
 * eslint配置
 * 使用eslint --init命令生成
 * 使用vscod下载 eslint插件，编辑时会自动检测语法。
 */
module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "parser": "babel-eslint",
  "extends": "eslint:recommended",
  "rules": {
    "no-console": 0,
    "indent": [
      "error",
      2,
      {
        'SwitchCase': 1
      }
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ]
  }
};