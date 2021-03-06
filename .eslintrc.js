/*
 * @Author: your name
 * @Date: 2022-03-23 10:38:05
 * @LastEditTime: 2022-03-23 10:38:33
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\.eslintrc.js
 */
module.exports= {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
      },
      "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "ecmaVersion": 8
      },
      "plugins": ["@typescript-eslint"],
      "rules": {
        "@typescript-eslint/no-unused-vars":  [
          "error",
          {
            "varsIgnorePattern": "^_"
          }
        ],
        "no-unused-vars": "off",
        "no-console": "warn",
        "space-before-function-paren": "warn",
        "semi": "warn",
        "quotes": ["warn", "single"]
      }
}
