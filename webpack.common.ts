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
							console.log("inserting style");
							if (document.head) {
								console.log("head free");
								document.head.appendChild(element);
							} else {
								console.log("waiting for dom to load");
								window.addEventListener("DOMContentLoaded", () => {
									console.log("dom loaded");
									document.head.appendChild(element);//bet i have bomb settle last test or bye bye
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