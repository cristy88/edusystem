module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'semi': ['error', 'never'],  // 禁止在语句末尾使用分号
    'indent': ['error', 2],  // 强制使用2个空格进行缩进
    'space-infix-ops': 'error',  // 要求运算符周围必须有空格，例如 x = y 而非 x=y
    'key-spacing': ['error', { 'afterColon': true }],  // 键和冒号之间必须有空格
    'no-unused-vars': 'off',
  },
}
