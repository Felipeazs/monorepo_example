import antfu from "@antfu/eslint-config"

export default function createConfig(options, ...userConfigs) {
    return antfu(
        {
            type: "app",
            typescript: true,
            formatters: true,
            stylistic: {
                indent: 4,
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
