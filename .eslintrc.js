module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
    },
    plugins: [
        "@typescript-eslint/eslint-plugin",
        "simple-import-sort",
    ],
    extends: [
        "airbnb",
        "airbnb-typescript/base",
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: [".eslintrc.js"],
    rules: {
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "simple-import-sort/imports": "warn",
        "simple-import-sort/exports": "warn",
        quotes: ["warn", "double"],
        "@typescript-eslint/quotes": [
            2,
            "double",
            { avoidEscape: true },
        ],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            { args: "none" },
        ],
        "@typescript-eslint/indent": "off",
        "import/prefer-default-export": "off",
    },
};

