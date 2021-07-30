// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  "rules": {
    "comma-dangle": 'off',
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "brace-style": "off",
    "arrow-body-style": "off",
    "operator-linebreak": "off",
    "implicit-arrow-linebreak": "off",
    "import/extensions": "off",
    "object-curly-newline": [
      "error",
      {
        "ObjectPattern": {
          "multiline": true
        }
      }
    ],
    "linebreak-style": [
      "off",
      "windows"
    ]
  }
}
