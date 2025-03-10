import antfu from "@antfu/eslint-config"

export default function createConfig(options, ...userConfigs) {
	return antfu(
		{
			type: "app",
			typescript: true,
			formatters: true,
			stylistic: {
				indent: "tab",
				spaces: 4,
				semi: false,
				quotes: "double",
			},
			...options,
		},
		{
			rules: {
				"ts/consistent-type-definitions": ["error", "type"],
				"no-console": ["warn"],
				"antfu/no-top-level-await": ["off"],
				"@typescript-eslint/no-empty-object-type": "off",
				"node/prefer-global/process": ["off"],
				"@typescript-eslint/consistent-type-definitions": "off",
				"style/jsx-closing-bracket-location": [
					1,
					{ selfClosing: "tag-aligned", nonEmpty: "after-props" },
				],
				"style/arrow-parens": "off",
				"style/quote-props": "warn",
				"perfectionist/sort-imports": [
					"error",
					{
						tsconfigRootDir: ".",
					},
				],
				"unicorn/filename-case": [
					"error",
					{
						case: "kebabCase",
						ignore: ["README.md"],
					},
				],
				// "node/no-process-env": ["error"],
			},
			ignores: ["**/route-tree.gen.ts"],
		},
		...userConfigs,
	)
}
