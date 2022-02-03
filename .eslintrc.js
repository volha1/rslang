
module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true
    },
    parser: '@typescript-eslint/parser',
    extends: ['airbnb-base', 'eslint:recommended', 'plugin:import/recommended', 'plugin:import/typescript'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['import', '@typescript-eslint'],
    ignorePatterns: ['webpack.config.js', 'webpack.dev.config.js', 'webpack.prod.config.js', '.eslintrc.js'],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        'no-console': 'error',
        'import/no-unresolved': 'error',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                'ts': 'never'
            }
        ],
        'import/no-cycle':'off',
        'no-plusplus': 'off',
        'no-shadow': 'off',
        'no-restricted-syntax': 'off',
        'no-param-reassign': 'off',
        'no-unused-vars': 'off', /*instead of this rule was added '@typescript-eslint/no-unused-vars'*/
        // formatting is forced by prettier
        'linebreak-style': 'off',
        'implicit-arrow-linebreak': 'off',
        'function-paren-newline': 'off',
        'lines-between-class-members': 'off',
        'object-curly-newline': 'off',
        'max-len': 'off',
        indent: 'off',
        'comma-dangle': 'off',
        'operator-linebreak': 'off',
        'space-infix-ops': 'off',
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/resolver': {
            'typescript': {
                'alwaysTryTypes': true,
                'project': 'packages/*/tsconfig.js',
            }
        }
    }
}
