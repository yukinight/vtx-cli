var path = require('path');

export default {
  "entry": "src/index.js",
  "html": {
    "template": "./public/index.ejs"
  },
  "proxy": {
    "/api": {
      "target": "http://jsonplaceholder.typicode.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  "extraBabelPlugins": [
    ["import", {"libraryName": "antd", "libraryDirectory": "lib", "style": "css" }, "antd"],
    ["import", {"libraryName": "vtx-ui", "camel2DashComponentName": false}, "vtx-ui"],
    ["import", {"libraryName": "lodash", "libraryDirectory": "", "camel2DashComponentName": false}, "lodash"]
  ],
  "hash":true,
  commons: [{
    async: "common",
    children: true,
    minChunks: 5
  },{
    async: "echarts",
    children: true,
    minChunks: function(module,count) {
      return /echarts/.test(module.context);
    }
  },{
    async: "lodash",
    children: true,
    minChunks: function(module) {
      return /lodash/.test(module.context);
    }
  },{
    async: "moment",
    children: true,
    minChunks: function(module) {
      return /moment/.test(module.context);
    }
  },{
    name: "manifest",
    minChunks: "Infinity"
  }],
  alias:{
    history:path.dirname(require.resolve('history/package.json')),
    moment:path.dirname(require.resolve('moment/package.json'))
  },
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-remove-console"
      ]
    }
  }
}
