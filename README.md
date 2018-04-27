## vtx-cli基于dva-cli封装的自用工具

# vtx-cli

相比于[dva-cli](https://github.com/dvajs/dva), vtx-cli做了如下改动：
1. 默认增加css分割工具以兼容IE；
2. 默认导入 ant-ui 和 [vtx-ui](https://www.npmjs.com/package/vtx-ui) 两个ui库；
3. 打包出的文件将自动去除所有console语句，避免IE出问题；
4. 新增两种打包命令：
    npm run buildD：打包后的index.js无压缩，便于调试；
    npm run buildV：增加js版本号增量，打包以后自动添加最新版本号，客户端无需清除缓存来更新js；
5. 修改原有工程少量文件及结构。

## Getting Started

Install, create and start.

```bash
# Install
$ npm install vtx-cli -g

# Create app
$ vtx new myapp

# Start app
$ cd myapp
$ npm start
```

## Commands

We have 3 commands: `new`, `init` and `generate`(alias `g`).

### vtx new <appName> [options]

Create app with new directory.

#### Usage Examples

```bash
$ vtx new myapp
$ vtx new myapp --demo
$ vtx new myapp --no-install
```

#### options

* `--demo` -- Generate a dead simple project for quick prototype
* `--no-install` -- Disable npm install after files created

### vtx init [options]

Create app in current directory. It's options is the same as `vtx new`.

### vtx generate <type> <name> (short-cut alias: "g")

Generate route, model and component.

#### Usage Examples

```bash
$ vtx g route product-list
$ vtx g model products
$ vtx g component Editor
$ vtx g component Users/UserModal
$ vtx g component Header --no-css
```

## 打包

```bash
# 普通打包
$ npm run build
# 无压缩debug模式打包
$ npm run buildD
# 添加版本号打包
$ npm run buildV
```

## Generated File Tree

```bash
.
├── src                    # Source directory
    ├── assets             # Store images, icons, ...
    ├── components         # UI components
    ├── index.css          # CSS for entry file
    ├── index.html         # HTML for entry file
    ├── index.js           # Enry file
    ├── models             # Dva models
    ├── router.js          # Router configuration
    ├── routes             # Route components
    ├── services           # Used for communicate with server
    └── utils              # Utils
        └── request.js     # A util wrapped dva/fetch
├── .editorconfig          #
├── .eslintrc              # Eslint config
├── .gitignore             #
├── .roadhogrc             # Roadhog config
└── package.json           #
```

## Configuration

dva-cli use [roadhog](https://github.com/sorrycc/roadhog) for build and server, view [roadhog#Configuration](https://github.com/sorrycc/roadhog/blob/master/README_en-us.md#configuration) ([中文版](https://github.com/sorrycc/roadhog#配置)) for details.

## License

[MIT](https://tldrlegal.com/license/mit-license)
