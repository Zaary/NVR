import path from "path";
import { Configuration, ProvidePlugin } from "webpack";

const commonConfig: Configuration = {
  	entry: {
        bundle: path.join(process.cwd(), "frontend", "src", "main.ts"),
    },
	cache: {
		type: "filesystem",
		cacheDirectory: path.join(process.cwd(), ".cache", "webpack")
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
  	plugins: [
		new ProvidePlugin({
			process: "process/browser",
		}),
		/*new DefinePlugin({
			
		})*/
	  ]
}

export default commonConfig;