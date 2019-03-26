var webpack = require('webpack');
var CSSSplitWebpackPlugin = require('css-split-webpack-plugin/dist/index').default;
var historyDir = require('path').dirname(require.resolve('history/package.json'),);

module.exports = function(webpackConfig, env) {
// adding plugins to your configuration
    webpackConfig.plugins.push( 
        new CSSSplitWebpackPlugin({
            size: 3000,
        })
    )
    // 锁定版本
    webpackConfig.resolve.alias['history'] = historyDir;

    return webpackConfig
}