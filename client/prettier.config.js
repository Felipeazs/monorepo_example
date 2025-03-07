/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	trailingComma: "all",
	useTabs: true,
	indent_size: 4,
	overrides: [{ files: "*.yaml", options: { useTabs: true, tabWidth: 2 } }],
	semi: false,
	singleQuote: false,
	printWidth: 100,
	bracketSpacing: true,
	bracketSameLine: true,
	arrowParens: "always",
	proseWrap: "preserve",
	endOfLine: "auto",
	singleAttributePerLine: false,
	plugins: ["prettier-plugin-tailwindcss"],
}

export default config
