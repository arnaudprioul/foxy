import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
	{ ignores: ['*.d.ts', '**/coverage', '**/dist', '**/.history', '**/node_modules', '**/stories'] },
	{
		extends: [
			eslint.configs.recommended,
			...typescriptEslint.configs.recommended,
			...eslintPluginVue.configs['flat/recommended'],
		],
		files: ['**/*.{ts,vue}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: globals.browser,
			parserOptions: {
				parser: typescriptEslint.parser,
			},
		},
		rules: {
			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-empty-object-type": ["error", {
				"allowInterfaces": "with-single-extends"
			}],
			"vue/no-template-shadow": ["warn", { "allow": ["props"] }],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					"args": "all",
					"argsIgnorePattern": "^_",
					"caughtErrors": "all",
					"caughtErrorsIgnorePattern": "^_",
					"destructuredArrayIgnorePattern": "^_",
					"varsIgnorePattern": "^_",
					"ignoreRestSiblings": true
				}
			]
		},
	},
	eslintConfigPrettier
);
