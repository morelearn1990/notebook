# webpack 学习笔记一
以下笔记摘抄至 [webpack入坑之旅](http://blog.guowenfh.com/2016/03/24/vue-webpack-01-base/) ，再加上自己的一部分理解。
## 1、webpack 理念
这有必要再次阐述一下 webpack 的理念：
1. 一切皆模块

>>正如js文件可以是一个“模块（module）”一样，其他的（如css、image或html）文件也可视作模 块。因此，你可以require('myJSfile.js')亦可以require('myCSSfile.css')。这意味着我们可以将事物（业务）分割成更小的易于管理的片段，从而达到重复利用等的目的。
2. 按需加载

>>传统的模块打包工具（module bundlers）最终将所有的模块编译生成一个庞大的bundle.js文件。但是在真实的app里边，“bundle.js”文件可能有10M到15M之大可能会导致应用一直处于加载中状态。因此Webpack使用许多特性来分割代码然后生成多个“bundle”文件，而且异步加载部分代码以实现按需加载。

## 3、Webapck 和其他模块化工具有什么区别呢？

(这部分是复制的)
1. 代码拆分
Webpack 有两种组织模块依赖的方式，同步和异步。异步依赖作为分割点，形成一个新的快。在优化了依赖树后，每一个异步区块都作为一个文件被打包。
2. Loader
Webpack 本身只能处理原生的 JavaScript 模块，但是 loader 转换器可以将各种类型的资源转换成 JavaScript 模块。这样，任何资源都可以成为 Webpack 可以处理的模块。
3. 智能解析
Webpack 有一个智能解析器，几乎可以处理任何第三方库，无论它们的模块形式是 CommonJS、 AMD 还是普通的 JS 文件。甚至在加载依赖的时候，允许使用动态表达式 require("./templates/" + name + ".jade")。
4. 插件系统
Webpack 还有一个功能丰富的插件系统。大多数内容功能都是基于这个插件系统运行的，还可以开发和使用开源的 Webpack 插件，来满足各式各样的需求。
5. 快速运行
Webpack 使用异步 I/O 和多级缓存提高运行效率，这使得 Webpack 能够以令人难以置信的速度快速增量编译。

## 4、webpack 安装
本笔记介绍使用 npm 安装 webpack ，和其他 npm 包安装一样使用安装指令

    //进入文件目录
    cd <filedir>
    // 初始化 package.json，如无需要直接一直 enter 即可
    npm init
    // 安装 webpack 可以使用简化命令 npm i webpack -D
    npm install webpack --save-dev
    // --save ：模块名将被添加到dependencies，可以简化为参数-S。
    // --save-dev  –save-dev: 模块名将被添加到devDependencies，可以简化为参数-D。

之后得到的 package.json 是类似这样的：

```
{
  "name": "app3",//项目名称
  "version": "1.0.0",//项目版本号
  "description": "webpack learn",//项目描述
  "main": "index.js",//项目主入口
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"//npm命令
  },
  "author": "morelearn",//作者
  "license": "MIT",//许可证
  "devDependencies": { //依赖包
    "webpack": "^2.4.1"
  }
}
```

## 5、webpack 最最简单例子(将简单复杂化 - _ -|||)
接下来进行最最简单的项目吧：
1. 创建一个静态文件 index.html ;
2. 创建 webpack 主入口 entry.js ;

分别代码如下：
index.html
```
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>webpack learn</title>
  </head>
  <body>
    <h1 id="h1"></h1>
    <script type="text/javascript" src="bundle.js"></script><!-- 生成的js文件为 bundle.js 所以这儿引入这个文件 -->
  </body>
</html>
```
entry.js:
```
/** entry.js 入口 **/
document.getElementById("h1").innerHTML="这是 webpack 打包成功！";
```

运行命令 `webpack entry.js bundle.js`
成功CMD命令行显示如下
```
Hash: 5684794b124eeb70194d
Version: webpack 2.4.1
Time: 82ms
    Asset     Size  Chunks             Chunk Names
bundle.js  2.71 kB       0  [emitted]  main
   [0] ./entry.js 80 bytes {0} [built]
```
可以看一下 bundle.js 代码，发现在之前得一段代码是 webpack 的封装代码，具体功能暂时没有详细看，所以没能说明一个仔细的来。在之后的一段代码为:
```
(function(module, exports, __webpack_require__) {
  /** entry.js 入口 **/
  document.getElementById("h1").innerHTML="这是 webpack 打包成功！";
  __webpack_require__(0);
})
```
由此可见，webpack 将 entry.js 的代码使用匿名函数的方式打包到了 bundle.js 里面。

这儿会产生一个想法，干嘛用它呀，反而更加复杂了（雅蠛蝶）。

## 6、一个更好的例子(有点理解了)

在上面的基础上再来新创建一个 first.js ，在 entry.js 里面引入它

first.js 代码如下：
```
var h2 = document.createElement("h2");
h2.innerHTML = "这是入口引入的另外一个js，打包成功~~"
document.body.appendChild(h2);
```
entry.js 代码如下：
```
/** entry.js 入口 **/
document.getElementById("h1").innerHTML="这是 webpack 打包成功！";
require("./first.js");
```
再运行命令 `webpack entry.js bundle.js`
成功CMD命令行显示如下：
```
Hash: f925000a88e899c2ac1c
Version: webpack 2.4.1
Time: 146ms
    Asset     Size  Chunks             Chu
bundle.js  2.94 kB       0  [emitted]  mai
   [0] ./first.js 117 bytes {0} [built]
   [1] ./entry.js 106 bytes {0} [built]
```
同样在 bundle.js 里面在 entry.js 代码的上方增加了代码：
```
(function(module, exports) {
  var h2 = document.createElement("h2");
  h2.innerHTML = "这是入口引入的另外一个js，打包成功~~"
  document.body.appendChild(h2);
})
```

于是我们猜测 webpack 是通过在入口文件里面递归寻找依赖文件，为了证实我们的猜想，我们在 first.js 里面增加一个依赖，来看看情况，创建 second.js 代码如下：
```
var h3 = document.createElement("h3");
h3.innerHTML = "验证递归寻找依赖并打包的猜想";
document.body.appendChild(h3);
```

在 first.js 里面增加一行代码 `require("./second.js");`
再次运行命令 `webpack entry.js bundle.js`
运行成功CMD命令行显示如下：
```
Hash: 6091c80a79e5d89e3c28
Version: webpack 2.4.1
Time: 325ms
    Asset     Size  Chunks             Chun
bundle.js  3.14 kB       0  [emitted]  main
   [0] ./first.js 138 bytes {0} [built]
   [1] ./entry.js 106 bytes {0} [built]
   [2] ./second.js 110 bytes {0} [built]
```
同样在 bundle.js 里面增加了代码：

```
(function(module, exports) {
var h3 = document.createElement("h3");
h3.innerHTML = "验证递归寻找依赖并打包的猜想";
document.body.appendChild(h3);
})
```
现在我们来看整个 bundle.js 里面的代码：
```
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


var h2 = document.createElement("h2");
h2.innerHTML = "这是入口引入的另外一个js，打包成功~~"
document.body.appendChild(h2);

__webpack_require__(2);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/** entry.js 入口 **/
document.getElementById("h1").innerHTML="这是 webpack 打包成功！";

__webpack_require__(0);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var h3 = document.createElement("h3");
h3.innerHTML = "验证递归寻找依赖并打包的猜想";
document.body.appendChild(h3);

/***/ })
/******/ ]);
```
我们写的三段代码均在这里面，但是这个顺序有点琢磨不透，待下回仔细分析。

通过以上两个例子，我们能够简单的理解 webpack 的理念和方法。那么接下来我们进入到更加深入的使用 webpack 来加强理解。

