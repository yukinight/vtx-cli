var webpack = require('webpack');
var path = require('path');
var CSSSplitWebpackPlugin = require('css-split-webpack-plugin/dist/index').default;
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = function(webpackConfig, env) {
// adding plugins to your configuration
    webpackConfig.plugins.push( 
        new CSSSplitWebpackPlugin({
            size: 3000
        })
    )
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

    // 指定包路径
    function setAlias(pkgName){
        webpackConfig.resolve.alias[pkgName] = path.dirname(require.resolve(`${pkgName}/package.json`));        
    }
    setAlias('history');
    setAlias('moment');

    return webpackConfig
}