import path from "path";
import fs from "fs";
import { Configuration, ProvidePlugin, BannerPlugin, DefinePlugin } from "webpack";
import TerserPlugin from "terser-webpack-plugin";

const commonConfig: Configuration = {
  	entry: {
        bundle: path.join(process.cwd(), "frontend", "src", "main.ts"),
    },
	cache: {
		type: "filesystem",
		cacheDirectory: path.join(process.cwd(), ".cache", "webpack")
	},
	experiments: {
		topLevelAwait: true
	},
  	module: {
	    rules: [{
			test: /\.html$/i,
			loader: "html-loader",
			options: {
				minimize: true,
			},
		}, {
			test: /\.(ts|js)?$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: {
					cacheCompression: false,
					cacheDirectory: path.join(process.cwd(), ".cache", "babel-loader")
				}
			},
		}, {
			test: /\.s[ac]ss$/i,
			use: [
			  	// Creates `style` nodes from JS strings
				{
					loader: "style-loader",
					options: {
						// Do not forget that this code will be used in the browser and
						// not all browsers support latest ECMA features like `let`, `const`, `arrow function expression` and etc,
						// we recommend use only ECMA 5 features,
						// but it is depends what browsers you want to support
						insert: function insertIntoTarget(element: Element, options: any) {
							if (document.head) {
								document.head.appendChild(element);
							} else {
								window.addEventListener("DOMContentLoaded", function() {
									document.head.appendChild(element);
								});
							}
						}
					}
				},
			  		// Translates CSS into CommonJS
			  	"css-loader",
			  	// Compiles Sass to CSS
			  	"sass-loader",
			],
		}],
  	},
  	output: {
	    path: path.join(process.cwd(), "backend", "static", "js"),
	    filename: "[name].js",
  	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: false
			}),
		]
	},
  	plugins: [
		new ProvidePlugin({
			process: "process/browser",
		}),
		new DefinePlugin({
			VM_OPTION_NULL: 0,
			VM_OPCODE_VALUE_U8: 1,
			VM_OPCODE_VALUE_U16: 2,
			VM_OPCODE_VALUE_STR: 3,
			VM_OPCODE_VALUE_PTR: 4,
			VM_OPCODE_VALUE_REF: 5,
			VM_OPCODE_OPERATOR_ADD: 6,
			VM_OPCODE_OPERATOR_SUB: 7,
			VM_OPCODE_OPERATOR_MULT: 8,
			VM_OPCODE_OPERATOR_DIV: 9,
			VM_OPCODE_OPERATOR_XOR: 10,
			VM_OPCODE_OPERATOR_NT: 69,
			VM_OPCODE_COMPARATOR_EQ: 11,
			VM_OPCODE_COMPARATOR_EQ3: 12,
			VM_OPCODE_EXECUTE_INSTRUCTION: 13,
			VM_OPCODE_SET_STACK_POINTER: 14,
			VM_OPCODE_WRITE_STACK: 15,
			VM_OPCODE_READ_STACK: 16,
			VM_OPCODE_MATH_OPERATION: 17,
			VM_OPCODE_COMP_OPERATION: 18,
			VM_OPCODE_EXEC_FUNCTION: 19,
			VM_OPCODE_FUNCTION_PARAM: 20,
			VM_OPCODE_BRANCH_START: 21,
			VM_OPCODE_BRANCH_S1: 22,
			VM_OPCODE_BRANCH_S2: 23,
			VM_OPCODE_BRANCH_END: 24
		}),
		new BannerPlugin({
			banner: fs.readFileSync(path.join(process.cwd(), "frontend", "userscript_header.txt")).toString('utf8')
		})
	]
}

export default commonConfig;