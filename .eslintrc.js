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
    ignorePatterns: ['*.js'],
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
        'import/no-cycle': 'off',
        'import/no-mutable-exports': 'off',
        'no-plusplus': 'off',
        'no-shadow': 'off',
        'no-restricted-syntax': 'off',
        'no-param-reassign': 'off',
        'quote-props': 'off',
        'no-underscore-dangle': 'off',
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
        'comma-spacing': 'off',
        'operator-linebreak': 'off',
        'space-infix-ops': 'off',
        'space-before-blocks': 'off',
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
