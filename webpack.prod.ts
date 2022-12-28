import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.common"

const prodConfig: Configuration = merge(commonConfig, {
    mode: "production",
});

export default prodConfig;