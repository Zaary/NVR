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
			  	"style-loader",
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