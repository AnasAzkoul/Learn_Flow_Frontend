import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import tsParser from "@typescript-eslint/parser";
export default [
	...pluginVue.configs["flat/recommended"],
	{
		files: ["**/*.vue"],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tsParser, // handles <script lang="ts"> inside .vue files
			},
		},
	},
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: tsParser,
		},
	},
	{
		rules: {
			"vue/attributes-order": [
				"error",
				{
					order: [
						"DEFINITION",
						"LIST_RENDERING",
						"CONDITIONALS",
						"RENDER_MODIFIERS",
						"GLOBAL",
						"UNIQUE",
						"TWO_WAY_BINDING",
						"OTHER_DIRECTIVES",
						"OTHER_ATTR",
						"EVENTS",
						"CONTENT",
					],
					alphabetical: false,
				},
			],
		},
	},
];