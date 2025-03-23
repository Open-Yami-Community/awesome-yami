import ts from "rollup-plugin-typescript2";
import typescript from "typescript";
/** @type {import('rollup').RollupOptions} */
export default {
	input: "scripts/cp.ts",
	output: {
		file: "scripts/cp.js",
		format: "esm",
	},
	plugins: [
		ts({
			typescript,
			tsconfigOverride: {
				compilerOptions: {
					target:
						"ESNext" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
					module: "ESNext" /* Specify what module code is generated. */,
					moduleResolution:
						"node" /* Specify how TypeScript looks up a file from a given module specifier. */,
					resolveJsonModule: true /* Enable importing .json files. */,
					esModuleInterop: true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
					forceConsistentCasingInFileNames: true /* Ensure that casing is correct in imports. */,
					strict: true /* Enable all strict type-checking options. */,
					skipLibCheck: true /* Skip type checking all .d.ts files. */,
				},
			},
		}),
	],
};
