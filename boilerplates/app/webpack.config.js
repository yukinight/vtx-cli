var webpack = require('webpack');
var CSSSplitWebpackPlugin = require('css-split-webpack-plugin/dist/index').default;
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function(webpackConfig, env) {
// adding plugins to your configuration
    // css文件分割（For IE）
    webpackConfig.plugins.push( 
        new CSSSplitWebpackPlugin({
            size: 3000
        })
    )
    // 代码压缩
    webpackConfig.plugins = webpackConfig.plugins.filter(function(plugin) {
        return !(plugin instanceof webpack.optimize.UglifyJsPlugin);
    });
    webpackConfig.plugins.push(new ParallelUglifyPlugin({
        uglifyJS: { 
            output: {
                comments: false,
                ascii_only: true
            },
            warnings: false,
        },
        cacheDir: './.cache'
    }));
    // 打包分析工具
    // webpackConfig.plugins.push(new BundleAnalyzerPlugin());

    return webpackConfig
}