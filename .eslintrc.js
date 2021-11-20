module.exports = {
	extends: ['airbnb', 'prettier'],
	plugins: ['prettier'],
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module',
		allowImportExportEverywhere: false,
		codeFrame: false,
	},
	env: {
		browser: true,
		jest: true,
	},
	rules: {
		'prettier/prettier': ['error'],
		'no-console': 'off',
		'no-debugger': 'error',
		'no-alert': 'error',
		'default-case': 'error',
		'max-len': [
			'error',
			{
				code: 120,
			},
		],
		'prefer-promise-reject-errors': ['off'],
	},
};
