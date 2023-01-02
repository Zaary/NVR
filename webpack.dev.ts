import TerserPlugin from "terser-webpack-plugin";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.common";

const devConfig: Configuration = merge(commonConfig, {
    mode: "development",
    devtool: false,
    /*plugins: [
        new TerserPlugin({
            terserOptions: {
                mangle: false,
                format: {
                    beautify: true
                }
            }
        })
    ]*/
});

export default devConfig;